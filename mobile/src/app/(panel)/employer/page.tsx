//editar essa página conforme o empregador
import React, { useState } from 'react';
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
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Empolyer() {
  const router = useRouter();
  const [currentDate] = useState(new Date());
  const [historicalModalVisible, setHistoricalModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  
  // Estado para simular registros de ponto
  const [records, setRecords] = useState([
    { date: '25/05/2025', records: [
      { type: 'Entrada', time: '08:00', status: 'Normal' },
      { type: 'Saída Almoço', time: '12:00', status: 'Normal' },
      { type: 'Volta Almoço', time: '13:00', status: 'Normal' },
      { type: 'Saída', time: '17:00', status: 'Normal' },
    ]},
    { date: '24/05/2025', records: [
      { type: 'Entrada', time: '08:05', status: 'Atraso (5min)' },
      { type: 'Saída Almoço', time: '12:00', status: 'Normal' },
      { type: 'Volta Almoço', time: '13:02', status: 'Normal' },
      { type: 'Saída', time: '17:00', status: 'Normal' },
    ]},
  ]);
  
  // Estado para controlar quais registros já foram feitos hoje
  const [todayRecords, setTodayRecords] = useState({
    entrada: false,
    saidaAlmoco: false,
    voltaAlmoco: false,
    saida: false
  });

  // Função para registrar ponto
  const registerTimecard = (type: 'Entrada' | 'Saída Almoço' | 'Volta Almoço' | 'Saída') => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Atualizaria no backend, mas apenas simulamos aqui
    Alert.alert('Ponto Registrado', `${type} registrado com sucesso às ${timeString}`);
    
    // Atualiza o estado local para refletir que o registro foi feito
    switch (type) {
      case 'Entrada':
        setTodayRecords({...todayRecords, entrada: true});
        break;
      case 'Saída Almoço':
        setTodayRecords({...todayRecords, saidaAlmoco: true});
        break;
      case 'Volta Almoço':
        setTodayRecords({...todayRecords, voltaAlmoco: true});
        break;
      case 'Saída':
        setTodayRecords({...todayRecords, saida: true});
        break;
    }
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
  },
  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  userInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatarContainer: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
  },
  userRole: {
    fontSize: 14,
    color: '#455A64',
  },
  userCompany: {
    fontSize: 14,
    color: '#455A64',
    fontStyle: 'italic',
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263238',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: '#1565C0',
    padding: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  disabledButton: {
    backgroundColor: '#ECEFF1',
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  timeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disabledButtonText: {
    color: '#90A4AE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1565C0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  backButton: {
    backgroundColor: '#1565C0',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  dayRecord: {
    marginBottom: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 12,
  },
  dayRecordDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 4,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recordType: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  recordTypeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#455A64',
  },
  recordTime: {
    fontSize: 14,
    color: '#263238',
    fontWeight: '500',
    width: '20%',
    textAlign: 'center',
  },
  recordStatus: {
    fontSize: 14,
    color: '#4CAF50',
    width: '40%',
    textAlign: 'right',
  },
  recordStatusAlert: {
    color: '#F57C00',
  },
  uploadForm: {
    padding: 10,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#455A64',
    marginBottom: 6,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  datePickerText: {
    color: '#455A64',
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#1565C0',
    borderRadius: 4,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});