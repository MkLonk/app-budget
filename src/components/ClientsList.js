import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsData, addClientData } from '../features/clients/clientsSlice';
import AddClientPopup from './AddClientPopup';
import Client from './Client';
import './_table.css'; // Подключаем универсальные стили для таблицы

const ClientsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.clients);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleClientAdded = async (newClient) => {
    try {
      await dispatch(addClientData(newClient)).unwrap();
      await dispatch(fetchClientsData());
      setNotification('Новая запись добавлена');
    } catch (error) {
      console.error('Ошибка при добавлении клиента:', error.message);
    } finally {
      togglePopup();
    }
  };

  useEffect(() => {
    dispatch(fetchClientsData());
  }, [dispatch]);

  if (status === 'loading') return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="list">
      {notification && <div className="list__notification">{notification}</div>}
      <div className="list__header">
        <h1>Список клиентов</h1>
        <button className="list__button" onClick={togglePopup}>
          Добавить заказчика
        </button>
      </div>
      {isPopupOpen && <AddClientPopup onClose={togglePopup} onClientAdded={handleClientAdded} />}
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
          {list.map((client) => (
            <Client key={client._id} client={client} onClientDeleted={() => setNotification('Запись о клиенте удалена')} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;