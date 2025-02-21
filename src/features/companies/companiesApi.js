// src/features/companies/companiesApi.js
import { apiRequest } from '../apiRequest';
import axios from 'axios';
import config from '../../config';

// Функция для получения компаний пользователя
export const fetchUserCompanies = (getState) => apiRequest('GET', `/companies`, null, getState, false);



// Функция для проверки ИНН и получения компаний
// export const checkCompanyByInn = (inn, getState) => apiRequest('GET', `/companies/check-inn/${inn}`, null, getState, false);

export const checkCompanyByInn = async (inn, getState) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/companies/check-inn/${inn}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (![200, 204, 404].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    } /* else if (response.status === 404) {
      console.log(response);
      
      return 'нет'
    } */
    return response.data; // Возвращает список компаний с таким ИНН
  } catch (error) {
    throw error;
  }
};

// Функция для создания новой компании
export const createCompany = (companyData, getState) => apiRequest('post', '/companies', companyData, getState);

/* 
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/companies`, companyData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (![200, 201].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.data; // Возвращает созданную компанию
  } catch (error) {
    throw error;
  }
}; */

// Функция для вступления в существующую компанию
export const joinCompany = (companyId, userId, getState) => apiRequest('post', `/companies/${companyId}/join`, userId, getState);


/* export const joinCompany = async (companyId, userId) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/companies/${companyId}/join`, { userId }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${config.AUTH_TOKEN}`,
      },
    });
    if (![200, 201].includes(response.status)) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.data; // Возвращает обновленную компанию
  } catch (error) {
    throw error;
  }
}; */