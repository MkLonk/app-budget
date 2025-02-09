import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevelopersData, addDeveloperData } from '../../features/developers/developersSlice';
import AddDeveloperPopup from '../popups/AddDeveloperPopup';
import Developer from './Developer';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import '../table/table.css'; // Подключаем универсальные стили для таблицы

const DevelopersList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.developers);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleDeveloperAdded = async (newDeveloper) => {
    try {
      await dispatch(addDeveloperData(newDeveloper)).unwrap();
      await dispatch(fetchDevelopersData());
      toast.success('Новый разработчик добавлен', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при добавлении разработчика: ${error.message}`, toastError);
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
            <Developer key={developer._id} developer={developer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevelopersList;