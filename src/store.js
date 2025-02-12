import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clients/clientsSlice';
import developersReducer from './features/developers/developersSlice';
import contractsReducer from './features/contracts/contractsSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    developers: developersReducer,
    contracts: contractsReducer,
    auth: authReducer
  },
});

export default store;