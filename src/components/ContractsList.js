import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractsData, deleteContractData } from '../features/contracts/contractsSlice';
import Contract from './Contract';
import './ContractsList.css';

const ContractsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.contracts);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    dispatch(fetchContractsData());
  }, [dispatch]);

  if (status === 'loading') return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="contracts-list">
      {notification && <div className="contracts-list__notification">{notification}</div>}
      <h1>Список договоров</h1>
      <div className="contracts-list__cards">
        {list.map((contract) => (
          <Contract
            key={contract._id}
            contract={contract}
            onContractDeleted={() => setNotification('Договор удален')}
          />
        ))}
      </div>
    </div>
  );
};

export default ContractsList;