// src/components/companies/AddCompanyPopup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCompanyByInnAsync } from '../../features/companies/companiesSlice';
import '../../components/popups/popups.css'; // Подключаем стили

const AddCompanyPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ inn: '' });
  const [loading, setLoading] = useState(false);
  const [existingCompanies, setExistingCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [message, setMessage] = useState(null);  // Состояние для отображения ошибок

  // Получаем состояние проверки ИНН из Redux
  const checkStatus = useSelector((state) => state.companies.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage(null); // Очищаем сообщение при изменении поля
  };

  const handleCheckInn = async () => {
    if (!formData.inn) {
      setMessage({ text: 'Пожалуйста, введите ИНН.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const companies = await dispatch(checkCompanyByInnAsync(formData.inn)).unwrap();

      if (companies.length > 0) {
        setExistingCompanies(companies);
        setMessage(null); // Очищаем сообщение
      } else {
        setExistingCompanies([]);
        setMessage({
          text: 'Компания с указанным ИНН не найдена, введите название чтобы создать её.',
          type: 'success',
        });
      }
    } catch (error) {
      setMessage({ text: `Ошибка при проверке ИНН: ${error}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async () => {
    if (!formData.inn || !newCompanyName) {
      setMessage({ text: 'Пожалуйста, заполните все поля.', type: 'error' });
      return;
    }

    try {
      // Здесь можно добавить вызов API для создания новой компании
      console.log('Создание новой компании:', { inn: formData.inn, name: newCompanyName });
      onClose(); // Закрываем попап после успешного создания
    } catch (error) {
      setMessage({ text: `Ошибка при создании компании: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="popup">
      <div className="popup__form">
        <h3 className="popup__title">Добавить или вступить в компанию</h3>
        <label className="popup__label">ИНН компании:</label>
        <div className="popup__input-group">
          <input
            className="popup__input"
            type="text"
            name="inn"
            value={formData.inn}
            onChange={handleChange}
          />
          <button
            className="popup__submit"
            onClick={handleCheckInn}
            disabled={loading || checkStatus === 'loading'}
          >
            {loading ? 'Проверка...' : 'Проверить'}
          </button>
        </div>

        {/* Отображение сообщений */}
        {/* {message && (
          <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>
        )} */}
        {message && (
          <p
            className={
              `popup__message ${message.type === 'success'
                ? 'popup__message--success'
                : 'popup__message--error'}`
            }>
            {message.text}
          </p>
        )}

        {existingCompanies.length === 0 && !loading && formData.inn && (
          <div>
            {/* <p>{message?.text}</p> */}
            <label className="popup__label">Введите название новой компании:</label>
            <input
              className="popup__input"
              type="text"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
            <button className="popup__submit" onClick={handleCreateCompany}>
              Создать компанию
            </button>
          </div>
        )}

        {existingCompanies.length > 0 && (
          <div>
            <p>Компания(и) с таким ИНН уже существует(ют):</p>
            <ul>
              {existingCompanies.map((company) => (
                <li className="popup__company-item" key={company._id}>
                  <span className="popup__company-name">
                    {company.name} ({company.ownerEmail})
                  </span>
                  {/* <button onClick={() => console.log('Join company:', company._id)}>Вступить</button> */}
                  <button className="popup__company-action" onClick={() => console.log('Join company:', company._id)}>Вступить</button>
                </li>
              ))}
            </ul>


            <button className="popup__submit" onClick={handleCreateCompany}>
              Всё равно создать компанию
            </button>
          </div>
        )}

        <button className="popup__cancel" onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default AddCompanyPopup;