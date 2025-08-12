import axios from 'axios';

const API = axios.create({
  baseURL: 'https://military-asset-management-system-y66k.onrender.com/api', // deployed backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;



