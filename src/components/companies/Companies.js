// src/components/companies/Companies.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCompanyPopup from './AddCompanyPopup';
import { fetchUserCompaniesData } from '../../features/companies/companiesSlice';
import './companies.css'; // Подключаем стили

const Companies = () => {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  // Получаем список компаний пользователя из Redux (если есть)
  const userCompanies = useSelector((state) => state.companies.userCompanies || []);
  const status = useSelector((state) => state.companies.status);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(fetchUserCompaniesData());
  }, [dispatch]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="companies">
      <div className="companies__header">
        <h2>Ваши компании</h2>
        <button className="companies__add-button" onClick={togglePopup}>
          Добавить или вступить в компанию
        </button>
      </div>

      {/* Список компаний пользователя */}
      <div className="companies__list">
        <h3>Список ваших компаний:</h3>
        {status === 'loading' ? (
          <p>Загрузка...</p>
        ) : userCompanies.length > 0 ? (
          <ul>
            {userCompanies.map((company) => (
              <li key={company._id}>{company.name}</li>
            ))}
          </ul>
        ) : (
          <p>У вас пока нет компаний.</p>
        )}
      </div>

      {/* Попап для добавления компании */}
      {isPopupOpen && <AddCompanyPopup onClose={togglePopup} />}
    </div>
  );
};

export default Companies;