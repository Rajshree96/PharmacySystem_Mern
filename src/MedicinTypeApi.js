// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/'; 

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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllCategories = async () => {
  const response = await api.get('/categories/getall');
  return response.data;
};

export const addCategory = async (categoryData) => {
  const response = await api.post('/categories/add', categoryData);
  return response.data;
};

export const editCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/edit/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/delete/${id}`);
  return response.data;
};

export default api;
