import axios from 'axios';
import config from '../../config';
import { apiRequest } from '../apiRequest';

// Функция для получения списка клиентов
export const fetchClients = () => apiRequest('GET', '/clients');

// Функция для добавления нового клиента
export const addClient = (newClient) => apiRequest('post', '/clients', newClient);

// Функция для обновления клиента
export const updateClient = (updatedClient) => apiRequest('patch', `/clients/${updatedClient._id}`, updatedClient);

// Функция для удаления клиента
export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${config.API_BASE_URL}/clients/${clientId}`, {
      headers: {
        Authorization: `${config.AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (![200, 204].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};