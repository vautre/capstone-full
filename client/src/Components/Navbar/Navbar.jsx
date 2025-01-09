import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png' 
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav-links'>
        <img src={logo} alt="" className='logo' />
        <ul>
            <Link to='/'><li>HOME</li></Link>
            <Link to='/about'><li>ABOUT US</li></Link>
            <Link to='/gallery'><li>GALLERY</li></Link>
            <Link to='/upcoming-events'><li>UPCOMING EVENTS</li></Link>
            <Link to='/membership'><li>MEMBERSHIP</li></Link>
            <Link to='/contact-us'><li>CONTACT US</li></Link>
            <Link to='/login'><li><button className='btn'>SIGN IN</button></li></Link>
        </ul>
    </nav>
  )
}

export default Navbar