import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 Crypto-verse. All rights reserved.</p>
          <p>Designed by <a href="https://github.com/manisprasad">Manis </a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
