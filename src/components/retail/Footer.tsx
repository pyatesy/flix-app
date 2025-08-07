import React from 'react';
import { Link } from 'react-router-dom';

const RetailFooter: React.FC = () => {
  return (
    <footer className="bg-dark text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Opal Haute Couture</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-light">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-light">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-light">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Social Media</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-light"><i className="fab fa-facebook-f"></i> Facebook</a>
              </li>
              <li>
                <a href="#" className="text-light"><i className="fab fa-twitter"></i> Twitter</a>
              </li>
              <li>
                <a href="#" className="text-light"><i className="fab fa-instagram"></i> Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Optimizely Store. All rights reserved.
      </div>
    </footer>
  );
};

export default RetailFooter; 