import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './features/clients/clientsSlice';
import developersReducer from './features/developers/developersSlice';
import contractsReducer from './features/contracts/contractsSlice';
import authReducer from './features/auth/authSlice';
import companiesReducer from './features/companies/companiesSlice';

const store = configureStore({
  reducer: {
    companies: companiesReducer,
    clients: clientsReducer,
    developers: developersReducer,
    contracts: contractsReducer,
    auth: authReducer
  },
});

export default store;