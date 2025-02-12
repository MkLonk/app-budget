import React, { useState } from 'react';
import './popups.css';

const AddContractPopup = ({ onClose, onContractAdded, clients, developers }) => {
  const [newContract, setNewContract] = useState({
    number: '',
    date: '',
    name: '',
    price: '',
    developer: '',
    client: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };

  const handleSubmit = async (e, onContractAdded) => {
    e.preventDefault();
    try {
      if (onContractAdded) {
        onContractAdded(newContract); // Вызываем коллбэк для добавления договора
      }
    } catch (error) {
      console.error('Ошибка при добавлении договора:', error);
    } finally {
      setNewContract({
        number: '',
        date: '',
        name: '',
        price: '',
        developer: '',
        client: '',
      });
      onClose?.();
    }
  };

  return (
    <div className="popup">
      <div className="popup__form">
        <h2 className="popup__title">Добавить договор</h2>
        <label className="popup__label">Номер:</label>
        <input
          type="text"
          name="number"
          value={newContract.number}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Дата:</label>
        <input
          type="date"
          name="date"
          value={newContract.date}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Название:</label>
        <input
          type="text"
          name="name"
          value={newContract.name}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Цена:</label>
        <input
          type="number"
          name="price"
          value={newContract.price}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Разработчик:</label>
        <select
          name="developer"
          value={newContract.developer}
          onChange={handleInputChange}
          className="popup__input"
        >
          <option value="">Выберите разработчика</option>
          {developers.map((developer) => (
            <option key={developer._id} value={developer._id}>
              {developer.name}
            </option>
          ))}
        </select>
        <label className="popup__label">Клиент:</label>
        <select
          name="client"
          value={newContract.client}
          onChange={handleInputChange}
          className="popup__input"
        >
          <option value="">Выберите клиента</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
        <div className="popup__buttons">
          <button type="submit" className="popup__submit" onClick={(e) => handleSubmit(e, onContractAdded)}>
            Отправить
          </button>
          <button type="button" className="popup__cancel" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContractPopup;