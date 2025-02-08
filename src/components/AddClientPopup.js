import React, { useState } from 'react';
import './_popup.css';

const AddClientPopup = ({ onClose, onClientAdded }) => {
  const [newClient, setNewClient] = useState({
    name: '',
    representative: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onClientAdded) {
        await onClientAdded(newClient);
      }
    } catch (error) {
      console.error('Ошибка при добавлении клиента:', error);
    } finally {
      setNewClient({ name: '', representative: '', phone: '', email: '' });
      onClose?.();
    }
  };

  return (
    <div className="popup">
      <div className="popup__form">
        <h2 className="popup__title">Добавить клиента</h2>
        <label className="popup__label">Название:</label>
        <input type="text" name="name" value={newClient.name} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Имя представителя:</label>
        <input type="text" name="representative" value={newClient.representative} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Телефон:</label>
        <input type="text" name="phone" value={newClient.phone} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Email:</label>
        <input type="email" name="email" value={newClient.email} onChange={handleInputChange} className="popup__input" />
        <div className="popup__buttons">
          <button type="submit" className="popup__submit" onClick={handleSubmit}>
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

export default AddClientPopup;