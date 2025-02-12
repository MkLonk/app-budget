import axios from 'axios';
import config from '../config'

export const apiRequest = async (method, url, data = null, getState, сontentType = true) => {
  try {
    const token = getState ? getState().auth.token : null; // Получаем токен из Redux-состояния
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': сontentType ? 'application/json' : '',
    };
    const response = await axios({
      method,
      url: `${config.API_BASE_URL}${url}`,
      data,
      headers,
    });

    if (![200, 201, 204].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};