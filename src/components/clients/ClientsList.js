import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsData, addClientData } from '../../features/clients/clientsSlice';
import AddClientPopup from '../popups/AddClientPopup';
import Client from './Client';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';

import '../table/table.css'; // Подключаем универсальные стили для таблицы

const ClientsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.clients);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleClientAdded = async (newClient) => {
    try {
      await dispatch(addClientData(newClient)).unwrap();
      await dispatch(fetchClientsData());
      toast.success('Новый клиент успешно добавлен', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при добавлении клиента: ${error.message}`, toastError);
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
            <Client key={client._id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;