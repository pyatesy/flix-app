import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/not_found.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
      <div className="error-content text-center">
                    <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp'}}>4<span>0</span>4</h2>
                    <h3 className="wow fadeInUp" data-wow-delay=".5s" style={{visibility: 'visible', animationDelay: '0.5s', animationName: 'fadeInUp'}}>we’re sorry page not found</h3>
                </div>
        <Link to="/" className="not-found__button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 