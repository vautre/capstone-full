import React, { useState } from "react";
import './Loginform.css';
import logo from '../assets/logo.png';

function Loginform() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: username,  // Assuming the "Username" field is the email
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5555/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 202) {
        const responseData = await response.json();
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(responseData));
        // Redirect or update UI as necessary
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred, please try again later');
      console.error(err);
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
              onChange={(e) => setUsername(e.target.value)}  // Set state for username
            />
          </div>

          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password' 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Set state for password
            />
          </div>

          <div className='remember-box'>
            <label><input type='checkbox' />Remember Me</label>
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
