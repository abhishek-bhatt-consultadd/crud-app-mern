import React, { createContext, useState } from 'react';
import axios from 'axios';
import CONSTANTS from '../constant';
const AuthContext = createContext(null); // Default value

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await axios.post(CONSTANTS.BASE_URl + CONSTANTS.SIGN_IN, { username, password });

      if (response.status === 200) {
        const token = extractTokenFromResponse(response.data);
        localStorage.setItem('auth_token', token); // Store token in localStorage
        setIsLoggedIn(true); // Update login state

        const hasAdminRole = checkForAdminRole(response.data); 

      if (hasAdminRole) {
        localStorage.setItem('isAdmin', true); 
        setIsAdmin(true);
      } else {
        localStorage.removeItem('isAdmin'); 
      }
      } else {
        console.error('Sign in error:', response.data);
        // Handle sign-in error (e.g., display error message)
      }
    } catch (error) {
      console.error('Sign in error:', error);
      // Handle network or other errors
    }
  };

  const extractTokenFromResponse = (responseData) => {
    if (responseData.token) {
      return responseData.token.split('=')[1];
    } else {
      throw new Error('Invalid token format in response');
    }
  };

  const checkForAdminRole = (responseData) => {
    if (!responseData.roles) {
      console.error('Missing "roles" property in response data');
      return false; // Handle missing roles gracefully
    }
  
    // Check if "roles" array includes "ROLE_ADMIN"
    return responseData.roles.includes('ROLE_ADMIN');
  };

  const logout = () => {
    // Logout logic (e.g., remove JWT)
    try{
      setIsLoggedIn(false); // Update login state
      localStorage.clear();
    }catch (error) {
      console.error('Sign in error:', error);
      // Handle network or other errors
    }
  };

  const value = { isLoggedIn, login, logout }; // Context value

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };