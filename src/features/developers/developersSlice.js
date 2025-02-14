import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDevelopers, addDeveloper, deleteDeveloper } from './developersApi';

// Асинхронное действие для получения списка разработчиков
export const fetchDevelopersData = createAsyncThunk('developers/fetch', async (_, { getState }) => {
  const developers = await fetchDevelopers(getState);
  return developers;
});

// Асинхронное действие для добавления нового разработчика
export const addDeveloperData = createAsyncThunk('developers/add', async (newDeveloper, { getState }) => {
  const addedDeveloper = await addDeveloper(newDeveloper, getState);
  return addedDeveloper;
});

// Асинхронное действие для удаления разработчика
export const deleteDeveloperData = createAsyncThunk('developers/delete', async (developerId, { getState }) => {
  await deleteDeveloper(developerId, getState);
  return developerId;
});

const developersSlice = createSlice({
  name: 'developers',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopersData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDevelopersData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchDevelopersData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Произошла ошибка при загрузке списка разработчиков';
      })
      .addCase(addDeveloperData.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addDeveloperData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при добавлении разработчика';
      })
      .addCase(deleteDeveloperData.fulfilled, (state, action) => {
        state.list = state.list.filter((developer) => developer._id !== action.payload);
      })
      .addCase(deleteDeveloperData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при удалении разработчика';
      });
  },
});

export default developersSlice.reducer;