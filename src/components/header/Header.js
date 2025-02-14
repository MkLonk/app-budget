// src/components/header/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './header.css'; // Подключаем стили

const Header = () => {
  const location = useLocation(); // Получаем текущее расположение
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = localStorage.getItem('email'); // Получаем email из localStorage

  const handleLogout = () => {
    dispatch(logout()); // Вызываем действие logout
  };

  return (
    <header className="header">
      {/* Левая часть: навигация */}
      <nav className="header__nav">

        <Link to="/" className="header__logo" />

        {/* Ссылка на главную страницу */}
        {/* <Link to="/" className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}>
          Главная
        </Link> */}
        {isAuthenticated && (
          <div className="header__nav">
            {/* Кнопка "Клиенты" */}
            < Link to="/clients" className={`header__link ${location.pathname === '/clients' ? 'header__link--active' : ''}`}>
              Клиенты
            </Link>
            {/* Кнопка "Разработчики" */}
            <Link to="/developers" className={`header__link ${location.pathname === '/developers' ? 'header__link--active' : ''}`}>
              Разработчики
            </Link>

            <Link to="/contracts" className={`header__link ${location.pathname === '/contracts' ? 'header__link--active' : ''}`}>
              Договоры
            </Link>
          </div>
        )}
      </nav>

      {/* Правая часть: блок с кнопками */}
      <div className="header__auth">
        {isAuthenticated ? (
          <div className="header__nav">
            <span className="header__user">{userEmail}</span>
            <button className="header__logout" onClick={handleLogout}> Выход </button>
          </div>
        ) : (
          <div className="header__nav">
            <Link to="/register" className="header__auth-button">
              Регистрация
            </Link>
            <Link to="/login" className="header__auth-button">
              Авторизация
            </Link>
          </div>
        )}
      </div>

    </header >
  );
};

export default Header;