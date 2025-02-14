import axios from 'axios';
import config from '../../config';
import { apiRequest } from '../apiRequest';


// Функция для получения списка разработчиков
export const fetchDevelopers = (getState) => apiRequest('GET', '/developers', null, getState);

/* export const fetchDevelopers = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/developers`, {
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
 */

// Функция для добавления нового разработчика
export const addDeveloper = (newDeveloper, getState) => apiRequest('POST', '/developers', newDeveloper, getState);

/* export const addDeveloper = async (newDeveloper) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/developers`, newDeveloper, {
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
 */
// Функция для удаления разработчика
export const deleteDeveloper = (developerId, getState) => apiRequest('delete', `/developers/${developerId}`, null, getState, false);

/* export const deleteDeveloper = async (developerId) => {
  try {
    const response = await axios.delete(`${config.API_BASE_URL}/developers/${developerId}`, {
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
}; */