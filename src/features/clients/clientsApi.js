import { apiRequest } from '../apiRequest';

// Функция для получения списка клиентов
export const fetchClients = (getState) => apiRequest('GET', '/clients', null, getState);

// Функция для добавления нового клиента
export const addClient = (newClient, getState) => apiRequest('POST', '/clients', newClient, getState);

// Функция для обновления клиента
export const updateClient = (updatedClient, getState) => apiRequest('patch', `/clients/${updatedClient._id}`, updatedClient, getState);

// Функция для удаления клиента

export const deleteClient = (clientId, getState) => apiRequest('delete', `/clients/${clientId}`, null, getState, false);

/* export const deleteClient = async (clientId) => {
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
}; */