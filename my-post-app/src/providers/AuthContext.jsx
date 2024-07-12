import React, { createContext, useState } from 'react';

const AuthContext = createContext(null); // Default value

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state


  const login = (username, password) => {
    // Login logic (e.g., API call, JWT storage)
    setIsLoggedIn(true); // Update login state
  };

  const logout = () => {
    // Logout logic (e.g., remove JWT)
    setIsLoggedIn(false); // Update login state
  };

  const value = { isLoggedIn, login, logout }; // Context value

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };