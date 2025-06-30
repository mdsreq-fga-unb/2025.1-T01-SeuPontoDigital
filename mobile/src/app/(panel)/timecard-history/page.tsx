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
  Modal
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function TimecardHistory() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Receber parâmetros de navegação
  const params = useLocalSearchParams();
  const employeeId = params.employeeId;
  const employeeName = params.employeeName;

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
  
  // Função para calcular horas trabalhadas corretamente
  const calculateWorkedHours = (entry: string, lunchOut: string, lunchIn: string, exit: string) => {
    const [entryH, entryM] = entry.split(':').map(Number);
    const [lunchOutH, lunchOutM] = lunchOut.split(':').map(Number);
    const [lunchInH, lunchInM] = lunchIn.split(':').map(Number);
    const [exitH, exitM] = exit.split(':').map(Number);
    
    // Converter tudo para minutos
    const entryMinutes = entryH * 60 + entryM;
    const lunchOutMinutes = lunchOutH * 60 + lunchOutM;
    const lunchInMinutes = lunchInH * 60 + lunchInM;
    const exitMinutes = exitH * 60 + exitM;
    
    // Calcular período da manhã e tarde
    const morningMinutes = lunchOutMinutes - entryMinutes;
    const afternoonMinutes = exitMinutes - lunchInMinutes;
    const totalMinutes = morningMinutes + afternoonMinutes;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  // Função para obter o dia da semana
  const getDayOfWeek = (date: Date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  // Função para calcular estatísticas detalhadas
  const calculateDetailedStats = () => {
    const totalRecords = filteredHistory.length;
    const alertsCount = filteredHistory.filter(item => item.hasAlert).length;
    
    // Calcular diferentes tipos de alertas (exemplos fictícios para demonstração)
    const lateCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('padrão')).length;
    
    const absentCount = filteredHistory.filter(item => 
      item.hasAlert && item.records.entry === '--:--').length;
    
    const withMedicalCertificateCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('atestado')).length;
    
    const holidaysCount = filteredHistory.filter(item => 
      item.hasAlert && item.alertReason.includes('feriado')).length;
      
    // Calcular total de horas
    const totalMinutes = filteredHistory.reduce((acc, item) => {
      const [hours, minutes] = item.totalHours.match(/(\d+)h(?:\s(\d+)m)?/)?.slice(1) || ['0', '0'];
      return acc + (parseInt(hours) * 60) + (parseInt(minutes || '0'));
    }, 0);
    
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalHoursFormatted = `${totalHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`;
    
    // Para exemplos fictícios de horas extras
    const overtime50 = `${Math.floor(totalHours * 0.15)}h ${Math.floor(remainingMinutes * 0.15)}m`;
    const overtime100 = `${Math.floor(totalHours * 0.08)}h ${Math.floor(remainingMinutes * 0.08)}m`;
    
    // Calcular média diária
    const avgHoursPerDay = totalRecords > 0 ? (totalMinutes / totalRecords / 60).toFixed(1) : 0;
    
    return {
      totalRecords,
      alertsCount,
      lateCount,
      absentCount, 
      withMedicalCertificateCount,
      holidaysCount,
      totalHoursFormatted,
      overtime50,
      overtime100,
      avgHoursPerDay
    };
  };

  // Simulação de dados para demonstração - em produção viria de uma API
  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    
    setTimeout(() => {
      // Gerar dados de exemplo para os últimos 60 dias
      const exampleData = [];
      const today = new Date();
      
      for (let i = 0; i < 60; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Pular finais de semana para simular dias úteis
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;
        
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        
        // Gerar horários aleatórios realistas
        const entryHour = 8 + Math.floor(Math.random() * 2);
        const entryMin = Math.floor(Math.random() * 30);
        
        const lunchOutHour = 12 + Math.floor(Math.random() * 2);
        const lunchOutMin = Math.floor(Math.random() * 60);
        
        const lunchInHour = lunchOutHour + 1;
        const lunchInMin = Math.floor(Math.random() * 60);
        
        const exitHour = 17 + Math.floor(Math.random() * 3);
        const exitMin = Math.floor(Math.random() * 60);
        
        // Adicionar alguns registros com alertas (cerca de 10%)
        const hasAlert = Math.random() < 0.1;

        // Calcular horas trabalhadas
        const workedHours = calculateWorkedHours(
          `${String(entryHour).padStart(2, '0')}:${String(entryMin).padStart(2, '0')}`,
          `${String(lunchOutHour).padStart(2, '0')}:${String(lunchOutMin).padStart(2, '0')}`,
          `${String(lunchInHour).padStart(2, '0')}:${String(lunchInMin).padStart(2, '0')}`,
          `${String(exitHour).padStart(2, '0')}:${String(exitMin).padStart(2, '0')}`
        );

        // Organizar em um objeto adequado para a tabela
        exampleData.push({
          id: `record-${i}`,
          date: formattedDate,
          fullDate: date,
          dayOfWeek: getDayOfWeek(date),
          records: {
            entry: `${String(entryHour).padStart(2, '0')}:${String(entryMin).padStart(2, '0')}`,
            lunchOut: `${String(lunchOutHour).padStart(2, '0')}:${String(lunchOutMin).padStart(2, '0')}`,
            lunchIn: `${String(lunchInHour).padStart(2, '0')}:${String(lunchInMin).padStart(2, '0')}`,
            exit: `${String(exitHour).padStart(2, '0')}:${String(exitMin).padStart(2, '0')}`
          },
          totalHours: workedHours,
          hasAlert: hasAlert,
          alertReason: hasAlert ? 'Horário fora do padrão' : ''
        });
      }
      
      // Ordenar por data (mais recente primeiro)
      exampleData.sort((a, b) => b.fullDate.getTime() - a.fullDate.getTime());
      
      setFullHistory(exampleData);
      setLoading(false);
    }, 1500);
  }, []);
  
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
        {/* Coluna de horas removida */}
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
              {/* Coluna de horas removida */}
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
    color: '#757575',
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