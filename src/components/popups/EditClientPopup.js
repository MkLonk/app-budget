import { useState, useEffect } from 'react';
import './popups.css';

const EditClientPopup = ({ client, onClose, onClientUpdated }) => {
  const [editedClient, setEditedClient] = useState(client);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setEditedClient(client);
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onClientUpdated) {
      await onClientUpdated(editedClient);
    }
    setIsChanged(false);
    onClose?.();
  };

  return (
    <div className="popup">
      <div className="popup__form">
        <h2 className="popup__title">Редактировать клиента</h2>
        <label className="popup__label">Название:</label>
        <input
          type="text"
          name="name"
          value={editedClient.name}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Имя представителя:</label>
        <input
          type="text"
          name="representative"
          value={editedClient.representative}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Телефон:</label>
        <input
          type="text"
          name="phone"
          value={editedClient.phone}
          onChange={handleInputChange}
          className="popup__input"
        />
        <label className="popup__label">Email:</label>
        <input
          type="email"
          name="email"
          value={editedClient.email}
          onChange={handleInputChange}
          className="popup__input"
        />
        <div className="popup__buttons">
          <button
            type="submit"
            className="popup__submit"
            onClick={handleSubmit}
            disabled={!isChanged}
          >
            Изменить
          </button>
          <button type="button" className="popup__cancel" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientPopup;