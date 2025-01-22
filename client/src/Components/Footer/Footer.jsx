import { Link } from 'react-router-dom';
import './Footer.css'
import Newsletter from '../Newsletter/Newsletter'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-header">
          <h2>NEW YORK</h2>
          <h1>GODDESSES</h1>
          <div className="footer-venues">
            <span>EVENTS</span>
            <span className="separator">|</span>
            <span>NETWORKING</span>
            <span className="separator">|</span>
            <span>MARKETING</span>
          </div>
        </div>

        <div className="social-links">
          <a href="https://instagram.com/nygoddesses" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="nygcpr@gmail.com">nygcpr@gmail.com</a>
          </div>
          <div className="contact-item address">
            <div className="footer-venues-grid">
              <Link to="/">
                <button>HOME</button>
              </Link>
              <Link to="/gallery">
                <button>GALLERY</button>
              </Link>
              <Link to="/membership">
                <button>MEMBERSHIP</button>
              </Link>
              <Link to="/contact-us">
                <button>CONTACT US</button>
              </Link>
              <Link to="/about-us">
                <button>ABOUT</button>
              </Link>
              <Link to="/upcoming-events">
                <button>UPCOMING EVENTS</button>
              </Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlF0aieVmkFr6ITves3JBQDvT3Any9lPeplG64CldRniJayQ/viewform?vc=0&c=0&w=1&flr=0&fbclid=PAZXh0bgNhZW0CMTEAAaa4hSxcWdRgr2T9_2tkSvcPezW50PqoTYd-SxL43S_I_m_8PSGp6ZVFJB0_aem_2eANjZn_mQq7DDsb_-8chA" 
                target="_blank" 
                rel="business">
                <button>COLLABORATION</button>
                </a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHEjWAuyxCCIcpMG2B3KkWFOLhGaUYh61tyG0GAQOE2RQ2Rg/viewform" 
                target="_blank" 
                rel="membership">
                <button>JOIN US</button>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-heading footer-4">
            <Newsletter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;