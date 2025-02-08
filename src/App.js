import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header/Header';
import ClientsList from './components/clients/ClientsList';
import DevelopersList from './components/developers/DevelopersList';
import ContractsList from './components/contracts/ContractsList';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/developers" element={<DevelopersList />} />
          <Route path="/contracts" element={<ContractsList />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;