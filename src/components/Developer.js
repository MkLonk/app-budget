import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDeveloperData } from '../features/developers/developersSlice';
// import './Developer.css';

const Developer = ({ developer, onDeveloperDeleted }) => {
  const dispatch = useDispatch();

  const handleDeleteDeveloper = async () => {
    try {
      await dispatch(deleteDeveloperData(developer._id)).unwrap();
      onDeveloperDeleted?.();
    } catch (error) {
      console.error('Ошибка при удалении разработчика:', error.message);
    }
  };

  return (
    <tr className="developer__row">
      <td>{developer.name}</td>
      <td>{developer.representative}</td>
      <td>{developer.phone}</td>
      <td>{developer.email}</td>
      <td>
        <button className="developer__delete-button" onClick={handleDeleteDeveloper}>
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default Developer;