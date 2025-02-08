import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevelopersData, addDeveloperData } from '../features/developers/developersSlice';
import AddDeveloperPopup from './AddDeveloperPopup';
import Developer from './Developer';
import './_table.css'; // Подключаем универсальные стили для таблицы

const DevelopersList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.developers);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleDeveloperAdded = async (newDeveloper) => {
    try {
      await dispatch(addDeveloperData(newDeveloper)).unwrap();
      await dispatch(fetchDevelopersData());
      setNotification('Новый разработчик добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении разработчика:', error.message);
    } finally {
      togglePopup();
    }
  };

  useEffect(() => {
    dispatch(fetchDevelopersData());
  }, [dispatch]);

  if (status === 'loading') return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="list">
      {notification && <div className="list__notification">{notification}</div>}
      <div className="list__header">
        <h1>Список разработчиков</h1>
        <button className="list__button" onClick={togglePopup}>
          Добавить разработчика
        </button>
      </div>
      {isPopupOpen && <AddDeveloperPopup onClose={togglePopup} onDeveloperAdded={handleDeveloperAdded} />}
      <table className="list__table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Имя представителя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {list.map((developer) => (
            <Developer key={developer._id} developer={developer} onDeveloperDeleted={() => setNotification('Разработчик удален')} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevelopersList;