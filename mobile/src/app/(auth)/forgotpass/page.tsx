import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const api = axios.create({
  baseURL: Platform.OS === 'web'
    ? 'http://localhost:3333/api'
    : 'http://192.168.0.10:3333/api', // Substitua pelo seu IP local
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default function ForgotPass() {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutos
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  
  React.useEffect(() => {
    let interval: number;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatCPF = (value: string): string =>
    value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  const handleCPFChange = (value: string) => setCpf(formatCPF(value));

  const handleSendSMS = async () => {
    if (!cpf || !phone) {
      Alert.alert('Erro', 'Preencha CPF e telefone.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/first-access', { name: 'Recuperação', cpf: cpf.replace(/\D/g, ''), phone });
      setStep(2);
      setTimer(300);
      Alert.alert('Sucesso', 'Código enviado por SMS.');
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao enviar SMS.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      Alert.alert('Erro', 'Digite o código recebido.');
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos de senha.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await api.patch('/create-password', {
        cpf: cpf.replace(/\D/g, ''),
        password,
        confirmPassword,
        code,
      });
      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <Text style={styles.pageTitle}>Recuperar Senha</Text>
          <View style={styles.divider} />
          <Text style={styles.inputLabel}>CPF</Text>
          <TextInput
            style={styles.inputField}
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={handleCPFChange}
            keyboardType="number-pad"
            maxLength={14}
          />
          <Text style={styles.inputLabel}>Telefone</Text>
          <TextInput
            style={styles.inputField}
            placeholder="(00) 00000-0000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <Pressable style={styles.accessButton} onPress={handleSendSMS} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.accessButtonText}>Enviar Código</Text>}
          </Pressable>
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <Text style={styles.cardTitle}>Digite o código recebido</Text>
          <Text style={styles.inputLabel}>Código SMS</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Código"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            Tempo restante: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
          </Text>
          <Pressable style={styles.accessButton} onPress={handleVerifyCode} disabled={loading || timer <= 0}>
            <Text style={styles.accessButtonText}>Verificar Código</Text>
          </Pressable>
          <Pressable style={styles.registerButton} onPress={handleSendSMS} disabled={loading || timer > 0}>
            <Text style={styles.registerButtonText}>Reenviar Código</Text>
          </Pressable>
        </>
      );
    }
    if (step === 3) {
      return (
        <>
          <Text style={styles.cardTitle}>Defina uma nova senha</Text>
          <Text style={styles.inputLabel}>Nova Senha</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite sua nova senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Confirme sua nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Pressable style={styles.accessButton} onPress={handleResetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.accessButtonText}>Redefinir Senha</Text>}
          </Pressable>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.replace('/')} style={styles.backIconContainer}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../../assets/images/splash-icon.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <View style={styles.formCard}>
            <View style={styles.formGroup}>{renderStep()}</View>
            <Link href="/" style={styles.backLink}>
              <Text style={styles.backLinkText}>Voltar ao login</Text>
            </Link>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backIconContainer: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 55, 
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  illustration: {
    width: width * 0.6,
    height: height * 0.2,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formCard: {
    width: '100%'
  },
  formGroup: {
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
  registerButton: {
    backgroundColor: '#1565C0',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    alignItems: 'center',
  },
  backLinkText: {
    color: '#1565C0',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  footer: {
    backgroundColor: '#1565C0',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 8,
    letterSpacing: 1,
  },
  divider: {
    height: 2,
    backgroundColor: '#1565C0',
    marginBottom: 18,
    width: '30%',
    alignSelf: 'center',
    borderRadius: 2,
  },
});