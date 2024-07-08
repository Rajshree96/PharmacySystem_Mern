// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/categories'; 

// Create an instance of axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token in requests
api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    // const token = localStorage.getItem('auth');
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllCategories = async () => {
  const response = await api.get('/getall');
  return response.data;
};

export const addCategory = async (categoryData) => {
  const response = await api.post('/add', categoryData);
  return response.data;
};

export const editCategory = async (id, categoryData) => {
  const response = await api.put(`/edit/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

export default api;
