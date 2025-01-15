import { Link } from 'react-router-dom';
import './Footer.css'
import logo from '../../assets/logo.png' 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left - Company Info */}
        <div className="footer-section">
          <div className="company-info">
            <img src={logo} alt="" className='company-logo' />
            <p className="company-description">
              Creating unforgettable experiences and bringing your events to life.
            </p>
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> nygcpr@gmail.com</p>
              <p><i className="fas fa-phone"></i> (555) 123-4567</p>
            </div>
            <div className="social-links">
              <a href="https://instagram.com/nygoddesses" >
              <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section - Services */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/services/weddings">Weddings</Link></li>
            <li><Link to="/services/social">Social Gatherings</Link></li>
          </ul>
          <h3>Membership</h3>
          <ul className="footer-links">
            <li><Link to="/membership/join">Join Now</Link></li>
            <li><Link to="/membership/benefits">Member Benefits</Link></li>
            <li><Link to="/membership/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Right Section - Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/events">Upcoming Events</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        {/* <p>&copy; 2024 NYGODDES.</p> */}
      </div>
    </footer>
  );
};

export default Footer;