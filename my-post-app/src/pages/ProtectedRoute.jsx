import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const token = localStorage.getItem("auth_token");
  if ( token == null) {
    return <Navigate to="/signin" replace />; // Redirect to login on failure
  }

  return <Outlet /> 
};

export default ProtectedRoute;