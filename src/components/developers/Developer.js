import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDeveloperData } from '../../features/developers/developersSlice';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';
import '../table/item.css'; // Подключаем стили

const Developer = ({ developer }) => {
  const dispatch = useDispatch();

  const handleDeleteDeveloper = async () => {
    try {
      await dispatch(deleteDeveloperData(developer._id)).unwrap();
      toast.success('Запись о разработчике удалена', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при удалении разработчика: ${error.message}`, toastError);
    }
  };

  return (
    <tr className="item__row">
      <td>{developer.name}</td>
      <td>{developer.representative}</td>
      <td>{developer.phone}</td>
      <td>{developer.email}</td>
      <td>
        <button className="item__delete-button" onClick={handleDeleteDeveloper}>
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default Developer;
