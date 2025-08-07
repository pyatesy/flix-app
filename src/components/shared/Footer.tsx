/*import React from 'react';*/
import { Link } from 'react-router-dom';

const SharedFooter: React.FC = () => {
  return (
    <footer className="footer-section footer-bg">
      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="newsletter-items">
            <h3>Stay connected</h3>
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
                <h2>Connect with us</h2>
                <div className="social-icon d-flex align-items-center">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-social-box">
                <div className="content">
                  <h2>Get in touch</h2>
                  <p>Ready to get started?</p>
                </div>
                <Link to="/contact" className="theme-btn">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <ul className="footer-list-2">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="wow fadeInUp" data-wow-delay=".3s">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SharedFooter; 