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
  FlatList
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
      </View>
      
      {/* Cabeçalho da Tabela */}
      <View style={styles.tableHeader}>
        <View style={[styles.tableHeaderCell, { flex: 1.2
         }]}>
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
        <View style={[styles.tableHeaderCell, { flex: 1.2 }]}>
          <Text style={styles.tableHeaderText}>Horas</Text>
        </View>
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
                  // Em produção, aqui poderia abrir um modal com detalhes do alerta
                }
              }}
            >
              <View style={[styles.tableCell, { flex: 1.5 }]}>
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
              <View style={[styles.tableCell, { flex: 1.2 }]}>
                <Text style={styles.hoursText}>{item.totalHours}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total de registros:</Text>
                <Text style={styles.summaryValue}>{filteredHistory.length}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Com alertas:</Text>
                <Text style={[styles.summaryValue, { color: '#F57C00' }]}>
                  {filteredHistory.filter(item => item.hasAlert).length}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total de horas:</Text>
                <Text style={styles.summaryValue}>
                  {(() => {
                    const totalMinutes = filteredHistory.reduce((acc, item) => {
                      const [hours, minutes] = item.totalHours.match(/(\d+)h(?:\s(\d+)m)?/)?.slice(1) || ['0', '0'];
                      return acc + (parseInt(hours) * 60) + (parseInt(minutes || '0'));
                    }, 0);
                    const totalHours = Math.floor(totalMinutes / 60);
                    const remainingMinutes = totalMinutes % 60;
                    return `${totalHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`;
                  })()}
                </Text>
              </View>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#BBDEFB" />
          <Text style={styles.emptyText}>
            Nenhum registro encontrado para {months[selectedMonth]} de {selectedYear}
          </Text>
        </View>
      )}
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    padding: 12,
  },
  tableHeaderCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
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
    padding: 12,
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
    fontSize: 14,
    color: '#455A64',
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
  }
});