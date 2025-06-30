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
  }
  
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Simulação de dados para demonstração - em produção viria de uma API
  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    
    setTimeout(() => {
      const mockEmployees = [
        { 
          id: '1', 
          name: 'João Silva', 
          role: 'Cozinheiro', 
          photo: null,
          workHours: '08:00 - 17:00',
          startDate: '15/02/2024',
          alerts: 2,
          daysWorked: 45,
          status: 'Ativo'
        },
        { 
          id: '2', 
          name: 'Maria Oliveira', 
          role: 'Empregado Domestica', 
          photo: null,
          workHours: '09:00 - 18:00',
          startDate: '10/01/2024',
          alerts: 0,
          daysWorked: 72,
          status: 'Ativo'
        },
        { 
          id: '3', 
          name: 'Pedro Santos', 
          role: 'Empregado Domestico', 
          photo: null,
          workHours: '08:00 - 17:00',
          startDate: '05/03/2024',
          alerts: 1,
          daysWorked: 30,
          status: 'Ativo'
        },
        { 
          id: '4', 
          name: 'Ana Costa', 
          role: 'Motorista', 
          photo: null,
          workHours: '08:30 - 17:30',
          startDate: '20/12/2023',
          alerts: 3,
          daysWorked: 90,
          status: 'Ativo'
        },
        { 
          id: '5', 
          name: 'Carlos Ferreira', 
          role: 'Analista de Dados', 
          photo: null,
          workHours: '09:00 - 18:00',
          startDate: '07/04/2024',
          alerts: 0,
          daysWorked: 15,
          status: 'Ativo'
        },
        { 
          id: '6', 
          name: 'Paulo Gomes', 
          role: 'Engenheiro de Software', 
          photo: null,
          workHours: '08:00 - 17:00',
          startDate: '12/11/2023',
          alerts: 4,
          daysWorked: 120,
          status: 'Férias'
        },
        { 
          id: '7', 
          name: 'Lucia Mendes', 
          role: 'Analista de QA', 
          photo: null,
          workHours: '08:30 - 17:30',
          startDate: '03/01/2024',
          alerts: 1,
          daysWorked: 70,
          status: 'Ativo'
        },
      ];
      
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1500);
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
    // Aqui seria a navegação para a tela de histórico de pontos com os dados do funcionário como parâmetro
    // Em uma implementação real, você passaria o ID do funcionário como parâmetro para a rota
    router.push({
      pathname: '/(panel)/timecard-history/page',
      params: { employeeId: employee.id, employeeName: employee.name }
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
            <TouchableOpacity style={styles.filterButton}>
              <MaterialIcons name="filter-list" size={20} color="#455A64" />
              <Text style={styles.filterText}>Filtrar</Text>
            </TouchableOpacity>
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
                  
                  <View style={styles.employeeDetailSection}>
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
                    
                    <View style={styles.detailItem}>
                      <Ionicons name="alert-circle-outline" size={18} color="#1565C0" />
                      <Text style={styles.detailLabel}>Alertas:</Text>
                      <View style={[
                        styles.detailAlertBadge,
                        selectedEmployee.alerts > 0 ? styles.detailAlertBadgeWarning : styles.detailAlertBadgeNormal
                      ]}>
                        <Text style={[
                          styles.detailAlertText,
                          selectedEmployee.alerts > 0 ? styles.detailAlertTextWarning : styles.detailAlertTextNormal
                        ]}>
                          {selectedEmployee.alerts}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Ionicons name="stats-chart-outline" size={18} color="#1565C0" />
                      <Text style={styles.detailLabel}>Dias trabalhados:</Text>
                      <Text style={styles.detailValue}>{selectedEmployee.daysWorked}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.modalDivider} />
                
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => viewEmployeeTimeHistory(selectedEmployee)}
                  >
                    <Ionicons name="time-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Histórico de Pontos</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.secondaryButton]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      Alert.alert('Em desenvolvimento', 'Funcionalidade de edição em desenvolvimento');
                    }}
                  >
                    <Ionicons name="create-outline" size={20} color="#1565C0" />
                    <Text style={styles.secondaryButtonText}>Editar Dados</Text>
                  </TouchableOpacity>
                </View>
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#455A64',
    marginLeft: 4,
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
    marginBottom: 16,
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
    color: '#455A64',
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
  
  // Botões de ação
  actionButtonsContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1565C0',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#1565C0',
    fontSize: 16,
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
});