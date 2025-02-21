import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header/Header';
import Home from './components/home/Home'
import ClientsList from './components/clients/ClientsList';
import Companies from './components/companies/Companies'
// import CreateCompanyForm from './components/companies/CreateCompanyForm';
import DevelopersList from './components/developers/DevelopersList';
import ContractsList from './components/contracts/ContractsList';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Импорт стилей


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/companies" element={
            <PrivateRoute>
              <Companies />
            </PrivateRoute>} />

          <Route path="/clients" element={
            <PrivateRoute>
              <ClientsList />
            </PrivateRoute>} />

          <Route path="/developers" element={
            <PrivateRoute>
              <DevelopersList />
            </PrivateRoute>} />

          <Route path="/contracts" element={
            <PrivateRoute>
              <ContractsList />
            </PrivateRoute>} />
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
};

export default App;