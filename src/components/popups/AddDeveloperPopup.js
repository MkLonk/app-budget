import React, { useState } from 'react';
import './popups.css';

const AddDeveloperPopup = ({ onClose, onDeveloperAdded }) => {
  const [newDeveloper, setNewDeveloper] = useState({
    name: '',
    representative: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeveloper({ ...newDeveloper, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onDeveloperAdded) {
        await onDeveloperAdded(newDeveloper);
      }
    } catch (error) {
      console.error('Ошибка при добавлении разработчика:', error);
    } finally {
      setNewDeveloper({ name: '', representative: '', phone: '', email: '' });
      onClose?.();
    }
  };

  return (
    <div className="popup">
      <div className="popup__form">
        <h2 className="popup__title">Добавить разработчика</h2>
        <label className="popup__label">Название:</label>
        <input type="text" name="name" value={newDeveloper.name} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Имя представителя:</label>
        <input type="text" name="representative" value={newDeveloper.representative} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Телефон:</label>
        <input type="text" name="phone" value={newDeveloper.phone} onChange={handleInputChange} className="popup__input" />
        <label className="popup__label">Email:</label>
        <input type="email" name="email" value={newDeveloper.email} onChange={handleInputChange} className="popup__input" />
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

export default AddDeveloperPopup;