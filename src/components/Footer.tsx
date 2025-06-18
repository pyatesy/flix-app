import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section footer-bg">
      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="newsletter-items">
            <h3>Subscribe to newsletter</h3>
            <div className="newsletter-input">
              <input type="text" name="email" id="email" placeholder="Email address" />
              <button type="submit" className="theme-btn">
                Subscribe
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="footer-social-box">
                <h2>follow Flix on social</h2>
                <div className="social-icon d-flex align-items-center">
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-social-box scaner-box">
                <div className="content">
                  <h2>Get the Flix app</h2>
                  <p>for android AND iOS</p>
                </div>
                <img src="/assets/img/scaner.png" alt="QR Code" />
              </div>
            </div>
          </div>
          <ul className="footer-list-2">
            <li><Link to="/press">press room</Link></li>
            <li><Link to="/advertising">advertising</Link></li>
            <li><Link to="/terms">conditions of use</Link></li>
            <li><Link to="/privacy">privacy policy</Link></li>
            <li><Link to="/ads-privacy">Your Ads Privacy Choices</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="wow fadeInUp" data-wow-delay=".3s">
          &copy; {new Date().getFullYear()} Optimizely. Flix is a fictional streaming platform. All rights reserved. <a href="https://www.optimizely.com" target="_blank" rel="noopener noreferrer">Optimizely</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 