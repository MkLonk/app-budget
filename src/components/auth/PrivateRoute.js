// src/components/auth/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  
  const token = useSelector((state) => state.auth.token);
  // console.log('PrivateRoute.js', token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;