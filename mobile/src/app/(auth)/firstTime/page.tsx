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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import api from '../../../../constants/api';
const { height, width } = Dimensions.get('window');

const API_BASE = 'http://localhost:3333/api'; // Troque para seu IP/backend se necessário

const FirstTimeScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Envia dados para /first-access
  const handleFirstAccess = async () => {
    if (!name || !cpf || !phone || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/first-access', {
        name,
        cpf,
        phone,
        password,
      });
      if (response.status === 200) {
        setStep('code');
        Alert.alert('Código enviado', 'Enviamos um código SMS para seu telefone.');
      }
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao enviar dados.');
    } finally {
      setLoading(false);
    }
  };

  // Envia código + senha para /create-password
  const handleCreatePassword = async () => {
    if (!code) {
      Alert.alert('Erro', 'Digite o código recebido por SMS.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.patch('/create-password', {
        cpf,
        password,
        confirmPassword,
        code,
      });
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Senha criada com sucesso!');
        router.replace('/');
      }
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao criar senha.');
    } finally {
      setLoading(false);
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
          <Text style={styles.headerTitle}>Primeiro Login</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../../assets/images/splash-icon.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <View style={styles.formCard}>
            {step === 'form' ? (
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Nome Completo</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu nome"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChangeText={setCpf}
                  keyboardType="number-pad"
                />

                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                <Text style={styles.inputLabel}>Criar Senha</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <Text style={styles.inputLabel}>Confirmar Senha</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Repita sua senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />

                <Pressable style={styles.registerButton} onPress={handleFirstAccess} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.registerButtonText}>Avançar</Text>
                  )}
                </Pressable>

                <Link href="/" style={styles.backLink}>
                  <Text style={styles.backLinkText}>Voltar ao login</Text>
                </Link>
              </View>
            ) : (
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Código SMS</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite o código recebido"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />

                <Pressable style={styles.registerButton} onPress={handleCreatePassword} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.registerButtonText}>Finalizar Cadastro</Text>
                  )}
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© SeuPontoDigital 2025</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FirstTimeScreen;

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
});
