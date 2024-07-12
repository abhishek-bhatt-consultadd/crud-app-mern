// src/components/Signin.js

import React, { useState } from 'react';
import axios from 'axios';
import CONSTANTS from '../constant';
import { useNavigate } from 'react-router-dom';


const Signin = ({ onSignIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(CONSTANTS.BASE_URl + CONSTANTS.SIGN_IN, { username, password });
            if(response.status == 200){
                console.log("response at signin---->"+ response.data);
                navigate('/signup');
            }else{
                // retry
            }
        } catch (error) {
            console.error('Sign in error:', error);
            // Handle sign-in error
        }
    };

    return (
        <>
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>
        </>
    );
};

export default Signin;
