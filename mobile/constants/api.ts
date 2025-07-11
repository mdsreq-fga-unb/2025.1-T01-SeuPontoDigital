import axios from 'axios';


// const api = axios.create({
//   baseURL: "http://10.0.2.2:3333/api",
//   timeout: 15000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const api = axios.create({
  baseURL: "http://192.168.1.192:3333/api",
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 