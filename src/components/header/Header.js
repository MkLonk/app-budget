import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css'; // Подключаем стили

const Header = () => {
  const location = useLocation(); // Получаем текущее расположение

  return (
    <header className="header">
      <nav className="header__nav">
        {/* Кнопка "Клиенты" */}
        <Link to="/clients" className={`header__link ${location.pathname === '/clients' ? 'header__link--active' : ''}`}>
          Клиенты
        </Link>
        {/* Кнопка "Разработчики" */}
        <Link to="/developers" className={`header__link ${location.pathname === '/developers' ? 'header__link--active' : ''}`}>
          Разработчики
        </Link>

        <Link to="/contracts" className={`header__link ${location.pathname === '/contracts' ? 'header__link--active' : ''}`}>
          Договоры
        </Link>
      </nav>
    </header>
  );
};

export default Header;