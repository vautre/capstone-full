import React from 'react'
import logo from '../../assets/logo.png' 
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  console.log('Is Authenticated:', isAuthenticated);
  console.log('User:', user);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className='nav-links'>
      <a href='/'>
        <img src={logo} alt="" className='logo' />
      </a>
      <ul>
        <Link to='/'><li>HOME</li></Link>
        <Link to='/about-us'><li>ABOUT US</li></Link>
        <Link to='/gallery'><li>GALLERY</li></Link>
        <Link to='/upcoming-events'><li>UPCOMING EVENTS</li></Link>
        <Link to='/membership'><li>MEMBERSHIP</li></Link>
        <Link to='/contact-us'><li>CONTACT US</li></Link>
        {isAuthenticated && user?.isAdmin ? (
          <>
            <Link to="/admin-dashboard"><li>ADMIN DASHBOARD</li></Link>
            <li><button onClick={handleLogout} className='btn'>LOGOUT</button></li>
          </>
        ) : (
          <Link to='/login'><li><button className='btn'>SIGN IN</button></li></Link>
        )}
      </ul>
    </nav>
  )
}

export default Navbar