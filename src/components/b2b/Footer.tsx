import React from 'react';
import { Link } from 'react-router-dom';

const B2BFooter: React.FC = () => {
  return (
    <footer className="footer-section footer-bg">
      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="newsletter-items">
            <h3>Stay updated with industry insights</h3>
            <div className="newsletter-input">
              <input type="text" name="email" id="email" placeholder="Business email address" />
              <button type="submit" className="theme-btn">
                Subscribe
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Solutions</h4>
                <ul>
                  <li><Link to="/solutions/enterprise">Enterprise</Link></li>
                  <li><Link to="/solutions/smb">SMB</Link></li>
                  <li><Link to="/solutions/startup">Startup</Link></li>
                  <li><Link to="/solutions/industry">Industry Solutions</Link></li>
                  <li><Link to="/integrations">Integrations</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Resources</h4>
                <ul>
                  <li><Link to="/case-studies">Case Studies</Link></li>
                  <li><Link to="/whitepapers">Whitepapers</Link></li>
                  <li><Link to="/webinars">Webinars</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/documentation">Documentation</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/partners">Partners</Link></li>
                  <li><Link to="/press">Press</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Support</h4>
                <ul>
                  <li><Link to="/help">Help Center</Link></li>
                  <li><Link to="/enterprise-support">Enterprise Support</Link></li>
                  <li><Link to="/training">Training</Link></li>
                  <li><Link to="/status">System Status</Link></li>
                  <li><Link to="/security">Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="footer-list-2">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><Link to="/compliance">Compliance</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="wow fadeInUp" data-wow-delay=".3s">
          &copy; {new Date().getFullYear()} Enterprise Solutions. All rights reserved. Trusted by 10,000+ businesses worldwide.
        </p>
      </div>
    </footer>
  );
};

export default B2BFooter; 