import React from 'react';
import { BrowserRouter, Routes, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { AuthProvider } from './providers/AuthContext';

const App = () => {
  return (
    <AuthProvider>
     <RouterProvider router={routes} />
     </AuthProvider>
  );
};

export default App;