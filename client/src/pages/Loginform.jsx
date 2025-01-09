import React from 'react'
import './Loginform.css'
import logo from '../assets/logo.png'
import { FaUserSecret } from "react-icons/fa"
import { GiLockedChest } from "react-icons/gi"

function Loginform() {
  return (
    <div className='login-bg'>
      <div className='wrapper'>
        <form action="">
          <img src={logo} alt="" className='logo-login' />
          <h1>Sign In</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' required />
            <FaUserSecret className='icon'/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' required />
            <GiLockedChest className='icon'/>
          </div>
          <div className='remember-box'>
            <label><input type="checkbox" />Remember me </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register">
            <p>New member? <a href="#">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Loginform