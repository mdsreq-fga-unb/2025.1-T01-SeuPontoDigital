import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Dimensions, 
  TouchableOpacity,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { Link } from 'expo-router'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LOCAL_IP = '192.168.0.79'

const api = axios.create({ 
  baseURL: 
    Platform.OS === 'ios'
      ? 'http://localhost:3333/api'
      : Platform.OS === 'android'
      ? 'http://10.0.2.2:3333/api'
      : 'http://localhost:3333/api'
  });

export default function EntryScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  async function handleVerify(){
      setLoading(true);
      try{
          const response = await api.post('/loginMobile', {email, password});
          const { token } = response.data;
          await AsyncStorage.setItem('userToken', token);
          console.log('Token recebido:', token);
          Alert.alert("Usuario Logado com Sucesso");
      } catch (err){
        if (axios.isAxiosError(err) && err.response) {
          // Erro de resposta vinda do backend
          Alert.alert('Erro', err.response.data.error || 'Falha na autenticação');
        } else if (err instanceof Error) {
          // Erro de rede ou timeout
          Alert.alert('Erro de rede', err.message);
          console.log(err);
        } else {
          Alert.alert('Erro', 'Ocorreu um erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
   }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.logoHeader}>
          <Image
            source={require('../../assets/images/splash-icon.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>
            SeuPonto<Text style={styles.logoHighlight}>Digital</Text>
          </Text>
        </View>
      </View>
      
      
      <View style={styles.content}>

        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/splash-icon.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.loginCard}>
          <Text style={styles.cardTitle}>
            SeuPonto<Text style={styles.cardHighlight}>Digital</Text>
          </Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Pressable  
              style={styles.accessButton}
              onPress={handleVerify}
            >
              <Text style={styles.accessButtonText}>Acessar</Text>
            </Pressable>
            

            <Link 
                href='/(auth)/firstTime/page' 
                style={styles.registerLink}
            >
                <Text style={styles.registerText}>Primeira vez? Clique aqui</Text>
            </Link>

            <Link 
                href='/(auth)/forgotpass/page' 
                style={styles.helpLink}
            >
                <Text style={styles.helpText}>Esqueceu sua senha?</Text>
            </Link>
                    
          </View>
        </View>
      </View>
      

      <View style={styles.footer}>
        <Text style={styles.footerText}>© SeuPontoDigital 2025</Text>
      </View>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: height * 0.25,
  },
  illustration: {
    width: width * 0.7,
    height: height * 0.25,
  },
  loginCard: {
    backgroundColor: '#F5F8FF',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#263238',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardHighlight: {
    color: '#1565C0',
  },
  formGroup: {
    width: '100%',
  },
  inputLabel: {
    color: '#263238',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  accessButton: {
    backgroundColor: '#1565C0',
    borderRadius: 4,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  accessButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  registerText: {
    color: '#1565C0',
    fontSize: 15,
    fontWeight: '500',
  },
  helpLink: {
    textAlign: 'center',
    marginTop: 10,
    alignItems: 'center',

  },
  helpText: {
    color: '#000',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: '#1565C0',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
  }
});
