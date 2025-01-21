import React, { useState } from "react";
import logo from '../assets/logo.png';
import './Loginform.css';
import { useAuth } from '../context/AuthContext';

function Loginform() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // New state for admin toggle
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: username,
      password: password,
    };

    try {
      const endpoint = isAdmin ? '/api/admin/login' : '/api/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const loginData = {
          ...responseData,
          isAdmin: responseData.isAdmin // Use the isAdmin from server response
        };
        
        console.log('Login Data:', loginData);
        login(loginData);
        
        // Use setTimeout to ensure state is updated before redirect
        setTimeout(() => {
          if (loginData.isAdmin) {
            window.location.href = '/admin-dashboard';
          } else {
            window.location.href = '/dashboard';
          }
        }, 100);
      } else {
        setError(responseData.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred, please try again later');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='loginform'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="logo" className='logo-login' />
          <h1>Login</h1>

          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Username' 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password' 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='remember-box'>
            <label>
              <input 
                type='checkbox' 
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Admin Login
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          {error && <div className="error-message">{error}</div>} 

          <div className='register'>
            <p>New member? <a href="/register">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Loginform
