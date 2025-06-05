import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://192.168.1.14:3333/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

export default api;