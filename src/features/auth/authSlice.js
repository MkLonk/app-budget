// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authApi';

// Асинхронное действие для регистрации
export const registerUserAsync = createAsyncThunk('auth/register', async (userData) => {
  const response = await registerUser(userData);
  return response;
});

// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk('auth/login', async (userData) => {
  const response = await loginUser(userData);
  return response; // В ответе должен быть токен и email
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null, // Загружаем токен из localStorage
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Сбрасываем флаг
      localStorage.removeItem('token'); // Удаляем токен из localStorage
      localStorage.removeItem('email'); // Удаляем email из localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.isAuthenticated = true; // Устанавливаем флаг
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;