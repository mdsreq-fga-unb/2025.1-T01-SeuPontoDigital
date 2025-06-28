import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import api from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function EntryScreen() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let rest = 11 - (sum % 11);
    let digit1 = rest > 9 ? 0 : rest;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    rest = 11 - (sum % 11);
    let digit2 = rest > 9 ? 0 : rest;

    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
  };

  const formatCPF = (value: string): string =>
    value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  const handleCPFChange = (value: string) => setCpf(formatCPF(value));

  async function handleVerify() {

    if (!cpf && !password) {
      Alert.alert('Erro', 'Preencha CPF e senha.');
      return;
    } else if (!cpf) {
      Alert.alert('Erro', 'CPF não informado.');
      return;
    } else if (!password) {
      Alert.alert('Erro', 'Senha não informada.');
      return;
    }
    
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      return;
    }

    setLoading(true);
    try {
      const cleanCpf = cpf.replace(/\D/g, '');
      const response = await api.post('/api/login-app', { cpf: cleanCpf, password });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }

      const { userType } = response.data;

      Alert.alert('Sucesso', response.data.message || 'Login realizado com sucesso!');
      console.log(userType)
      if(userType === 'employee'){
        console.log("indo 1")
        router.replace('/(panel)/profile/page');
      } else if (userType === 'employer') {
        console.log("indo 2")
        router.replace('/(panel)/employer/page');
      }
      
    } catch (err: any) {
      console.error("Erro completo:", err);
      if (err.message?.includes('Network Error')) {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor localhost:3333.');
      } else if (err.response?.status === 401) {
        Alert.alert('Acesso negado', 'CPF ou senha incorretos.');
      } else {
        Alert.alert('Erro', err.response?.data?.message || err.message || 'Erro ao fazer login.');
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

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                //onPress={() => router.replace('/(panel)/profile/page')}
                onPress={handleVerify}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.accessButtonText}>Acessar</Text>
                )}
              </Pressable>

              <Link href='/(auth)/firstTime/page' style={styles.registerLink}>
                <Text style={styles.registerText}>Primeira vez? Clique aqui</Text>
              </Link>

              <Link href='/(auth)/forgotpass/page' style={styles.helpLink}>
                <Text style={styles.helpText}>Esqueceu sua senha?</Text>
              </Link>
            </View>
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
  }
});