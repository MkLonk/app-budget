// src/features/auth/authApi.js
import axios from 'axios';
import config from '../../config';
/* import { apiRequest } from '../apiRequest'; */

// export const addClient = (newClient) => apiRequest('post', '/clients', newClient);

// Функция для регистрации пользователя
// export const registerUser = (userData) => apiRequest('post', '/signup', userData)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.message || 'Ошибка при регистрации');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для авторизации пользователя
// export const loginUser = (userData) => apiRequest('post', '/login', userData)

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Server response:', response.data); // Выводим ответ сервера
    if (response.status !== 200) {
      throw new Error(response.data.message || 'Ошибка при авторизации');
    }
    return response.data; // В ответе должен быть токен

  } catch (error) {
    throw error;
  }
};