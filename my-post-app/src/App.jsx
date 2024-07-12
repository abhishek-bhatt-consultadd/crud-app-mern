import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 
import ProtectedRoute from './pages/ProtectedRoute';
import HomePage from './pages/HomePage';
import { AuthProvider } from './providers/AuthContext';
// import Home from './components/Home'; // Public component
// import Dashboard from './components/Dashboard'; // Protected component
// import Profile from './components/Profile'; // Another protected component

const App = () => {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/home" element={  
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>  
        } /> 

         
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
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;