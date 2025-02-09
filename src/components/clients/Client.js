import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientData, updateClientData } from '../../features/clients/clientsSlice';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import EditClientPopup from '../popups/EditClientPopup';
import '../table/item.css'; // Подключаем стили

const Client = ({ client }) => {
  const dispatch = useDispatch();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleDeleteClient = async () => {
    try {
      await dispatch(deleteClientData(client._id)).unwrap();
      toast.success('Запись о клиенте удалена', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при удалении клиента: ${error.message}`, toastError);
    }
  };

  const handleClientUpdated = async (updatedClient) => {
    console.log(updatedClient);

    try {
      await dispatch(updateClientData(updatedClient)).unwrap();
      toast.success('Запись о клиенте изменина', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при измении данных о клиенте: ${error.message}`, toastError);
    }
  };

  const handleEditClick = () => setIsEditPopupOpen(true);

  return (
    <>
      <tr className="item__row">
        <td>{client.name}</td>
        <td>{client.representative}</td>
        <td>{client.phone}</td>
        <td>{client.email}</td>
        <td>
          <button className="item__edit-button" onClick={handleEditClick}>
            ✏️
          </button>
          <button className="item__delete-button" onClick={handleDeleteClient}>
            🗑️
          </button>
        </td>
      </tr>
      {
        isEditPopupOpen && (
          <EditClientPopup
            client={client}
            onClose={() => setIsEditPopupOpen(false)}
            onClientUpdated={handleClientUpdated} />
        )}
    </>
  );
};

export default Client;