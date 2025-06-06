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

export default function Profile() {
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
      
      <ScrollView style={styles.scrollView}>
        {/* Informações do Usuário */}
        <View style={styles.userInfoCard}>
          <View style={styles.userAvatarContainer}>
            <FontAwesome5 name="user-circle" size={60} color="#1565C0" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>João da Silva</Text>
            <Text style={styles.userRole}>Analista de Sistemas</Text>
            <Text style={styles.userCompany}>TechSolutions LTDA</Text>
          </View>
        </View>
        
        {/* Card de Data Atual */}
        <View style={styles.dateCard}>
          <Ionicons name="calendar" size={24} color="#1565C0" />
          <Text style={styles.dateText}>Hoje, {formattedDate}</Text>
        </View>
        
        {/* Card de Registro de Ponto */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Registrar Ponto</Text>
          </View>
          
          <View style={styles.cardContent}>
            <View style={styles.timeButtonsContainer}>
              <TouchableOpacity 
                style={[styles.timeButton, todayRecords.entrada && styles.disabledButton]}
                onPress={() => registerTimecard('Entrada')}
                disabled={todayRecords.entrada}
              >
                <MaterialIcons name="login" size={24} color={todayRecords.entrada ? "#90A4AE" : "white"} />
                <Text style={[styles.timeButtonText, todayRecords.entrada && styles.disabledButtonText]}>Entrada</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeButton, todayRecords.saidaAlmoco && styles.disabledButton]}
                onPress={() => registerTimecard('Saída Almoço')}
                disabled={todayRecords.saidaAlmoco || !todayRecords.entrada}
              >
                <MaterialIcons name="lunch-dining" size={24} color={todayRecords.saidaAlmoco || !todayRecords.entrada ? "#90A4AE" : "white"} />
                <Text style={[styles.timeButtonText, (todayRecords.saidaAlmoco || !todayRecords.entrada) && styles.disabledButtonText]}>Saída Almoço</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.timeButtonsContainer}>
              <TouchableOpacity 
                style={[styles.timeButton, todayRecords.voltaAlmoco && styles.disabledButton]}
                onPress={() => registerTimecard('Volta Almoço')}
                disabled={todayRecords.voltaAlmoco || !todayRecords.saidaAlmoco}
              >
                <MaterialIcons name="lunch-dining" size={24} color={todayRecords.voltaAlmoco || !todayRecords.saidaAlmoco ? "#90A4AE" : "white"} />
                <Text style={[styles.timeButtonText, (todayRecords.voltaAlmoco || !todayRecords.saidaAlmoco) && styles.disabledButtonText]}>Volta Almoço</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeButton, todayRecords.saida && styles.disabledButton]}
                onPress={() => registerTimecard('Saída')}
                disabled={todayRecords.saida || !todayRecords.voltaAlmoco}
              >
                <MaterialIcons name="logout" size={24} color={todayRecords.saida || !todayRecords.voltaAlmoco ? "#90A4AE" : "white"} />
                <Text style={[styles.timeButtonText, (todayRecords.saida || !todayRecords.voltaAlmoco) && styles.disabledButtonText]}>Saída</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Card de Ações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Outras Ações</Text>
          </View>
          
          <View style={styles.cardContent}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setHistoricalModalVisible(true)}
            >
              <Ionicons name="time-outline" size={24} color="#1565C0" />
              <Text style={styles.actionButtonText}>Histórico de Pontos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setUploadModalVisible(true)}
            >
              <Ionicons name="document-text-outline" size={24} color="#1565C0" />
              <Text style={styles.actionButtonText}>Enviar Atestado</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Botão para voltar à tela inicial */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Voltar à Tela Inicial</Text>
        </TouchableOpacity>
      </ScrollView>
      
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
              <TouchableOpacity onPress={() => setHistoricalModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1565C0" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              {records.map((day, index) => (
                <View key={index} style={styles.dayRecord}>
                  <Text style={styles.dayRecordDate}>{day.date}</Text>
                  {day.records.map((record, rIndex) => (
                    <View key={rIndex} style={styles.recordItem}>
                      <View style={styles.recordType}>
                        <MaterialIcons 
                          name={
                            record.type === 'Entrada' ? 'login' :
                            record.type === 'Saída' ? 'logout' : 'lunch-dining'
                          } 
                          size={18} 
                          color="#1565C0" 
                        />
                        <Text style={styles.recordTypeText}>{record.type}</Text>
                      </View>
                      <Text style={styles.recordTime}>{record.time}</Text>
                      <Text style={[
                        styles.recordStatus, 
                        record.status !== 'Normal' && styles.recordStatusAlert
                      ]}>
                        {record.status}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
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
              <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1565C0" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.uploadForm}>
              <Text style={styles.formLabel}>Data da Falta</Text>
              <TouchableOpacity style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>Selecionar data</Text>
                <Ionicons name="calendar" size={20} color="#1565C0" />
              </TouchableOpacity>
              
              <Text style={styles.formLabel}>Motivo</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Descreva o motivo da falta"
                multiline={true}
                numberOfLines={3}
              />
              
              <Text style={styles.formLabel}>Anexar Atestado</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={24} color="white" />
                <Text style={styles.uploadButtonText}>Selecionar Arquivo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={() => {
                  Alert.alert('Atestado Enviado', 'Seu atestado foi enviado com sucesso e será analisado.');
                  setUploadModalVisible(false);
                }}
              >
                <Text style={styles.submitButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
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