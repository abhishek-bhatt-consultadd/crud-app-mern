import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'; 
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
// import Home from './components/Home'; // Public component
// import Dashboard from './components/Dashboard'; // Protected component
// import Profile from './components/Profile'; // Another protected component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/home" element={<HomePage />} /> 
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        ... other routes (public or protected) */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;