// src/components/auth/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import './auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserAsync(formData)).unwrap();
      toast.success('Вы успешно вошли!', toastSuccess);
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      toast.error(`Ошибка: ${error.message}`, toastError);
    }
  }; //localStorage.getItem('token')

  return (
    <div className="auth-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Войти</button>
      </form>
      <a href="/register" className="auth-form__link">
        Нет аккаунта? Зарегистрируйтесь
      </a>
    </div>
  );
};

export default Login;