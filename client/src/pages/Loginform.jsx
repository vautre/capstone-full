import React, { useState } from "react";
import logo from '../assets/logo.png';
import './Loginform.css';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Loginform() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // New state for admin toggle
  const { login, user } = useAuth();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const data = {
      email: username,
      password: password,
    };

    try {
      // Make API call first
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
        // Create userData object with all necessary properties
        const userData = {
          ...responseData,
          isAdmin: isAdmin, // Use the isAdmin state
          token: responseData.token,
        };

        // Call login with the userData object
        login(userData);

        // Redirect based on admin status
        if (userData.isAdmin) {
          history.push('/admin-dashboard');
        } else {
          history.push('/');
        }
      } else {
        setError(responseData.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', error);
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
