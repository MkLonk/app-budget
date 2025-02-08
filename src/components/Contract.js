import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContractData } from '../features/contracts/contractsSlice';
import './Contract.css';

const Contract = ({ contract, onContractDeleted }) => {
  const dispatch = useDispatch();

  const handleDeleteContract = async () => {
    try {
      await dispatch(deleteContractData(contract._id)).unwrap();
      onContractDeleted?.();
    } catch (error) {
      console.error('Ошибка при удалении договора:', error.message);
    }
  };

  return (
    <div className="contract-card">
      <div className="contract-card__header">
        <span className="contract-card__number">Номер: {contract.number}</span>
        <span className="contract-card__date">Дата: {contract.date}</span>
      </div>
      <div className="contract-card__name">
        <strong>{contract.name}</strong>
      </div>
      <div className="contract-card__details">
        <div>Цена: {contract.price} руб.</div>
        <div>Разработчик: {contract.developer}</div>
        <div>Клиент: {contract.client}</div>
      </div>
      <div className="contract-card__actions">
        <button className="contract-card__edit-button">Изменить</button>
        <button className="contract-card__delete-button" onClick={handleDeleteContract}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Contract;