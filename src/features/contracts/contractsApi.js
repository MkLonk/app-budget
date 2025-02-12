import axios from 'axios';
import config from '../../config';

// Функция для получения списка договоров
export const fetchContracts = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/contracts`, {
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

// Функция для добавления нового договора
export const addContract = async (newContract) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/contracts`, newContract, {
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

// Функция для удаления договора
export const deleteContract = async (contractId) => {
  try {
    const response = await axios.delete(`${config.API_BASE_URL}/contracts/${contractId}`, {
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

// Функция для получения информации о клиенте по _id
export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/clients/${clientId}`, {
      headers: {
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (response.status !== 200 || !response.data.name) {
      throw new Error('Invalid client data format');
    }
    return response.data.name;
  } catch (error) {
    console.error(`Ошибка при получении клиента с ID ${clientId}:`, error.message);
    return null;
  }
};

// Функция для получения информации о разработчике по _id
export const getDeveloperById = async (developerId) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/developers/${developerId}`, {
      headers: {
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (response.status !== 200 || !response.data.name) {
      throw new Error('Invalid developer data format');
    }
    return response.data.name;
  } catch (error) {
    console.error(`Ошибка при получении разработчика с ID ${developerId}:`, error.message);
    return null;
  }
};