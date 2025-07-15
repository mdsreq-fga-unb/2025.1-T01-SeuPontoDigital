import axios from 'axios';


// const api = axios.create({
//   baseURL: "http://10.0.2.2:3333/api",
//   timeout: 15000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const api = axios.create({
//   baseURL: 'http://192.168.0.4:3333/api',
//   timeout: 15000,
//   headers: { 'Content-Type': 'application/json' },
// });

const api = axios.create({
  baseURL: 'https://two025-1-t01-seupontodigital.onrender.com/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});


export default api; 