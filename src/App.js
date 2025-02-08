import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import ClientsList from './components/ClientsList';
import DevelopersList from './components/DevelopersList';
import ContractsList from './components/ContractsList';

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