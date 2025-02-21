// src/features/companies/companiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserCompanies, checkCompanyByInn, createCompany, joinCompany } from './companiesApi';




// Асинхронное действие для получения компаний пользователя
export const fetchUserCompaniesData = createAsyncThunk('companies/', async (_, { getState }) => {
  const companies = await fetchUserCompanies(getState);
  return companies;
});

// Асинхронное действие для проверки ИНН
/* export const checkCompanyByInnAsync = createAsyncThunk('companies/check-inn', async (inn, { getState }) => {
  const companies = await checkCompanyByInn(inn, getState);
  return companies;
}); */

// Асинхронное действие для проверки ИНН
export const checkCompanyByInnAsync = createAsyncThunk(
  'companies/check-inn',
  async (inn, { getState, rejectWithValue }) => {
    try {
      const companies = await checkCompanyByInn(inn, getState);

      // Если сервер вернул 404, возвращаем пустой массив
      if (!Array.isArray(companies)) {
        return [];
      }

      return companies;
    } catch (error) {
      // Если ошибка не связана с 404, возвращаем её
      if (error.response && error.response.status === 404) {
        return []; // Компании с таким ИНН нет
      }
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для создания новой компании
export const createCompanyAsync = createAsyncThunk('companies/create', async (companyData) => {
  const createdCompany = await createCompany(companyData);
  return createdCompany;
});

// Асинхронное действие для вступления в компанию
export const joinCompanyAsync = createAsyncThunk('companies/join', async ({ companyId, userId }) => {
  const updatedCompany = await joinCompany(companyId, userId);
  return updatedCompany;
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    userCompanies: [], // Список компаний пользователя
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCompaniesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCompaniesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userCompanies = action.payload; // Обновляем список компаний пользователя
      })
      .addCase(fetchUserCompaniesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка при загрузке компаний пользователя';
      })
      .addCase(checkCompanyByInnAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkCompanyByInnAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.userCompanies = action.payload; // Обновляем список компаний
      })
      .addCase(checkCompanyByInnAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка при проверке ИНН';
      })
      .addCase(createCompanyAsync.fulfilled, (state, action) => {
        state.userCompanies.push(action.payload); // Добавляем новую компанию
      })
      .addCase(joinCompanyAsync.fulfilled, (state, action) => {
        state.userCompanies = state.userCompanies.map((company) =>
          company._id === action.payload._id ? action.payload : company
        );
      });
  },
});

export default companiesSlice.reducer;