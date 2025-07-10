import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '@/constants/api'; // Certifique-se de que o caminho para o arquivo de configuração da API está correto

export default function Employer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date());
  const [searchText, setSearchText] = useState('');
  const [employeeDetailsModalVisible, setEmployeeDetailsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Estado para simular empregados
  interface Employee {
    id: string;
    name: string;
    role: string;
    photo: string | null;
    workHours: string;
    startDate: string;
    alerts: number;
    daysWorked: number;
    status: string;
    totalHours: string;
    overtime50: string;
    overtime100: string;
    breakTime: string;
    daysAbsent: number;
    daysWithMedicalCertificate: number;
    daysLate: number;
  }
  
  // Define the structure of the API response
  interface EmployeeResponse {
    empregado: {
      id: string;
      nome: string;
      // Add other fields from the API as needed
    };
    // Add other top-level fields if needed
  }
  
  // Define the structure of the employer data
  interface Employer {
    id: string;
    cpf: string;
    // Add other employer fields as needed
  }
  
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        
        // Obter token de autenticação
        const token = await AsyncStorage.getItem('userToken');
        
        if (!token) {
          console.error("Token de autenticação não encontrado");
          setLoading(false);
          return;
        }
        
        // Obter CPF do usuário logado (para identificar qual empregador é o usuário atual)
        const userCpf = await AsyncStorage.getItem('userCpf');
        
        // Buscar dados de empregadores
        const employerResponse = await api.get('/employers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Encontrar o empregador atual com base no CPF
        const currentEmployer = employerResponse.data.find(
          (employer: Employer) => employer.cpf === userCpf
        );
        
        console.log("Dados de empregadores:", employerResponse.data);
        
        // Se não encontrar, usar o primeiro da lista (fallback)
        const employerId = currentEmployer ? currentEmployer.id : 
          (employerResponse.data.length > 0 ? employerResponse.data[0].id : null);
        
        console.log("ID do empregador encontrado:", employerId);
        
        if (!employerId) {
          console.error("ID do empregador não encontrado na resposta da API");
          setLoading(false);
          return;
        }
        
        // Agora buscar os empregados deste empregador usando o ID obtido
        const response = await api.get('/worklog', {
          params: { employId: employerId },
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log("Dados dos empregados recebidos:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          // Mapear os dados da API para o formato esperado pelo componente
          const mappedEmployees: Employee[] = response.data.map((item: EmployeeResponse) => {
            return {
              id: item.empregado.id,
              name: item.empregado.nome,
              role: "Funcionário",
              photo: null,
              workHours: "08:00 - 17:00",
              startDate: new Date().toLocaleDateString('pt-BR'),
              alerts: 0,
              daysWorked: 0,
              status: "Ativo",
              totalHours: "0h",
              overtime50: "0h",
              overtime100: "0h",
              breakTime: "01:00",
              daysAbsent: 0,
              daysWithMedicalCertificate: 0,
              daysLate: 0
            };
          });
          
          setEmployees(mappedEmployees);
        } else {
          console.log("Nenhum empregado encontrado ou formato inválido");
          setEmployees([]);
        }
      } catch (error) {
        console.error("Erro ao buscar empregados:", error);
        
        if (axios.isAxiosError(error)) {
          console.error("Detalhes do erro:", error.response?.data);
        }
        
        Alert.alert(
          "Erro ao carregar funcionários",
          "Não foi possível carregar a lista de funcionários. Por favor, tente novamente mais tarde."
        );
        
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  // Filtrar empregados com base no texto de pesquisa
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchText.toLowerCase())
  );

  // Visualizar detalhes do empregado
  const viewEmployeeDetails = (employee: Employee) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedEmployee(employee);
    setEmployeeDetailsModalVisible(true);
  };

  // Visualizar histórico de pontos do empregado
  const viewEmployeeTimeHistory = (employee: Employee) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    router.push({
      pathname: '/(panel)/timecard-history/page',
      params: { 
        employeeId: employee.id,  // Este é o ID real do empregado da API
        employeeName: employee.name,
        userType: 'employer' 
      }
    });
    setEmployeeDetailsModalVisible(false);
  };

  // Formatar a data atual
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoHeader}>
          <Image
            source={require('../../../../assets/images/splash-icon.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>
            SeuPonto<Text style={styles.logoHighlight}>Digital</Text>
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Alert.alert('Notificações', 'Funcionalidade em desenvolvimento');
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Corpo principal */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de estatísticas */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Visão Geral</Text>
            <Text style={styles.statsDate}>{formattedDate}</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{employees.length}</Text>
              <Text style={styles.statLabel}>Funcionários</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {employees.filter(emp => emp.status === 'Ativo').length}
              </Text>
              <Text style={styles.statLabel}>Ativos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {employees.reduce((acc, emp) => acc + emp.alerts, 0)}
              </Text>
              <Text style={styles.statLabel}>Alertas</Text>
            </View>
          </View>
        </View>
        
        {/* Campo de pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#78909C" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar funcionário por nome ou cargo..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="#78909C" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Lista de funcionários */}
        <View style={styles.employeesCard}>
          <View style={styles.employeesCardHeader}>
            <Text style={styles.employeesCardTitle}>Meus Funcionários</Text>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1565C0" />
              <Text style={styles.loadingText}>Carregando funcionários...</Text>
            </View>
          ) : filteredEmployees.length > 0 ? (
            <FlatList
              data={filteredEmployees}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.employeeItem}
                  onPress={() => viewEmployeeDetails(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.employeeAvatar}>
                    <FontAwesome5 name="user" size={20} color="#FFFFFF" />
                  </View>
                  
                  <View style={styles.employeeInfo}>
                    <Text style={styles.employeeName}>{item.name}</Text>
                    <Text style={styles.employeeRole}>{item.role}</Text>
                    <View style={styles.employeeStatusContainer}>
                      <View style={[
                        styles.statusDot, 
                        item.status === 'Ativo' ? styles.statusActive : 
                        item.status === 'Férias' ? styles.statusVacation : 
                        styles.statusInactive
                      ]} />
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.employeeStats}>
                    <View style={styles.employeeStat}>
                      <Text style={styles.employeeStatLabel}>Alertas</Text>
                      <View style={[
                        styles.alertBadge,
                        item.alerts > 0 ? styles.alertBadgeWarning : styles.alertBadgeNormal
                      ]}>
                        <Text style={[
                          styles.alertBadgeText,
                          item.alerts > 0 ? styles.alertBadgeTextWarning : styles.alertBadgeTextNormal
                        ]}>
                          {item.alerts}
                        </Text>
                      </View>
                    </View>
                    
                    <MaterialIcons name="chevron-right" size={24} color="#B0BEC5" />
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={64} color="#BBDEFB" />
              <Text style={styles.emptyText}>
                Nenhum funcionário encontrado
              </Text>
            </View>
          )}
        </View>
        
        {/* Botão para voltar à tela inicial */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.replace('/');
          }}
        >
          <Ionicons name="exit-outline" size={20} color="white" />
          <Text style={styles.backButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Modal de detalhes do funcionário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={employeeDetailsModalVisible}
        onRequestClose={() => setEmployeeDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes do Funcionário</Text>
              <TouchableOpacity
                onPress={() => setEmployeeDetailsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#263238" />
              </TouchableOpacity>
            </View>
            
            {selectedEmployee && (
              <>
                <View style={styles.modalDivider} />
                
                <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                  <View style={styles.employeeDetailCard}>
                    <View style={styles.employeeDetailHeader}>
                      <View style={styles.employeeDetailAvatar}>
                        <FontAwesome5 name="user" size={28} color="#FFFFFF" />
                      </View>
                      <View style={styles.employeeDetailInfo}>
                        <Text style={styles.employeeDetailName}>{selectedEmployee.name}</Text>
                        <Text style={styles.employeeDetailRole}>{selectedEmployee.role}</Text>
                      </View>
                    </View>
                    
                    {/* Botão de histórico reposicionado aqui */}
                    <TouchableOpacity 
                      style={styles.historyButtonTop}
                      onPress={() => viewEmployeeTimeHistory(selectedEmployee)}
                    >
                      <Ionicons name="time-outline" size={18} color="#FFFFFF" />
                      <Text style={styles.historyButtonText}>Ver Histórico de Pontos</Text>
                    </TouchableOpacity>
                    
                    {/* Seção de dados pessoais */}
                    <View style={styles.employeeDetailSection}>
                      <View style={styles.sectionTitleContainer}>
                        <Ionicons name="person" size={22} color="#FFFFFF" style={styles.sectionTitleIcon} />
                        <Text style={styles.sectionTitleEnhanced}>Informações Do Funcionário</Text>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <Ionicons name="calendar-outline" size={18} color="#1565C0" />
                        <Text style={styles.detailLabel}>Data de admissão:</Text>
                        <Text style={styles.detailValue}>{selectedEmployee.startDate}</Text>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <Ionicons name="time-outline" size={18} color="#1565C0" />
                        <Text style={styles.detailLabel}>Horário:</Text>
                        <Text style={styles.detailValue}>{selectedEmployee.workHours}</Text>
                      </View>

                      {/* Nova linha para o tempo de intervalo */}
                      <View style={styles.detailItem}>
                        <Ionicons name="restaurant-outline" size={18} color="#1565C0" />
                        <Text style={styles.detailLabel}>Tempo de intervalo:</Text>
                        <Text style={styles.detailValue}>{selectedEmployee.breakTime} h</Text>
                      </View>
                      
                      {/* Substituição da seção de alertas */}
                      <View style={styles.detailItem}>
                        <Ionicons name="calendar-sharp" size={18} color="#F44336" />
                        <Text style={styles.detailLabel}>Dias ausente:</Text>
                        <View style={[
                          styles.detailAlertBadge,
                          selectedEmployee.daysAbsent > 0 ? styles.detailAlertBadgeWarning : styles.detailAlertBadgeNormal
                        ]}>
                          <Text style={[
                            styles.detailAlertText,
                            selectedEmployee.daysAbsent > 0 ? styles.detailAlertTextWarning : styles.detailAlertTextNormal
                          ]}>
                            {selectedEmployee.daysAbsent || 0}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.detailItem}>
                        <Ionicons name="medkit-outline" size={18} color="#2196F3" />
                        <Text style={styles.detailLabel}>Dias de atestado:</Text>
                        <View style={[
                          styles.detailAlertBadge,
                          styles.detailAlertBadgeInfo
                        ]}>
                          <Text style={[
                            styles.detailAlertText,
                            styles.detailAlertTextInfo
                          ]}>
                            {selectedEmployee.daysWithMedicalCertificate || 0}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.detailItem}>
                        <Ionicons name="time" size={18} color="#FF9800" />
                        <Text style={styles.detailLabel}>Dias atrasados:</Text>
                        <View style={[
                          styles.detailAlertBadge,
                          selectedEmployee.daysLate > 0 ? styles.detailAlertBadgeWarning : styles.detailAlertBadgeNormal
                        ]}>
                          <Text style={[
                            styles.detailAlertText,
                            selectedEmployee.daysLate > 0 ? styles.detailAlertTextWarning : styles.detailAlertTextNormal
                          ]}>
                            {selectedEmployee.daysLate || 0}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.detailItem}>
                        <Ionicons name="stats-chart-outline" size={18} color="#1565C0" />
                        <Text style={styles.detailLabel}>Dias trabalhados:</Text>
                        <Text style={styles.detailValue}>{selectedEmployee.daysWorked}</Text>
                      </View>
                    </View>
                    
                    {/* Nova seção de horas - design completamente redesenhado */}
                    <View style={[styles.employeeDetailSection, { marginTop: 16 }]}>
                      <View style={styles.sectionTitleContainer}>
                        <Ionicons name="time" size={22} color="#FFFFFF" style={styles.sectionTitleIcon} />
                        <Text style={styles.sectionTitleEnhanced}>Horas do Mês Atual</Text>
                      </View>
                      
                      {/* Card de horas totais */}
                      <View style={styles.totalHoursCard}>
                        <Text style={styles.totalHoursLabel}>Total de Horas Trabalhadas</Text>
                        <Text style={styles.totalHoursValue}>{selectedEmployee.totalHours}</Text>
                      </View>
                      
                      {/* Cards de horas extras */}
                      <View style={styles.extraHoursRow}>
                        <View style={styles.extraHoursCard}>
                          <View style={styles.extraHoursHeader}>
                            <Ionicons name="star-half" size={18} color="#43A047" />
                            <Text style={styles.extraHoursTitle}>Extras 50%</Text>
                          </View>
                          <Text style={[styles.extraHoursValue, styles.overtime50Value]}>
                            {selectedEmployee.overtime50}
                          </Text>
                          <Text style={styles.extraHoursCaption}>Dias úteis após jornada normal</Text>
                        </View>
                        
                        <View style={styles.extraHoursCard}>
                          <View style={styles.extraHoursHeader}>
                            <Ionicons name="star" size={18} color="#E65100" />
                            <Text style={styles.extraHoursTitle}>Extras 100%</Text>
                          </View>
                          <Text style={[styles.extraHoursValue, styles.overtime100Value]}>
                            {selectedEmployee.overtime100}
                          </Text>
                          <Text style={styles.extraHoursCaption}>Domingos e feriados</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© SeuPontoDigital 2025</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerAction: {
    padding: 8,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 36,
    height: 36,
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoHighlight: {
    color: '#4FC3F7',
  },
  
  // Estatísticas
  statsCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  statsDate: {
    fontSize: 14,
    color: '#78909C',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#455A64',
  },
  
  // Pesquisa
  searchContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 15,
    color: '#263238',
  },
  clearButton: {
    padding: 4,
  },
  
  // Lista de funcionários
  employeesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  employeesCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  employeesCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 15,
    color: '#455A64',
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#455A64',
    marginTop: 12,
  },
  employeeItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  employeeAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 2,
  },
  employeeRole: {
    fontSize: 14,
    color: '#455A64',
    marginBottom: 4,
  },
  employeeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#F44336',
  },
  statusVacation: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    fontSize: 12,
    color: '#78909C',
  },
  employeeStats: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  employeeStat: {
    alignItems: 'center',
    marginBottom: 6,
  },
  employeeStatLabel: {
    fontSize: 12,
    color: '#78909C',
    marginBottom: 4,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  alertBadgeNormal: {
    backgroundColor: '#E8F5E9',
  },
  alertBadgeWarning: {
    backgroundColor: '#FFF8E1',
  },
  alertBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertBadgeTextNormal: {
    color: '#4CAF50',
  },
  alertBadgeTextWarning: {
    color: '#F57C00',
  },
  
  // Botão de sair
  backButton: {
    backgroundColor: '#1565C0',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 50, 56, 0.7)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalScrollView: {
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263238',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  
  // Detalhes do funcionário no modal
  employeeDetailCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  employeeDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  employeeDetailAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  employeeDetailInfo: {
    flex: 1,
  },
  employeeDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },
  employeeDetailRole: {
    fontSize: 15,
    color: '#455A64',
  },
  employeeDetailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#263238',
    fontWeight: '500',
  },
  detailAlertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  detailAlertBadgeNormal: {
    backgroundColor: '#E8F5E9',
  },
  detailAlertBadgeWarning: {
    backgroundColor: '#FFF8E1',
  },
  detailAlertBadgeInfo: {
    backgroundColor: '#E3F2FD',
  },
  detailAlertText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailAlertTextNormal: {
    color: '#4CAF50',
  },
  detailAlertTextWarning: {
    color: '#F57C00',
  },
  detailAlertTextInfo: {
    color: '#2196F3',
  },
  
  // Nova seção de horas
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginLeft: 8,
  },
  totalHoursCard: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  totalHoursLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    marginBottom: 6,
  },
  totalHoursValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  extraHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraHoursCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  extraHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  extraHoursTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#455A64',
    marginLeft: 6,
  },
  extraHoursValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  overtime50Value: {
    color: '#43A047',
  },
  overtime100Value: {
    color: '#E65100',
  },
  extraHoursCaption: {
    fontSize: 11,
    color: '#00000',
    lineHeight: 14,
  },
  
  // Botões de ação
  actionButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  historyButton: {
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  historyButtonTop: {
    backgroundColor: '#1565C0',
    borderRadius: 8, 
    padding: 18, 
    marginTop: 10, 
    marginBottom: 10, 
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  // Footer
  footer: {
    backgroundColor: '#1565C0',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Adicionados novos estilos
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitleIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    borderRadius: 8,
  },
  sectionTitleEnhanced: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
    letterSpacing: 0.3,
  },
});