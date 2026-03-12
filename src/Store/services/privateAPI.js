import axios from 'axios';

const API = 'http://localhost:3000/api';
// const API = 'https://suxnix-server.vercel.app/api';

const privateAPI = axios.create({
  baseURL: API,
});

privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('suxnixToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateAPI;
