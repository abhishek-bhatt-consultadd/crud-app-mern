// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import CONSTANTS from '../constant';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css'


const Signup = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const role = ["user"];
            const response = await axios.post(CONSTANTS.BASE_URl + CONSTANTS.SIGN_UP, { username, password, role, email });
           if(response.status == 200){
            // navigate to signin
            navigate('/signin');
           }else{
            console.log(response.data);
           }
        } catch (error) {
            console.error('Sign up error:', error);
            // Handle sign-up error
        }
    };

    return (
        <div className="signup-form">
  <h2>Sign Up</h2>
  <form onSubmit={handleSignUp}>
    <label htmlFor="email">
      Email:
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </label>
    <label htmlFor="password">
      Password:
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </label>
    <label htmlFor="username">
      Username:
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
    </label>
    <button type="submit">Sign Up</button>
  </form>
</div>
    );
};

export default Signup;
