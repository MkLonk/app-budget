import axios from 'axios';
import config from '../config'

export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${config.API_BASE_URL}${url}`,
      data,
      headers: {
        Authorization: config.AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    if (![200, 201, 204].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};