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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

// Inicialmente configuramos com um valor base
const apiInstance = axios.create({
  baseURL: 'http://localhost:3333/api',
  timeout: 10000
});

export default function EntryScreen() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [deviceIp, setDeviceIp] = useState('');
  const [serverIp, setServerIp] = useState('');
  const [api, setApi] = useState<AxiosInstance>(apiInstance);
  const [isDetectingNetwork, setIsDetectingNetwork] = useState(true);
  const [isEmulator, setIsEmulator] = useState<boolean | null>(null);
  
  const router = useRouter();

  // Função para detectar se o aplicativo está rodando em um emulador
  const detectEmulator = async (): Promise<boolean> => {
    if (Platform.OS === 'web') return false;
    
    try {
      const deviceType = await Device.getDeviceTypeAsync();
      const brand = Device.brand;
      const modelName = Device.modelName;
      
      // Nomes comuns de emuladores
      const emulatorBrands = ['google', 'Android SDK built for', 'emulator', 'sdk_gphone'];
      const emulatorModels = ['sdk_gphone64', 'Android SDK built for', 'Emulator', 'Google', 'sdk'];
      
      // Verifica se dispositivo é emulador baseado no brand/model
      const isBrandEmulator = brand && emulatorBrands.some(eb => brand.toLowerCase().includes(eb.toLowerCase()));
      const isModelEmulator = modelName && emulatorModels.some(em => modelName.toLowerCase().includes(em.toLowerCase()));
      
      // Para iOS, os simuladores geralmente têm "Simulator" no nome
      const isIosSimulator = Platform.OS === 'ios' && (modelName?.includes('Simulator') || brand?.includes('Simulator'));
      
      console.log(`Dispositivo: ${brand} ${modelName}`);
      return (isBrandEmulator ?? false) || (isModelEmulator ?? false) || (isIosSimulator ?? false);
    } catch (error) {
      console.error("Erro ao detectar emulador:", error);
      return false; // Em caso de erro, assume dispositivo físico
    }
  };

  // Função para configurar a API
  useEffect(() => {
    const configureApiConnection = async () => {
      try {
        setIsDetectingNetwork(true);

        // Detecta se é emulador
        const emulatorDetected = await detectEmulator();
        setIsEmulator(emulatorDetected);
        console.log(`Ambiente detectado: ${emulatorDetected ? 'Emulador' : 'Dispositivo Físico'}`);

        // Obtém o IP do dispositivo
        const networkInfo = await Network.getNetworkStateAsync();
        const deviceNetworkInfo = await Network.getIpAddressAsync();
        setDeviceIp(deviceNetworkInfo);
        
        // Define o IP do servidor baseado no ambiente
        let apiBaseUrl;
        
        // Verifica se já existe um IP do servidor salvo
        const savedIp = await AsyncStorage.getItem('serverIp');
        
        if (savedIp) {
          // Se existe IP salvo, usa ele
          apiBaseUrl = `http://${savedIp}:3333/api`;
          setServerIp(savedIp);
        } else if (emulatorDetected) {
          // Se é emulador, usa o IP especial para emuladores
          if (Platform.OS === 'android') {
            apiBaseUrl = 'http://10.0.2.2:3333/api';
            setServerIp('10.0.2.2');
          } else {
            // Para simuladores iOS
            apiBaseUrl = 'http://localhost:3333/api';
            setServerIp('localhost');
          }
        } else {
          // Para dispositivos físicos, tenta obter um IP adequado da rede
          const ipToUse = await getDeviceNetworkIp() || '192.168.0.104'; // IP de fallback
          apiBaseUrl = `http://${ipToUse}:3333/api`;
          setServerIp(ipToUse);
        }
        
        // Configura a instância do Axios
        const apiConfig = axios.create({
          baseURL: apiBaseUrl,
          timeout: 15000 // 15 segundos para timeout
        });
        
        setApi(apiConfig);
        console.log(`API configurada com URL base: ${apiBaseUrl}`);
        
      } catch (error) {
        console.error("Erro ao configurar conexão:", error);
        Alert.alert("Erro de Configuração", 
          "Não foi possível configurar a conexão com o servidor. Use a opção para configurar o IP manualmente.");
      } finally {
        setIsDetectingNetwork(false);
      }
    };

    configureApiConnection();
  }, []);

  // Função específica para tentar obter o melhor IP para usar em dispositivos físicos
  const getDeviceNetworkIp = async (): Promise<string | null> => {
    try {
      // No mundo ideal, queremos o IP do host onde o servidor está rodando
      const networkInfo = await Network.getNetworkStateAsync();
      
      if (networkInfo.type === Network.NetworkStateType.WIFI) {
        // Se estiver em WiFi, o gateway geralmente é o roteador
        // Mas isso não nos dá o IP do computador host...
        return deviceIp || null;
      }
      
      return null;
    } catch (error) {
      console.error("Erro ao obter IP da rede:", error);
      return null;
    }
  };


  const validateCPF = (cpf: string): boolean => {
    // Remove non-numeric characters
    cpf = cpf.replace(/[^\d]/g, '');

    // Check if CPF has 11 digits
    if (cpf.length !== 11) return false;

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    let digit1 = rest > 9 ? 0 : rest;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    let digit2 = rest > 9 ? 0 : rest;

    return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
  };

  const formatCPF = (value: string): string => {
    const cpf = value.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (value: string) => {
    const formattedCPF = formatCPF(value);
    setCpf(formattedCPF);
  };

  async function handleVerify() {
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido!');
      return;
    }
    
    setLoading(true);
    try {
      const cleanCpf = cpf.replace(/\D/g, '');
      
      // Usa o serverIp que já foi detectado e configurado no useEffect
      let baseURL;
      
      // Se temos uma instância API configurada, usa ela
      if (api && api.defaults && api.defaults.baseURL) {
        baseURL = api.defaults.baseURL;
      } 
      // Senão, constrói a URL com base no serverIp
      else if (serverIp) {
        baseURL = `http://${serverIp}:3333/api`;
      } 
      // Fallback para casos em que nada foi configurado
      else {
        baseURL = Platform.OS === 'android' 
          ? isEmulator ? 'http://10.0.2.2:3333/api' : 'http://192.168.0.104:3333/api'
          : 'http://localhost:3333/api';
      }
      
      console.log(`Dispositivo: ${deviceIp || 'desconhecido'}`);
      console.log(`Servidor: ${serverIp || 'não configurado'}`);
      console.log(`Tentando conectar a: ${baseURL}`);
      console.log(`Enviando CPF: ${cleanCpf}`);
      
      // Usa a instância API configurada se disponível, caso contrário cria uma requisição direta
      let response;
      
      if (api && typeof api.post === 'function') {
        response = await api.post('/login-employer', { cpf: cleanCpf, password });
      } else {
        response = await axios({
          method: 'post',
          url: `${baseURL}/login-employer`,
          data: { cpf: cleanCpf, password },
          timeout: 15000
        });
      }
      
      console.log('Status da resposta:', response.status);
      console.log('Response:', JSON.stringify(response.data));
  
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      
      Alert.alert('Sucesso', response.data.message || 'Login realizado com sucesso');
      router.replace('/(panel)/profile/page');
    } catch (err: any) {
      console.error("Erro completo:", err);
      
      if (err.message && err.message.includes('Network Error')) {
        Alert.alert(
          'Erro de Conexão', 
          `Não foi possível conectar ao servidor ${serverIp || ''}. ` +
          'Verifique se o backend está rodando e acessível pela rede.'
        );
      } else if (err.response && err.response.status === 401) {
        Alert.alert('Acesso negado', 'CPF ou senha incorretos. Por favor, verifique seus dados.');
      } else {
        Alert.alert('Erro', err.response?.data?.message || err.message || 'Erro ao fazer login');
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
  
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
  
            {isDetectingNetwork ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1565C0" />
                <Text style={styles.loadingText}>Configurando conexão...</Text>
              </View>
            ) : (
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChangeText={handleCPFChange}
                  keyboardType="number-pad"
                  maxLength={14}
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
                  style={[styles.accessButton, loading && styles.disabledButton]}
                  onPress={handleVerify}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.accessButtonText}>Acessar</Text>
                  )}
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
            )}
          </View>
        </ScrollView>
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
    marginHorizontal: 16,
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
  disabledButton: {
    backgroundColor: '#90CAF9',
    borderColor: '#BDBDBD',
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#1565C0',
    fontSize: 16,
  },
  networkConfigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  configButton: {
    backgroundColor: '#78909C',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#000',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#455A64',
  },
  configButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  networkInfoContainer: {
    backgroundColor: '#ECEFF1',
    borderRadius: 4,
    padding: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  networkInfoText: {
    color: '#455A64',
    fontSize: 12,
    marginBottom: 4,
  }
});