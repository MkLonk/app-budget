// src/components/companies/CreateCompanyForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCompanyByInnAsync, createCompanyAsync, joinCompanyAsync } from '../../features/companies/companiesSlice';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import './createCompany.css'; // Подключаем стили

const CreateCompanyForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', inn: '' });
  const [existingCompanies, setExistingCompanies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const companies = await dispatch(checkCompanyByInnAsync(formData.inn)).unwrap();
      if (companies.length > 0) {
        setExistingCompanies(companies);
        setIsPopupOpen(true); // Показываем попап с предупреждением
      } else {
        await dispatch(createCompanyAsync(formData)).unwrap();
        toast.success('Компания успешно создана!', toastSuccess);
      }
    } catch (error) {
      toast.error(`Ошибка: ${error.message}`, toastError);
    }
  };

  const handleJoinCompany = async (companyId) => {
    try {
      await dispatch(joinCompanyAsync({ companyId, userId: localStorage.getItem('userId') })).unwrap();
      toast.success('Вы успешно вступили в компанию!', toastSuccess);
      setIsPopupOpen(false);
    } catch (error) {
      toast.error(`Ошибка: ${error.message}`, toastError);
    }
  };

  return (
    <div className="create-company-form">
      <h2>Создать компанию</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Название компании"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="inn"
          placeholder="ИНН компании"
          value={formData.inn}
          onChange={handleChange}
          required
        />
        <button type="submit">Создать</button>
      </form>

      {/* Попап с предупреждением */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup__content">
            <h3>Предупреждение</h3>
            <p>Компания(и) с таким ИНН уже существует(ют):</p>
            <ul>
              {existingCompanies.map((company) => (
                <li key={company._id}>
                  {company.name} ({company.representative})
                  <button onClick={() => handleJoinCompany(company._id)}>Вступить</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setIsPopupOpen(false)}>Закрыть</button>
            <button onClick={() => dispatch(createCompanyAsync(formData))}>Всё равно создать</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCompanyForm;