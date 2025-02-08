import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientData } from '../../features/clients/clientsSlice';
import '../table/item.css'; // Подключаем стили

const Client = ({ client, onClientDeleted }) => {
  const dispatch = useDispatch();

  const handleDeleteClient = async () => {
    try {
      await dispatch(deleteClientData(client._id)).unwrap();
      onClientDeleted?.();
    } catch (error) {
      console.error('Ошибка при удалении клиента:', error.message);
    }
  };

  return (
    <tr className="client__row">
      <td>{client.name}</td>
      <td>{client.representative}</td>
      <td>{client.phone}</td>
      <td>{client.email}</td>
      <td>
        <button className="client__delete-button" onClick={handleDeleteClient}>
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default Client;