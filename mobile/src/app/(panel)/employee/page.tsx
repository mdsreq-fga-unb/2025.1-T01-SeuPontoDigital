import React, { useState, useEffect, useRef } from 'react';
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
  ActivityIndicator,
  Platform,
  FlatList,
  Dimensions,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import api from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface Employee {
  id: string;
  name: string;
}

interface Contract {
  id: string;
  employerName: string;
  position: string;
  active: boolean;
}

interface RecordItem {
    type: string;
    time: string;
    status: string;
}

interface DayRecord {
    date: string;
    records: RecordItem[];
}

export default function Employee() {
  const router = useRouter();
  const [currentDate] = useState(new Date());
  const [historicalModalVisible, setHistoricalModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState('');
  
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  
  // Estado para o modal de contratos e contrato selecionado
  const [contractsModalVisible, setContractsModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [currentContractId, setCurrentContractId] = useState<string | null>(null);
  
  const [records, setRecords] = useState<DayRecord[]>([]);
  
  // Estado para controlar quais registros já foram feitos hoje
  const [todayRecords, setTodayRecords] = useState({
    entrada: false,
    saidaAlmoco: false,
    voltaAlmoco: false,
    saida: false
  });

  // Efeito para animar componentes na entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const fetchTodayRecords = async (contractId: string) => {
    if (!contractId) return;

      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await api.get(`/worklogToday/${contractId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data) {
          const { todayRecords: fetchedToday, recordDetails } = response.data

          setTodayRecords(fetchedToday);
          
          if (recordDetails && recordDetails.records.length > 0) {
    
              setRecords(prevRecords => {
                  const otherDays = prevRecords.filter(r => r.date !== recordDetails.date);
                  return [recordDetails, ...otherDays];
              });
          }
        }
      } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Erro ao buscar registros do dia:", error.response?.data?.message || error.message);
          } else {
            console.error("Erro inesperado ao buscar registros do dia:", error);
          }
          setTodayRecords({ entrada: false, saidaAlmoco: false, voltaAlmoco: false, saida: false });
          Alert.alert("Erro", "Não foi possível carregar os registros de ponto para este contrato.");
      }
  };

  useEffect(() => {
    const fetchEmployeeAndContracts = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const response = await api.get('/employee-contracts', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000
        });
        
        const { employee, contracts: contractsFromApi } = response.data;

        setEmployeeInfo(employee);

        const formattedContracts = contractsFromApi.map((sc: any) => ({
          id: sc.id_contract,
          employerName: sc.employerDetails.name,
          position: sc.contractDetails.office,
          active: sc.contractDetails.active_c || true
        }));
        
        setContracts(formattedContracts);

         if (formattedContracts.length > 1) {
          const firstContract = formattedContracts[0];
          setSelectedContract(formattedContracts[0]);
          setCurrentContractId(formattedContracts[0].id);
          // console.log("contrato atual", currentContractId);
          await fetchTodayRecords(firstContract.id);
          setContractsModalVisible(true);

        } else if (formattedContracts.length === 1) {
          const singleContract = formattedContracts[0];
          setSelectedContract(formattedContracts[0]);
          setCurrentContractId(formattedContracts[0].id);
          await fetchTodayRecords(singleContract.id);

        } else {
          Alert.alert(
            "Nenhum Contrato Encontrado", 
            "Não encontramos contratos de trabalho ativos para você. Entre em contato com o suporte se isso for um erro."
          );
        }
        // console.log("contrato atual", currentContractId);
      } catch (error) {
        console.error('Erro ao buscar dados do empregado:', error);
        Alert.alert('Erro de Conexão', 'Não foi possível carregar seus dados. Verifique sua conexão e tente novamente.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchEmployeeAndContracts();
  }, []);

  const selectContract = async (contract: Contract) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if (currentContractId !== contract.id) {    
      setSelectedContract(contract);
      setCurrentContractId(contract.id)
      setTodayRecords({ entrada: false, saidaAlmoco: false, voltaAlmoco: false, saida: false })
      setRecords([]);
      await fetchTodayRecords(contract.id);
    } else {
      setSelectedContract(contract);
    }
    setContractsModalVisible(false);
  };

  
  // Função para registrar ponto
  const registerTimecard = async (type: 'Entrada' | 'Saída Almoço' | 'Volta Almoço' | 'Saída') => {    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    setLoadingButton(type);
    
    // Verificar se um contrato foi selecionado
    if (!selectedContract) {
      Alert.alert('Selecione um contrato', 'Você precisa selecionar um contrato para registrar o ponto.');
      setContractsModalVisible(true);
      setLoading(false);
      setLoadingButton('');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const timeString = new Date().toTimeString().split(' ')[0];

      let response;
        
      const headers = { 'Authorization': `Bearer ${token}` };

      if (type === 'Entrada') {
          // Se for a primeira marcação, cria o registro do dia (POST)
          const payload = {
              contractId: selectedContract.id,
              clock_in: timeString,
          };
          response = await api.post('/worklog', payload, { headers });
      } else {
          // Para as demais marcações, atualiza o registro existente (PUT)
          const payload: { contractId: string; [key: string]: string } = {
              contractId: selectedContract.id,
          };
          const fieldMap = {
              'Saída Almoço': 'break_start',
              'Volta Almoço': 'break_end',
              'Saída': 'clock_out',
          };
          payload[fieldMap[type]] = timeString;
          response = await api.put('/worklog', payload, { headers });
      }

      if (response.status === 201 || response.status === 200) {
        setTodayRecords(prev => ({ ...prev, [type === 'Entrada' ? 'entrada' : type === 'Saída Almoço' ? 'saidaAlmoco' : type === 'Volta Almoço' ? 'voltaAlmoco' : 'saida']: true }));
        
        const todayFormatted = new Date().toLocaleDateString('pt-BR');
        const newRecord: RecordItem = { type, time: timeString.substring(0, 5), status: 'Normal' };

        setRecords(prevRecords => {
            const existingDayIndex = prevRecords.findIndex(r => r.date === todayFormatted);
            if (existingDayIndex > -1) {
                const updatedRecords = [...prevRecords];
                updatedRecords[existingDayIndex].records.push(newRecord);
                return updatedRecords;
            } else {
                const newDay: DayRecord = { date: todayFormatted, records: [newRecord] };
                return [newDay, ...prevRecords];
            }
        })

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Ponto Registrado!', `${type} registrado com sucesso às ${timeString.substring(0, 5)}.`);
      }

    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      let errorMessage = 'Ocorreu um erro ao registrar o ponto.';
      if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || errorMessage;
      }
      console.error('Erro ao registrar ponto:', error);
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
      setLoadingButton('');
    }
  };

  // Formatar a data atual
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  const formattedHour = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  
  // Função para obter um ícone baseado no tipo de registro
  const getRecordIcon = (type: 'Entrada' | 'Saída Almoço' | 'Volta Almoço' | 'Saída' | string) => {
    switch (type) {
      case 'Entrada':
        return 'login';
      case 'Saída Almoço':
      case 'Volta Almoço':
        return 'restaurant';
      case 'Saída':
        return 'logout';
      default:
        return 'schedule';
    }
  };
  
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
          onPress={() => setHistoricalModalVisible(true)}
        >
          <Ionicons name="time-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Informações do Usuário */}
        <Animated.View 
          style={[
            styles.userInfoCard, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <View style={styles.userAvatarContainer}>
            <FontAwesome5 name="user-circle" size={60} color="#1565C0" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>João da Silva</Text>
            <Text style={styles.userRole}>{selectedContract ? selectedContract.position : 'Selecione um contrato'}</Text>
            <View style={styles.employerContainer}>
              <FontAwesome5 name="building" size={12} color="#455A64" style={{marginRight: 6}} />
              <Text style={styles.userCompany}>{selectedContract ? selectedContract.employerName : 'Nenhum contrato selecionado'}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.changeContractButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              if (selectedContract) {
                setCurrentContractId(selectedContract.id);
              }
              setContractsModalVisible(true);
            }}
          >
            <MaterialIcons name="swap-horiz" size={20} color="#1565C0" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Card de Data e Hora Atual */}
        <Animated.View 
          style={[
            styles.dateTimeCard, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <View style={styles.dateSection}>
            <Ionicons name="calendar" size={22} color="#1565C0" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={styles.timeSection}>
            <Ionicons name="time-outline" size={22} color="#1565C0" />
            <Text style={styles.timeText}>{formattedHour}</Text>
          </View>
        </Animated.View>
        
        {/* Card de Progresso do Dia */}
        <Animated.View 
          style={[
            styles.progressCard, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <Text style={styles.progressTitle}>Progresso do Dia</Text>
          <View style={styles.progressTracker}>
            <View style={[
              styles.progressStep,
              todayRecords.entrada ? styles.progressStepCompleted : {}
            ]}>
              <View style={[
                styles.progressCircle,
                todayRecords.entrada ? styles.progressCircleCompleted : {}
              ]}>
                <MaterialIcons 
                  name="login" 
                  size={18} 
                  color={todayRecords.entrada ? "#FFFFFF" : "#90A4AE"} 
                />
              </View>
              <Text style={[
                styles.progressText,
                todayRecords.entrada ? styles.progressTextCompleted : {}
              ]}>
                Entrada
              </Text>
            </View>
            
            {/* A linha só fica verde se AMBOS os pontos conectados estiverem registrados */}
            <View style={[
              styles.progressConnector,
              todayRecords.entrada && todayRecords.saidaAlmoco ? styles.progressConnectorActive : {}
            ]} />
            
            <View style={[
              styles.progressStep,
              todayRecords.saidaAlmoco ? styles.progressStepCompleted : {}
            ]}>
              <View style={[
                styles.progressCircle,
                todayRecords.saidaAlmoco ? styles.progressCircleCompleted : {}
              ]}>
                <MaterialIcons 
                  name="restaurant" 
                  size={18} 
                  color={todayRecords.saidaAlmoco ? "#FFFFFF" : "#90A4AE"} 
                />
              </View>
              <Text style={[
                styles.progressText,
                todayRecords.saidaAlmoco ? styles.progressTextCompleted : {}
              ]}>
                Almoço
              </Text>
            </View>
            
            {/* A linha só fica verde se AMBOS os pontos conectados estiverem registrados */}
            <View style={[
              styles.progressConnector,
              todayRecords.saidaAlmoco && todayRecords.voltaAlmoco ? styles.progressConnectorActive : {}
            ]} />
            
            <View style={[
              styles.progressStep,
              todayRecords.voltaAlmoco ? styles.progressStepCompleted : {}
            ]}>
              <View style={[
                styles.progressCircle,
                todayRecords.voltaAlmoco ? styles.progressCircleCompleted : {}
              ]}>
                <MaterialIcons 
                  name="work" 
                  size={18} 
                  color={todayRecords.voltaAlmoco ? "#FFFFFF" : "#90A4AE"} 
                />
              </View>
              <Text style={[
                styles.progressText,
                todayRecords.voltaAlmoco ? styles.progressTextCompleted : {}
              ]}>
                Retorno
              </Text>
            </View>
            
            {/* A linha só fica verde se AMBOS os pontos conectados estiverem registrados */}
            <View style={[
              styles.progressConnector,
              todayRecords.voltaAlmoco && todayRecords.saida ? styles.progressConnectorActive : {}
            ]} />
            
            <View style={[
              styles.progressStep,
              todayRecords.saida ? styles.progressStepCompleted : {}
            ]}>
              <View style={[
                styles.progressCircle,
                todayRecords.saida ? styles.progressCircleCompleted : {}
              ]}>
                <MaterialIcons 
                  name="logout" 
                  size={18} 
                  color={todayRecords.saida ? "#FFFFFF" : "#90A4AE"} 
                />
              </View>
              <Text style={[
                styles.progressText,
                todayRecords.saida ? styles.progressTextCompleted : {}
              ]}>
                Saída
              </Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Card de Registro de Ponto */}
        <Animated.View 
          style={[
            styles.card, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Registrar Ponto</Text>
            <Text style={styles.cardSubtitle}>Selecione o tipo de registro</Text>
          </View>
          
          <View style={styles.cardContent}>
            <TouchableOpacity 
              style={[
                styles.timecardButton, 
                todayRecords.entrada && styles.completedButton,
                loading && loadingButton === 'Entrada' && styles.loadingButton
              ]}
              onPress={() => registerTimecard('Entrada')}
              disabled={todayRecords.entrada || loading}
            >
              {loading && loadingButton === 'Entrada' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcons 
                    name="login" 
                    size={24} 
                    color={todayRecords.entrada ? "#4CAF50" : "#1565C0"} 
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={[
                      styles.timecardButtonTitle, 
                      todayRecords.entrada && styles.completedButtonTitle
                    ]}>
                      Entrada
                    </Text>
                    <Text style={[
                      styles.timecardButtonSubtitle,
                      todayRecords.entrada && styles.completedButtonSubtitle
                    ]}>
                      {todayRecords.entrada ? 'Registrado' : 'Iniciar trabalho'}
                    </Text>
                  </View>
                  {todayRecords.entrada && (
                    <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                  )}
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.timecardButton, 
                todayRecords.saidaAlmoco && styles.completedButton,
                !todayRecords.saidaAlmoco && (!todayRecords.entrada || todayRecords.saida) && styles.disabledButton,
                loading && loadingButton === 'Saída Almoço' && styles.loadingButton
              ]}
              onPress={() => registerTimecard('Saída Almoço')}
              disabled={!todayRecords.entrada || todayRecords.saida || todayRecords.saidaAlmoco || loading}
            >
              {loading && loadingButton === 'Saída Almoço' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcons 
                    name="restaurant" 
                    size={24} 
                    color={
                      todayRecords.saidaAlmoco 
                        ? "#4CAF50" // Verde para registrado
                        : (!todayRecords.entrada || todayRecords.saida)
                          ? "#90A4AE" // Cinza para desabilitado
                          : "#1565C0"  // Azul para ativo
                    } 
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={[
                      styles.timecardButtonTitle,
                      todayRecords.saidaAlmoco ? styles.completedButtonTitle : // Priorizar este estilo
                      ((!todayRecords.entrada || todayRecords.saida) ? styles.disabledButtonTitle : {})
                    ]}>
                      Saída Almoço
                    </Text>
                    <Text style={[
                      styles.timecardButtonSubtitle,
                      todayRecords.saidaAlmoco ? styles.completedButtonSubtitle : // Priorizar este estilo
                      ((!todayRecords.entrada || todayRecords.saida) ? styles.disabledButtonSubtitle : {})
                    ]}>
                      {todayRecords.saidaAlmoco ? 'Registrado' : todayRecords.saida ? 'Indisponível' : 'Intervalo'}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.timecardButton, 
                todayRecords.voltaAlmoco && styles.completedButton,
                !todayRecords.voltaAlmoco && (!todayRecords.saidaAlmoco || todayRecords.saida) && styles.disabledButton,
                loading && loadingButton === 'Volta Almoço' && styles.loadingButton
              ]}
              onPress={() => registerTimecard('Volta Almoço')}
              disabled={!todayRecords.saidaAlmoco || todayRecords.voltaAlmoco || todayRecords.saida || loading}
            >
              {loading && loadingButton === 'Volta Almoço' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcons 
                    name="work" 
                    size={24} 
                    color={
                      todayRecords.voltaAlmoco 
                        ? "#4CAF50" 
                        : (!todayRecords.saidaAlmoco || todayRecords.saida) 
                          ? "#90A4AE" 
                          : "#1565C0"
                    } 
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={[
                      styles.timecardButtonTitle,
                      todayRecords.voltaAlmoco ? styles.completedButtonTitle :
                      ((!todayRecords.saidaAlmoco || todayRecords.saida) ? styles.disabledButtonTitle : {})
                    ]}>
                      Volta Almoço
                    </Text>
                    <Text style={[
                      styles.timecardButtonSubtitle,
                      todayRecords.voltaAlmoco ? styles.completedButtonSubtitle :
                      ((!todayRecords.saidaAlmoco || todayRecords.saida) ? styles.disabledButtonSubtitle : {})
                    ]}>
                      {todayRecords.voltaAlmoco ? 'Registrado' : 'Retorno ao trabalho'}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.timecardButton, 
                todayRecords.saida && styles.completedButton,
                (!todayRecords.entrada || (todayRecords.saidaAlmoco && !todayRecords.voltaAlmoco)) && styles.disabledButton,
                loading && loadingButton === 'Saída' && styles.loadingButton
              ]}
              onPress={() => registerTimecard('Saída')}
              disabled={!todayRecords.entrada || (todayRecords.saidaAlmoco && !todayRecords.voltaAlmoco) || todayRecords.saida || loading}
            >
              {loading && loadingButton === 'Saída' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcons 
                    name="logout" 
                    size={24} 
                    color={
                      todayRecords.saida 
                        ? "#4CAF50" 
                        : (!todayRecords.entrada || (todayRecords.saidaAlmoco && !todayRecords.voltaAlmoco)) 
                          ? "#90A4AE" 
                          : "#1565C0"
                    } 
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={[
                      styles.timecardButtonTitle, 
                      todayRecords.saida && styles.completedButtonTitle,
                      (!todayRecords.entrada || (todayRecords.saidaAlmoco && !todayRecords.voltaAlmoco)) && styles.disabledButtonTitle
                    ]}>
                      Saída
                    </Text>
                    <Text style={[
                      styles.timecardButtonSubtitle,
                      todayRecords.saida && styles.completedButtonSubtitle,
                      (!todayRecords.entrada || (todayRecords.saidaAlmoco && !todayRecords.voltaAlmoco)) && styles.disabledButtonSubtitle
                    ]}>
                      {todayRecords.saida ? 'Registrado' : 'Encerrar trabalho'}
                    </Text>
                  </View>
                  {todayRecords.saida && (
                    <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Card de Ações Rápidas */}
        <Animated.View 
          style={[
            styles.quickActionsCard, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <Text style={styles.quickActionsTitle}>Ações Rápidas</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setHistoricalModalVisible(true);
              }}
            >
              <View style={[styles.quickActionIconContainer, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="time-outline" size={24} color="#1565C0" />
              </View>
              <Text style={styles.quickActionText}>Histórico</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setUploadModalVisible(true);
              }}
            >
              <View style={[styles.quickActionIconContainer, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.quickActionText}>Atestado</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setContractsModalVisible(true);
              }}
            >
              <View style={[styles.quickActionIconContainer, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="briefcase-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.quickActionText}>Contratos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setHelpModalVisible(true);
              }}
            >
              <View style={[styles.quickActionIconContainer, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="help-circle-outline" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.quickActionText}>Ajuda</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© SeuPontoDigital 2025</Text>
      </View>
      
      {/* Modal para seleção de contratos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contractsModalVisible}
        onRequestClose={() => {
          if (selectedContract) {
            setContractsModalVisible(false);
          } else {
            if (contracts.length > 0) {
              selectContract(contracts[0]);
            } else {
              Alert.alert("Nenhum contrato disponível", "Não há contratos disponíveis para seleção.");
            }
          }
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione um Contrato</Text>
              {selectedContract && (
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setContractsModalVisible(false);
                  }}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#1565C0" />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.modalDivider} />
            
            <Text style={styles.modalSubtitle}>Escolha o contrato para registrar o ponto:</Text>
            
            <FlatList
              data={contracts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.contractItem, 
                    selectedContract?.id === item.id && styles.contractItemSelected
                  ]}
                  onPress={() => selectContract(item)}
                >
                  <View style={styles.contractItemIconContainer}>
                    <FontAwesome5 
                      name="file-contract" 
                      size={20} 
                      color={selectedContract?.id === item.id ? "#1565C0" : "#78909C"} 
                    />
                  </View>
                  <View style={styles.contractItemContent}>
                    <Text style={styles.contractEmployer}>{item.employerName}</Text>
                    <Text style={styles.contractPosition}>{item.position}</Text>
                  </View>
                  {selectedContract?.id === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              )}
              style={styles.contractsList}
            />
            
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedContract && styles.disabledConfirmButton
              ]}
              onPress={() => {
                if (selectedContract) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                  // Verificar se o contrato mudou, usando o ID armazenado
                  const isChangingContract = currentContractId !== null && 
                                             currentContractId !== selectedContract.id;
                  
                  // Se estiver trocando de contrato
                  if (isChangingContract) {
                    Alert.alert(
                      "Alterar contrato",
                      "Ao trocar de contrato, todos os registros de ponto do dia atual serão resetados. Deseja continuar?",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel"
                        },
                        {
                          text: "Confirmar",
                          onPress: () => {
                            // Resetar todos os registros de ponto
                            setTodayRecords({
                              entrada: false,
                              saidaAlmoco: false,
                              voltaAlmoco: false,
                              saida: false
                            });
                            
                            // Também remover registros do dia atual do histórico
                            const today = new Date();
                            const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
                            
                            const updatedRecords = records.filter(record => record.date !== formattedToday);
                            setRecords(updatedRecords);
                            
                            // Atualizar o ID do contrato atual
                            setCurrentContractId(selectedContract.id);
                            
                            // Fechar o modal
                            setContractsModalVisible(false);
                            
                            // Feedback de sucesso
                            setTimeout(() => {
                              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                              Alert.alert(
                                "Contrato alterado", 
                                `Agora você está registrando ponto como ${selectedContract.position} para ${selectedContract.employerName}.\nTodos os registros do dia atual foram resetados.`
                              );
                            }, 300);
                          }
                        }
                      ]
                    );
                  } else {
                    // Atualizar o ID do contrato atual mesmo se não for mudança
                    setCurrentContractId(selectedContract.id);
                    setContractsModalVisible(false);
                    
                    // Se for a primeira seleção, mostrar mensagem informativa
                    setTimeout(() => {
                      Alert.alert(
                        "Contrato selecionado", 
                        `Você está registrando ponto como ${selectedContract.position} para ${selectedContract.employerName}.`
                      );
                    }, 300);
                  }
                } else {
                  // Nenhum contrato selecionado
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                  Alert.alert(
                    "Seleção necessária", 
                    "Por favor, selecione um contrato para continuar.",
                    [{ text: "OK", style: "default" }]
                  );
                }
              }}
            >
              <Text style={[
                styles.confirmButtonText,
                !selectedContract && styles.disabledConfirmButtonText
              ]}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Modal para histórico de pontos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={historicalModalVisible}
        onRequestClose={() => setHistoricalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Histórico de Pontos</Text>
              <TouchableOpacity 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setHistoricalModalVisible(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#1565C0" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalDivider} />
            
            <ScrollView style={styles.modalScrollView}>
              {records.map((day, index) => (
                <View key={index} style={styles.dayRecord}>
                  <View style={styles.dayRecordHeader}>
                    <Text style={styles.dayRecordDate}>{day.date}</Text>
                    <View style={styles.dayRecordBadge}>
                      <Text style={styles.dayRecordBadgeText}>
                        {day.records.length} registros
                      </Text>
                    </View>
                  </View>
                  
                  {day.records.map((record, rIndex) => (
                    <View key={rIndex} style={styles.recordItem}>
                      <View style={styles.recordIconContainer}>
                        <MaterialIcons 
                          name={getRecordIcon(record.type)} 
                          size={18} 
                          color="#1565C0" 
                        />
                      </View>
                      <View style={styles.recordInfo}>
                        <Text style={styles.recordType}>{record.type}</Text>
                        <Text style={styles.recordTime}>{record.time}</Text>
                      </View>
                      <View style={[
                        styles.recordStatusBadge,
                        record.status !== 'Normal' && styles.recordStatusAlertBadge
                      ]}>
                        <Text style={[
                          styles.recordStatusText,
                          record.status !== 'Normal' && styles.recordStatusAlertText
                        ]}>
                          {record.status}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.viewFullHistoryButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setHistoricalModalVisible(false);
                router.push({
                  pathname: '/(panel)/timecard-history/page',
                  params: { 
                    employeeId: employeeInfo?.id || '',
                    employeeName: employeeInfo?.name || '',
                    // contractId: currentContractId || '',
                    contractId: currentContractId || '',
                    userType: 'employee' // Especifica que é visão de empregado
                  }
                });
              }}
            >
              <Text style={styles.viewFullHistoryButtonText}>Ver histórico completo</Text>
              <Ionicons name="calendar" size={18} color="#FFFFFF" style={{marginLeft: 8}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Modal para envio de atestado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={uploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enviar Atestado</Text>
              <TouchableOpacity 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setUploadModalVisible(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#1565C0" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalDivider} />
            
            <ScrollView style={styles.modalScrollView} contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.uploadInstructions}>
                Envie um atestado médico ou justificativa de ausência preenchendo os campos abaixo.
              </Text>
              
              <View style={styles.uploadForm}>
                <Text style={styles.formLabel}>Data da Falta</Text>
                <TouchableOpacity style={styles.datePickerButton}>
                  <Text style={styles.datePickerText}>Selecionar data</Text>
                  <Ionicons name="calendar" size={20} color="#1565C0" />
                </TouchableOpacity>
                
                <Text style={styles.formLabel}>Motivo da Ausência</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Descreva o motivo da falta"
                    multiline={true}
                    numberOfLines={3}
                    placeholderTextColor="#90A4AE"
                  />
                </View>
                
                <Text style={styles.formLabel}>Anexar Documento</Text>
                <TouchableOpacity 
                  style={styles.uploadFileButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Seleção de Arquivo', 'Esta funcionalidade selecionaria um arquivo de sua galeria ou câmera.');
                  }}
                >
                  <Ionicons name="cloud-upload-outline" size={24} color="#1565C0" />
                  <Text style={styles.uploadFileButtonText}>Selecionar Arquivo</Text>
                </TouchableOpacity>
                
                <Text style={styles.uploadHelpText}>
                  Formatos aceitos: JPG, PNG ou PDF com até 5 MB.
                </Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Alert.alert('Atestado Enviado', 'Seu atestado foi enviado com sucesso e será analisado.');
                setUploadModalVisible(false);
              }}
            >
              <Text style={styles.submitButtonText}>Enviar Atestado</Text>
              <Ionicons name="send" size={20} color="#FFFFFF" style={{marginLeft: 8}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Ajuda e Instruções */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { maxHeight: height * 0.8 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Guia de Uso</Text>
              <TouchableOpacity 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setHelpModalVisible(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#1565C0" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalDivider} />
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Como Registrar seu Ponto</Text>
                <Text style={styles.helpText}>
                  O SeuPontoDigital permite registrar seu ponto diário de forma simples e rápida. 
                  Existem dois fluxos principais dependendo do seu tipo de contrato:
                </Text>
              </View>
              
              {/* Período Integral */}
              <View style={styles.helpCard}>
                <View style={styles.helpCardHeader}>
                  <MaterialIcons name="access-time" size={20} color="#1565C0" />
                  <Text style={styles.helpCardTitle}>Período Integral</Text>
                </View>
                <View style={styles.helpCardContent}>
                  <Text style={styles.helpCardText}>Siga a sequência completa:</Text>
                  
                  <View style={styles.helpStep}>
                    <View style={styles.helpStepIcon}>
                      <MaterialIcons name="login" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>1. Entrada</Text>
                      <Text style={styles.helpStepText}>Registre quando começar seu expediente</Text>
                    </View>
                  </View>
                  
                  <View style={styles.helpStepConnector} />
                  
                  <View style={styles.helpStep}>
                    <View style={styles.helpStepIcon}>
                      <MaterialIcons name="restaurant" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>2. Saída Almoço</Text>
                      <Text style={styles.helpStepText}>Registre início do intervalo de almoço/descanso</Text>
                    </View>
                  </View>
                  
                  <View style={styles.helpStepConnector} />
                  
                  <View style={styles.helpStep}>
                    <View style={styles.helpStepIcon}>
                      <MaterialIcons name="work" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>3. Volta Almoço</Text>
                      <Text style={styles.helpStepText}>Registre o retorno do intervalo</Text>
                    </View>
                  </View>
                  
                  <View style={styles.helpStepConnector} />
                  
                  <View style={styles.helpStep}>
                    <View style={styles.helpStepIcon}>
                      <MaterialIcons name="logout" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>4. Saída</Text>
                      <Text style={styles.helpStepText}>Registre o término do expediente</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Meio Período */}
              <View style={styles.helpCard}>
                <View style={styles.helpCardHeader}>
                  <MaterialIcons name="timelapse" size={20} color="#FF9800" />
                  <Text style={styles.helpCardTitle}>Meio Período</Text>
                </View>
                <View style={styles.helpCardContent}>
                  <Text style={styles.helpCardText}>Sequência simplificada sem intervalo:</Text>
                  
                  <View style={styles.helpStep}>
                    <View style={[styles.helpStepIcon, {backgroundColor: '#FF9800'}]}>
                      <MaterialIcons name="login" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>1. Entrada</Text>
                      <Text style={styles.helpStepText}>Registre quando começar seu expediente</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.helpStepConnector, {backgroundColor: '#FFD54F'}]} />
                  
                  <View style={styles.helpStep}>
                    <View style={[styles.helpStepIcon, {backgroundColor: '#FF9800'}]}>
                      <MaterialIcons name="logout" size={18} color="#FFFFFF" />
                    </View>
                    <View style={styles.helpStepContent}>
                      <Text style={styles.helpStepTitle}>2. Saída</Text>
                      <Text style={styles.helpStepText}>Registre o término do expediente</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Dicas importantes</Text>
                <View style={styles.helpTip}>
                  <Ionicons name="information-circle" size={20} color="#1565C0" />
                  <Text style={styles.helpTipText}>
                    Para funcionários de meio período, o botão de Saída ficará disponível 
                    imediatamente após registrar a Entrada.
                  </Text>
                </View>
                
                <View style={styles.helpTip}>
                  <Ionicons name="information-circle" size={20} color="#1565C0" />
                  <Text style={styles.helpTipText}>
                    Os botões são ativados sequencialmente conforme você registra cada etapa.
                  </Text>
                </View>
                
                <View style={styles.helpTip}>
                  <Ionicons name="information-circle" size={20} color="#1565C0" />
                  <Text style={styles.helpTipText}>
                    Você pode visualizar seu histórico completo de registros tocando no 
                    botão "Histórico" na tela principal.
                  </Text>
                </View>
                
                <View style={styles.helpTip}>
                  <Ionicons name="warning" size={20} color="#FF9800" />
                  <Text style={styles.helpTipText}>
                    Registros de atraso ou saída antes do horário serão sinalizados 
                    automaticamente pelo sistema.
                  </Text>
                </View>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.helpCloseButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setHelpModalVisible(false);
              }}
            >
              <Text style={styles.helpCloseButtonText}>Entendi</Text>
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
  
  // Novo design do card de usuário
  userInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  userAvatarContainer: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 15,
    color: '#455A64',
    marginBottom: 4,
    fontWeight: '500',
  },
  employerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCompany: {
    fontSize: 14,
    color: '#455A64',
    fontStyle: 'italic',
    flex: 1,
  },
  changeContractButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1565C0',
  },
  
  // Novo design do card de data e hora
  dateTimeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginLeft: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
    marginLeft: 8,
  },
  
  // Novo card de progresso
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressTracker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  progressCircleCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#78909C',
    textAlign: 'center',
  },
  progressTextCompleted: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  progressConnector: {
    height: 2,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 4,
  },
  progressConnectorActive: {
    backgroundColor: '#4CAF50',
  },
  progressStepCompleted: {
    opacity: 1,
  },
  
  // Card principal para registro de ponto
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: '#1565C0',
    padding: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  cardContent: {
    padding: 16,
  },
  
  // Novos botões de ponto
  timecardButton: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  completedButton: {
    backgroundColor: '#F1F8E9',
    borderColor: '#C8E6C9',
  },
  disabledButton: {
    backgroundColor: '#FAFAFA',
    borderColor: '#EEEEEE',
  },
  loadingButton: {
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
    justifyContent: 'center',
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  timecardButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 2,
  },
  completedButtonTitle: {
    color: '#2E7D32',
  },
  disabledButtonTitle: {
    color: '#9E9E9E',
  },
  timecardButtonSubtitle: {
    fontSize: 14,
    color: '#78909C',
  },
  completedButtonSubtitle: {
    color: '#4CAF50',
  },
  disabledButtonSubtitle: {
    color: '#BDBDBD',
  },
  
  // Card de ações rápidas
  quickActionsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickActionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#455A64',
    fontWeight: '500',
    marginTop: 4,
  },
  
  // Botão de sair
  backButton: {
    backgroundColor: '#1565C0',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    paddingVertical: 16,
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
  modalSubtitle: {
    fontSize: 15,
    color: '#455A64',
    marginBottom: 15,
  },
  
  // Contratos no modal
  contractsList: {
    maxHeight: 300,
  },
  contractItem: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contractItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contractItemSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
  },
  contractItemContent: {
    flex: 1,
  },
  contractEmployer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },
  contractPosition: {
    fontSize: 14,
    color: '#455A64',
  },
  confirmButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledConfirmButton: {
    backgroundColor: '#BBDEFB', // Azul mais claro (desabilitado)
    opacity: 0.7,
  },
  disabledConfirmButtonText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  
  // Histórico de pontos
  modalScrollView: {
    maxHeight: 400,
  },
  dayRecord: {
    marginBottom: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
  },
  dayRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  dayRecordDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  dayRecordBadge: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dayRecordBadgeText: {
    fontSize: 12,
    color: '#1565C0',
    fontWeight: '500',
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recordIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 15,
    fontWeight: '500',
    color: '#263238',
  },
  recordTime: {
    fontSize: 14,
    color: '#455A64',
  },
  recordStatusBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recordStatusAlertBadge: {
    backgroundColor: '#FFF3E0',
  },
  recordStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  recordStatusAlertText: {
    color: '#F57C00',
  },
  viewFullHistoryButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewFullHistoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Estilos para o form de upload
  uploadInstructions: {
    fontSize: 14,
    color: '#455A64',
    marginBottom: 16,
    lineHeight: 20,
  },
  uploadForm: {
    padding: 10,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 8,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  datePickerText: {
    color: '#455A64',
    fontSize: 15,
  },
  textInputContainer: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 16,
  },
  textInput: {
    padding: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#263238',
  },
  uploadFileButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  uploadFileButtonText: {
    color: '#1565C0',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  uploadHelpText: {
    fontSize: 13,
    color: '#78909C',
    textAlign: 'center',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Estilos para o modal de ajuda
  helpSection: {
    marginBottom: 20,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 15,
    color: '#455A64',
    lineHeight: 22,
  },
  helpCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  helpCardHeader: {
    backgroundColor: '#E3F2FD', 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  helpCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginLeft: 8,
  },
  helpCardContent: {
    padding: 16,
  },
  helpCardText: {
    fontSize: 14,
    color: '#455A64',
    marginBottom: 12,
  },
  helpStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  helpStepIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpStepContent: {
    marginLeft: 12,
    flex: 1,
  },
  helpStepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263238',
  },
  helpStepText: {
    fontSize: 13,
    color: '#455A64',
  },
  helpStepConnector: {
    height: 24,
    width: 2,
    backgroundColor: '#1565C0',
    marginLeft: 16,
  },
  helpTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  helpTipText: {
    fontSize: 14,
    color: '#455A64',
    flex: 1,
    marginLeft: 8,
    lineHeight: 20,
  },
  helpCloseButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  helpCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Estilos para o footer
  footer: {
    backgroundColor: '#1565C0',
    padding: 15,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Para garantir que fique acima do conteúdo
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});