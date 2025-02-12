// src/components/auth/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import './auth.css';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUserAsync(formData)).unwrap();
      toast.success('Вы успешно зарегистрированы!', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка: ${error.message}`, toastError);
    }
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <a href="/login" className="auth-form__link">
        Уже есть аккаунт? Войдите
      </a>
    </div>
  );
};

export default Register;