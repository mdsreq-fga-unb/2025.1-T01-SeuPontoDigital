import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import api from '../../../../constants/api';
import { Link, useRouter } from 'expo-router';

export default function ForgotPass(){
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState<'form' | 'code'>('form');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Envia dados para /first-access
  const handleForgottenPassword = async () => {
    if (!cpf || !phone) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/forgotten-password', {
        cpf,
        phone,
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

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/update-password', {
        cpf,
        newPassword,
        confirmNewPassword,
        code,
      });
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Senha Atualizada com sucesso!');
        router.replace('/');
      }
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao criar senha.');
    } finally {
      setLoading(false);
    }
  };

    return(
        <View style = {styles.container}>
            <Text>Esqueceu a senha</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});