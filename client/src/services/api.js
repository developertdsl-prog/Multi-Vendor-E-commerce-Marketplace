import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const getProfile = () => API.get('/auth/me');

export default API;
