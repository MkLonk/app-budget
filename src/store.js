import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clients/clientsSlice';
import developersReducer from './features/developers/developersSlice';
import contractsReducer from './features/contracts/contractsSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    developers: developersReducer,
    contracts: contractsReducer,
  },
});

export default store;