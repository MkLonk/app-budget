import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClients, addClient, deleteClient } from './clientsApi';

// Асинхронное действие для получения списка клиентов
export const fetchClientsData = createAsyncThunk('clients/fetch', async () => {
  const clients = await fetchClients();
  return clients;
});

// Асинхронное действие для добавления нового клиента
export const addClientData = createAsyncThunk('clients/add', async (newClient) => {
  const addedClient = await addClient(newClient);
  return addedClient;
});

// Асинхронное действие для удаления клиента
export const deleteClientData = createAsyncThunk('clients/delete', async (clientId) => {
  await deleteClient(clientId);
  return clientId;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    list: [], // Список клиентов
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Ошибка, если она есть
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsData.pending, (state) => {
        state.status = 'loading'; // Устанавливаем статус загрузки
      })
      .addCase(fetchClientsData.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Загрузка завершена успешно
        state.list = action.payload; // Обновляем список клиентов
      })
      .addCase(fetchClientsData.rejected, (state, action) => {
        state.status = 'failed'; // Загрузка завершилась с ошибкой
        state.error = action.error.message || 'Произошла ошибка при загрузке списка клиентов';
      })
      .addCase(addClientData.fulfilled, (state, action) => {
        state.list.push(action.payload); // Добавляем нового клиента в список
      })
      .addCase(addClientData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при добавлении клиента';
      })
      .addCase(deleteClientData.fulfilled, (state, action) => {
        state.list = state.list.filter((client) => client._id !== action.payload); // Фильтруем по payload
      })
      .addCase(deleteClientData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при удалении клиента';
      });
  },
});

export default clientsSlice.reducer;