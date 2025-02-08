import axios from 'axios';
import config from '../../config';

// Функция для получения списка клиентов
export const fetchClients = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/clients`, {
      headers: {
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (response.status !== 200 || !Array.isArray(response.data)) {
      throw new Error('Invalid response data format');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для добавления нового клиента
export const addClient = async (newClient) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/clients`, newClient, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для удаления клиента
export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${config.API_BASE_URL}/clients/${clientId}`, {
      headers: {
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (![200, 204].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};