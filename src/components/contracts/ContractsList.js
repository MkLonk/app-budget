import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractsData, addContractData } from '../../features/contracts/contractsSlice';
import { fetchClientsData } from '../../features/clients/clientsSlice';
import { fetchDevelopersData } from '../../features/developers/developersSlice';
import Contract from './Contract';
import AddContractPopup from '../popups/AddContractPopup';
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../config';

import './сontractsList.css'; // Подключаем универсальные стили для таблицы

const ContractsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.contracts);

  const clients = useSelector((state) => state.clients.list); // Получаем список клиентов
  const developers = useSelector((state) => state.developers.list); // Получаем список разработчиков

  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      toast.success('Новый договор добавлен', toastSuccess);
    } catch (error) {
      toast.error(`Ошибка при добавлении договора: ${error.message}`, toastError);
    } finally {
      togglePopup(); // Закрываем попап после отправки
    }
  };

  if (status === 'loading') return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="contracts-list">
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
          />
        ))}
      </div>
    </div>
  );
};

export default ContractsList;