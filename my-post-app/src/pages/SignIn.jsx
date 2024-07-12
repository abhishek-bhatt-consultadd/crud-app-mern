import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import '../css/signin.css'

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext); // Access setIsLoggedIn

  const handleSignIn = async (e) => {
    e.preventDefault();
    login(username, password);
    navigate('/home');
  };



  return (
    <div className="signin-container" >
      <h2>Sign In</h2>

      <form onSubmit={handleSignIn} className="signin-form">
        <label htmlFor="username" className="signin-label">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password" className="signin-label">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="signin-button">
          Sign In
        </button>

      </form>
    </div>
  );
};

export default Signin;
