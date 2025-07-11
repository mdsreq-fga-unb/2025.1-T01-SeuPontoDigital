// utils/getBaseUrl.ts
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

export async function getBaseUrl(): Promise<string> {

  const fallbackUrl = process.env.EXPO_PUBLIC_API_BASE;

  // Tenta pegar IP salvo
  const savedIp = await AsyncStorage.getItem('serverIp');
  console.log(savedIp)
  if (savedIp) return `http://${savedIp}:3333/api`;

  // Detecta se é emulador
  const isEmulator = await Device.isDevice === false;

  if (isEmulator) {
    if (Platform.OS === 'android') return 'http://10.0.2.2:3333/api';
    if (Platform.OS === 'ios') return 'http://localhost:3333/api';
  }

  // Fallback manual (substitua pelo IP real da sua máquina)
  return fallbackUrl || '';
}
