import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext'; // Replace with your context name

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />; // Redirect to login on failure
  }

  return <Outlet />; // Render child component if authenticated
};

export default ProtectedRoute;