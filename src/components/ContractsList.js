import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractsData, addContractData } from '../features/contracts/contractsSlice';
import { fetchClientsData } from '../features/clients/clientsSlice';
import { fetchDevelopersData } from '../features/developers/developersSlice';
import Contract from './Contract';
import AddContractPopup from './AddContractPopup';
import './ContractsList.css';

const ContractsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.contracts);

  const clients = useSelector((state) => state.clients.list); // Получаем список клиентов
  const developers = useSelector((state) => state.developers.list); // Получаем список разработчиков

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    dispatch(fetchContractsData());
    dispatch(fetchClientsData());
    dispatch(fetchDevelopersData());
  }, [dispatch]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Функция для обработки добавления нового договора
  const handleContractAdded = async (newContract) => {
    try {
      await dispatch(addContractData(newContract)).unwrap(); // Добавляем новый договор
      await dispatch(fetchContractsData());
      setNotification('Новый договор добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении договора:', error.message);
    } finally {
      togglePopup(); // Закрываем попап после отправки
    }
  };

  if (status === 'loading') return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="contracts-list">
      {notification && <div className="contracts-list__notification">{notification}</div>}
      <div className="contracts-list__header">
        <h1>Список договоров</h1>
        <button className="contracts-list__button" onClick={togglePopup}>
          Добавить договор
        </button>
      </div>
      {isPopupOpen && (
        <AddContractPopup
          onClose={togglePopup}
          onContractAdded={handleContractAdded}
          clients={clients} // Передаем список клиентов
          developers={developers} // Передаем список разработчиков
        />
      )}

      <div className="contracts-list__cards">
        {list.map((contract) => (
          <Contract
            key={contract._id}
            contract={contract}
            onContractDeleted={() => setNotification('Запись удалена')}
          />
        ))}
      </div>
    </div>
  );
};

export default ContractsList;