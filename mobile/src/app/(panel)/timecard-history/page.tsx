import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/constants/api'; // Corrigir a importação da API com o caminho correto

export default function TimecardHistory() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Receber parâmetros de navegação
  const params = useLocalSearchParams();
  const employeeId = params.employeeId;
  const employeeName = params.employeeName;
  const selectedContract = params.contractId;
  const userType = params.userType || 'employee'; // 'employer' ou 'employee'

  console.log("contratoal", params.selectedContract)
  // Função auxiliar para verificar se é uma visualização de empregador
  const isEmployerView = () => userType === 'employer';

  interface TimecardRecord {
    id: string;
    date: string;
    fullDate: Date;
    dayOfWeek: string;
    records: {
      entry: string;
      lunchOut: string;
      lunchIn: string;
      exit: string;
    };
    totalHours: string;
    hasAlert: boolean;
    alertReason: string;
    extraData?: {
      horasExtra: string;
      cargaHoraria: string;
      intervaloContrato: number;
    };
  }
  
  interface EmployeeData {
    registros: {
      [monthKey: string]: Array<{
        data: string;
        dia_semana: string;
        entrada: string | null;
        ida_almoco: string | null;
        volta_almoco: string | null;
        saida: string | null;
        horas_trabalhadas: string | null;
        horas_extra?: string;
        carga_horaria_dia: string;
        intervalo_contrato?: number;
      }>;
    };
    empregado?: {
      id: string;
      nome?: string;
    };
  }
  
  const [fullHistory, setFullHistory] = useState<TimecardRecord[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  
  // Meses para filtragem
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Anos para filtragem (últimos 3 anos)
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  
  // Função para obter o dia da semana
  const getDayOfWeek = (date: Date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  // Função para processar os registros da API
  const processApiRecords = (employeeData: EmployeeData) => {
    const records: TimecardRecord[] = [];
  
    // Verificar se employeeData e seus registros existem
    if (!employeeData || !employeeData.registros) {
      console.log("Dados de registros inválidos:", employeeData);
      return records;
    }
    
    // Contador para garantir chaves únicas mesmo para registros do mesmo dia
    let counter = 0;
    
    // Percorre todos os meses disponíveis nos registros
    Object.entries(employeeData.registros).forEach(([monthKey, monthRecords]) => {
      // Verificar se monthRecords é um array
      if (!Array.isArray(monthRecords)) {
        console.log(`Registros para ${monthKey} não é um array:`, monthRecords);
        return;
      }
  
      // Para cada registro do mês
      monthRecords.forEach(record => {
        // Verificar se record.data existe antes de tentar split
        if (!record || !record.data) {
          console.log("Registro sem data:", record);
          return; // Pular este registro e continuar com o próximo
        }
        
        try {
          // Incrementar o contador para garantir unicidade
          counter++;
          
          // Converter data do formato "2025-06-24" para Date e formato legível
          const [year, month, day] = record.data.split('-');
          const formattedDate = `${day}/${month}/${year}`;
          const date = new Date(`${year}-${month}-${day}`);
          
          // Processar horários - tratar valores nulos
          const entry = record.entrada ? record.entrada.substring(0, 5) : '--:--';
          const lunchOut = record.ida_almoco ? record.ida_almoco.substring(0, 5) : '--:--';
          const lunchIn = record.volta_almoco ? record.volta_almoco.substring(0, 5) : '--:--';
          const exit = record.saida ? record.saida.substring(0, 5) : '--:--';
          
          // Verificar alertas baseado em registros incompletos ou horas insuficientes
          const hasAlert: boolean = Boolean(
            !record.entrada || 
            !record.saida || 
            !record.ida_almoco || 
            !record.volta_almoco ||
            record.horas_trabalhadas === 'NaN' ||
            (record.horas_trabalhadas && parseFloat(record.horas_trabalhadas) < parseFloat(record.carga_horaria_dia || '0')));
          
          // Determinar o motivo do alerta
          let alertReason = '';
          if (hasAlert) {
            if (!record.entrada && !record.saida && !record.ida_almoco && !record.volta_almoco) {
              alertReason = 'Dia ausente';
            } else if (!record.saida || !record.ida_almoco || !record.volta_almoco) {
              alertReason = 'Registro incompleto';
            } else if (record.horas_trabalhadas === 'NaN') {
              alertReason = 'Cálculo de horas indisponível';
            } else if (record.horas_trabalhadas && record.carga_horaria_dia && 
                      parseFloat(record.horas_trabalhadas) < parseFloat(record.carga_horaria_dia)) {
              alertReason = 'Horário fora do padrão';
            }
          }
          
          // Formatar horas trabalhadas
          let totalHours = '--';
          if (record.horas_trabalhadas && record.horas_trabalhadas !== 'NaN') {
            const hoursValue = parseFloat(record.horas_trabalhadas);
            const hours = Math.floor(hoursValue);
            const minutes = Math.round((hoursValue - hours) * 60);
            totalHours = `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
          }
          
          // Mapear dias da semana para o formato abreviado
          const dayOfWeekMap = {
            'segunda-feira': 'Seg',
            'terça-feira': 'Ter',
            'quarta-feira': 'Qua',
            'quinta-feira': 'Qui',
            'sexta-feira': 'Sex',
            'sábado': 'Sáb',
            'domingo': 'Dom'
          };
          
          const dayOfWeek = record.dia_semana && typeof record.dia_semana === 'string' 
            ? (dayOfWeekMap[record.dia_semana as keyof typeof dayOfWeekMap] || getDayOfWeek(date))
            : getDayOfWeek(date);
          
          // Criar o objeto de registro no formato esperado pelo componente
          // Usando chave única combinando data e contador
          records.push({
            id: `record-${record.data}-${counter}`,
            date: formattedDate,
            fullDate: date,
            dayOfWeek: dayOfWeek,
            records: {
              entry,
              lunchOut,
              lunchIn,
              exit
            },
            totalHours,
            hasAlert,
            alertReason,
            // Dados extras para estatísticas
            extraData: {
              horasExtra: record.horas_extra || '0.00',
              cargaHoraria: record.carga_horaria_dia || '0.00',
              intervaloContrato: record.intervalo_contrato || 60
            }
          });
        } catch (error) {
          console.error("Erro ao processar registro:", error, record);
        }
      });
    });
    
    // Ordenar por data (mais recente primeiro)
    records.sort((a, b) => b.fullDate.getTime() - a.fullDate.getTime());
    
    return records;
  };

  // Função para calcular estatísticas detalhadas
  const calculateDetailedStats = () => {
    const totalRecords = filteredHistory.length;
    const alertsCount = filteredHistory.filter(item => item.hasAlert).length;
    
    // Calcular diferentes tipos de alertas baseado nas razões reais
    const lateCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('padrão')).length;
    
    const absentCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason === 'Dia ausente').length;
    
    const withMedicalCertificateCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('atestado')).length;
    
    const incompleteCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('incompleto')).length;
    
    const holidaysCount = filteredHistory.filter(item => 
      item.dayOfWeek === 'Dom' || 
      (item.hasAlert && item.alertReason.includes('feriado'))).length;
    
    // Calcular total de horas
    const totalMinutes = filteredHistory.reduce((acc, item) => {
      if (item.totalHours === '--') return acc;
      const [hours, minutes] = item.totalHours.match(/(\d+)h(?:\s(\d+)m)?/)?.slice(1) || ['0', '0'];
      return acc + (parseInt(hours) * 60) + (parseInt(minutes || '0'));
    }, 0);
    
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalHoursFormatted = `${totalHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`;
    
    // Calcular horas extras com base nos dados reais
    const overtimeMinutes = filteredHistory.reduce((acc, item) => {
      if (!item.extraData?.horasExtra) return acc;
      const horasExtra = parseFloat(item.extraData.horasExtra);
      if (isNaN(horasExtra)) return acc;
      
      const hours = Math.floor(horasExtra);
      const minutes = Math.round((horasExtra - hours) * 60);
      return acc + (hours * 60) + minutes;
    }, 0);
    
    // Dividindo as horas extras em 50% e 100% com base no dia da semana
    const overtimeMinutes50 = overtimeMinutes * 0.7; // 70% são em dias úteis (estimativa)
    const overtimeMinutes100 = overtimeMinutes * 0.3; // 30% são em domingos/feriados (estimativa)
    
    const overtime50Hours = Math.floor(overtimeMinutes50 / 60);
    const overtime50Minutes = Math.round(overtimeMinutes50 % 60);
    
    const overtime100Hours = Math.floor(overtimeMinutes100 / 60);
    const overtime100Minutes = Math.round(overtimeMinutes100 % 60);
    
    const overtime50 = `${overtime50Hours}h${overtime50Minutes > 0 ? ` ${overtime50Minutes}m` : ''}`;
    const overtime100 = `${overtime100Hours}h${overtime100Minutes > 0 ? ` ${overtime100Minutes}m` : ''}`;
    
    // Calcular média diária
    const validRecords = filteredHistory.filter(item => item.totalHours !== '--').length;
    const avgHoursPerDay = validRecords > 0 ? (totalMinutes / validRecords / 60).toFixed(1) : '0.0';
    
    return {
      totalRecords,
      alertsCount,
      lateCount,
      absentCount,
      withMedicalCertificateCount,
      incompleteCount,
      holidaysCount,
      totalHoursFormatted,
      overtime50,
      overtime100,
      avgHoursPerDay
    };
  };

  // Atualize o useEffect para buscar os dados do histórico do backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
  
        // Obter token de autenticação
        const token = await AsyncStorage.getItem('userToken');
        
        if (!token) {
          console.error("Token de autenticação não encontrado");
          Alert.alert("Erro de Autenticação", "Sessão expirada. Por favor, faça login novamente.");
          setLoading(false);
          return;
        }
        
        // Parâmetros de consulta para filtrar por empregado
        const params: Record<string, string> = {};
        if (employeeId) {
          params.employId = Array.isArray(employeeId) ? employeeId[0] : String(employeeId);
          console.log("Usando employeeId:", params.employId);
        } else {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
            params.employId = userId;
            console.log("Usando userId do AsyncStorage:", userId);
          } else {
            throw new Error("ID do empregado não encontrado");
          }
        }
        
        // Adicionar início e fim do mês como parâmetros
        const startDate = new Date(selectedYear, selectedMonth, 1);
        const endDate = new Date(selectedYear, selectedMonth + 1, 0);
        
        params.inicio = startDate.toISOString().split('T')[0];
        params.fim = endDate.toISOString().split('T')[0];

        console.log("Adicionando contrato", selectedContract)
        if(selectedContract){
          params.contractId = selectedContract as string;
        }
        
        console.log("Enviando parâmetros:", params);
        
        let response;
        if(userType === "employee"){
          response = await api.get('/worklog', { 
            params,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else if (userType === "employer"){
          response = await api.get('/worklogEmployer', { 
            params,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        
        console.log("Resposta recebida da API");
        
        if (response?.data && Array.isArray(response.data)) {
          // Exibir a estrutura da resposta para debugging
          console.log("Estrutura da resposta:", 
            JSON.stringify(response.data.map(item => ({
              id: item.empregado?.id,
              nome: item.empregado?.nome,
              temRegistros: !!item.registros,
              meses: item.registros ? Object.keys(item.registros) : []
            }))));
          
          // Encontra os dados do empregado atual
          const employeeData = employeeId 
            ? response.data.find((emp: EmployeeData) => emp.empregado?.id === params.employId) 
            : response.data[0];
              
          if (employeeData) {
            console.log("Empregado encontrado:", employeeData.empregado?.nome);
            const processedRecords = processApiRecords(employeeData);
            setFullHistory(processedRecords);
          } else {
            console.error("Dados do empregado não encontrados na resposta");
            Alert.alert("Aviso", "Não encontramos registros para este funcionário.");
            setFullHistory([]);
          }
        } else {
          console.log("Formato de resposta inválido:", response?.data);
          Alert.alert("Aviso", "Os dados retornados estão em um formato inesperado.");
          setFullHistory([]);
        }
      } catch (error) {
        console.error("Erro completo:", error);
        
        if (axios.isAxiosError(error)) {
          console.error("Erro Axios:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
          });
          
          if (error.response?.status === 401) {
            Alert.alert(
              "Sessão expirada", 
              "Sua sessão expirou. Por favor, faça login novamente."
            );
          } else {
            Alert.alert(
              "Erro de servidor", 
              `Não foi possível buscar os registros. (Erro: ${error.response?.status || "desconhecido"})`
            );
          }
        } else if (error instanceof Error) {
          Alert.alert("Erro", error.message);
        } else {
          Alert.alert(
            "Erro inesperado", 
            "Ocorreu um erro ao tentar carregar o histórico."
          );
        }
        
        setFullHistory([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecords();
  }, [employeeId, selectedMonth, selectedYear]);
  
  // Filtrar histórico por mês e ano selecionados
  const filteredHistory = fullHistory.filter(item => {
    const [day, month, year] = item.date.split('/').map(Number);
    return month - 1 === selectedMonth && year === selectedYear;
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={styles.backButtonHeader}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {employeeName ? `${employeeName} - Histórico` : 'Histórico de Pontos'}
        </Text>
        <View style={{width: 24}} />
      </View>
      
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {/* Filtro de Ano */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Ano:</Text>
          <View style={styles.filterOptions}>
            {years.map((year) => (
              <TouchableOpacity
                key={`year-${year}`}
                style={[
                  styles.filterChip,
                  selectedYear === year && styles.filterChipSelected
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedYear(year);
                }}
              >
                <Text 
                  style={[
                    styles.filterChipText,
                    selectedYear === year && styles.filterChipTextSelected
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Filtro de Mês */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Mês:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterOptions}
          >
            {months.map((month, index) => (
              <TouchableOpacity
                key={`month-${index}`}
                style={[
                  styles.filterChip,
                  selectedMonth === index && styles.filterChipSelected
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedMonth(index);
                }}
              >
                <Text 
                  style={[
                    styles.filterChipText,
                    selectedMonth === index && styles.filterChipTextSelected
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Botão adicional para resumo do mês */}
      {isEmployerView() && (
        <TouchableOpacity 
          style={styles.summaryButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setSummaryModalVisible(true);
          }}
        >
          <Ionicons name="stats-chart" size={20} color="#FFFFFF" />
          <Text style={styles.summaryButtonText}>Ver Resumo do Mês</Text>
          <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      
      {/* Cabeçalho da Tabela */}
      <View style={styles.tableHeader}>
        <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
          <Text style={styles.tableHeaderText}>Data</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Entrada</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>S. Almoço</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>V. Almoço</Text>
        </View>
        <View style={styles.tableHeaderCell}>
          <Text style={styles.tableHeaderText}>Saída</Text>
        </View>
        {isEmployerView() && (
          <View style={[styles.tableHeaderCell, { flex: 1.2 }]}>
            <Text style={styles.tableHeaderText}>Horas</Text>
          </View>
        )}
      </View>
      
      {/* Conteúdo da Tabela */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={styles.loadingText}>Carregando histórico...</Text>
        </View>
      ) : filteredHistory.length > 0 ? (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tableContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : null,
                item.hasAlert ? styles.tableRowAlert : null
              ]}
              onPress={() => {
                if (item.hasAlert) {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                }
              }}
            >
              <View style={[styles.tableCell, { flex: 1.8 }]}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.dayOfWeek}</Text>
                {item.hasAlert && (
                  <View style={styles.alertIconContainer}>
                    <Ionicons name="alert-circle" size={16} color="#F57C00" />
                  </View>
                )}
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.timeText}>{item.records.entry}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.timeText}>{item.records.lunchOut}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.timeText}>{item.records.lunchIn}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.timeText}>{item.records.exit}</Text>
              </View>
              {isEmployerView() && (
                <View style={[styles.tableCell, { flex: 1.2 }]}>
                  <Text style={styles.hoursText}>{item.totalHours}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{height: 20}}/>}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#BBDEFB" />
          <Text style={styles.emptyText}>
            Nenhum registro encontrado para {months[selectedMonth]} de {selectedYear}
          </Text>
        </View>
      )}

      {/* Modal de Resumo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={summaryModalVisible}
        onRequestClose={() => setSummaryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Resumo de {months[selectedMonth]} de {selectedYear}</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setSummaryModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#455A64" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              {/* Estatísticas principais */}
              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Registro de Pontos</Text>
                
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#E3F2FD'}]}>
                      <Ionicons name="calendar" size={22} color="#1565C0" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().totalRecords}</Text>
                      <Text style={styles.statLabel}>Total de Registros</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#FFF3E0'}]}>
                      <Ionicons name="alert-circle" size={22} color="#FF9800" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().alertsCount}</Text>
                      <Text style={styles.statLabel}>Alertas</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#FFEBEE'}]}>
                      <Ionicons name="close-circle" size={22} color="#F44336" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().absentCount}</Text>
                      <Text style={styles.statLabel}>Dias Ausentes</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#E1F5FE'}]}>
                      <Ionicons name="medkit" size={22} color="#03A9F4" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().withMedicalCertificateCount}</Text>
                      <Text style={styles.statLabel}>Com Atestado</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#FFF8E1'}]}>
                      <Ionicons name="time" size={22} color="#FFA000" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().lateCount}</Text>
                      <Text style={styles.statLabel}>Dias com Atraso</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.statIcon, {backgroundColor: '#E8F5E9'}]}>
                      <Ionicons name="flag" size={22} color="#4CAF50" />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={styles.statValue}>{calculateDetailedStats().holidaysCount}</Text>
                      <Text style={styles.statLabel}>Feriados</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Horas */}
              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Controle de Horas</Text>
                
                <View style={styles.hoursCard}>
                  <Ionicons name="time-outline" size={28} color="#1565C0" />
                  <Text style={styles.hoursLabel}>Total de Horas Trabalhadas</Text>
                  <Text style={styles.hoursValue}>{calculateDetailedStats().totalHoursFormatted}</Text>
                  <Text style={styles.hoursSubtext}>Média de {calculateDetailedStats().avgHoursPerDay}h por dia</Text>
                </View>
                
                <View style={styles.overtimeContainer}>
                  <View style={styles.overtimeCard}>
                    <View style={styles.overtimeHeader}>
                      <Ionicons name="star-half" size={18} color="#43A047" />
                      <Text style={styles.overtimeTitle}>Horas Extras 50%</Text>
                    </View>
                    <Text style={[styles.overtimeValue, {color: '#43A047'}]}>
                      {calculateDetailedStats().overtime50}
                    </Text>
                    <Text style={styles.overtimeCaption}>Dias úteis</Text>
                  </View>
                  
                  <View style={styles.overtimeCard}>
                    <View style={styles.overtimeHeader}>
                      <Ionicons name="star" size={18} color="#E65100" />
                      <Text style={styles.overtimeTitle}>Horas Extras 100%</Text>
                    </View>
                    <Text style={[styles.overtimeValue, {color: '#E65100'}]}>
                      {calculateDetailedStats().overtime100}
                    </Text>
                    <Text style={styles.overtimeCaption}>Domingos/feriados</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setSummaryModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButtonHeader: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipSelected: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  filterChipText: {
    fontSize: 14,
    color: '#455A64',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryButton: {
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    marginHorizontal: 16,
    marginVertical: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    padding: 12,
    marginTop: 16, // Adicione esta linha para manter um espaçamento adequado
  },
  tableHeaderCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 2,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tableContent: {
    paddingBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  tableRowEven: {
    backgroundColor: '#F5F7FA',
  },
  tableRowAlert: {
    backgroundColor: '#FFF8E1',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#263238',
  },
  timeText: {
    fontSize: 13,
    color: '#455A64',
    fontWeight: '500',
  },
  alertIconContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#455A64',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#455A64',
    textAlign: 'center',
    marginTop: 16,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#455A64',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    color: '#263238',
    fontWeight: '600',
  },
  dayText: {
    fontSize: 12,
    color: '#00000',
    marginTop: 2,
  },
  hoursText: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: '80%',
  },
  closeModalButton: {
    backgroundColor: '#1565C0',
    padding: 14,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
    marginTop: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  statLabel: {
    fontSize: 12,
    color: '#455A64',
  },
  hoursCard: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  hoursLabel: {
    fontSize: 14,
    color: '#455A64',
    marginVertical: 8,
  },
  hoursValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  hoursSubtext: {
    fontSize: 12,
    color: '#455A64',
    marginTop: 4,
  },
  overtimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overtimeCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  overtimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  overtimeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#455A64',
    marginLeft: 6,
  },
  overtimeValue: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 4,
  },
  overtimeCaption: {
    fontSize: 11,
    color: '#455A64',
  },
});