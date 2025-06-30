import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import optimizelyClient from '../config/optimizely';
import { Link } from 'react-router-dom';
import { useThemeAssets } from '../hooks/useThemeAssets';

const RegionOverlay: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userId } = useUserId();
  const { logoUrl, breadcrumbBackgroundUrl } = useThemeAssets();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  
  // Use Optimizely React SDK hook to check the feature flag
  const [decision] = useDecision('not_available');
  const isNotAvailable = decision?.enabled || false;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Track the email submission event
      optimizelyClient.track('email_submitted', userId, {
        email: email,
        feature_flag: 'not_available'
      });
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Don't render if the feature flag is not enabled
  if (!isNotAvailable) {
    return null;
  }

  return (
    
    <div className="region-overlay container-fluid">
              <div className="region-overlay-hamburger">
                  <div className="sidebar__toggle" onClick={togglePanel}>
                    <i className="fas fa-bars fa-3x"></i>
                  </div>
              </div>
    <div className="overlay-content-fluid w-100">
      <div className="breadcrumb-wrapper" style={{ backgroundImage: `url(${breadcrumbBackgroundUrl})` }}>
        <div className="container-fluid">
          <div className="page-heading">
            <div className="page-header-left">
            <div className="logo">                  
                    <img src={logoUrl} alt="logo-img" width={300}/>
                </div>
                <br/>
                <br/>
                <h1>Sorry, we are Not Avialable in <br/>{localStorage.getItem('user_country')}</h1>
                <br/>
                <br/>
              <h2><i className="fa-solid fa-heart-broken fa-2x"></i> <br/>Well, that escalated quickly. <br/> - Ron Burgundy</h2>
            </div>
            <br/>
            <br/>

            <h4>Enter your email address and we'll let you know when we are.</h4>
            
            {!isSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="overlay-form">
            <div className="email-input-group">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                required
                className="email-input"
              />
              <button type="submit" className="mt-3 theme-btn">
                Notify Me
              </button>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <i className="fa-solid fa-check-circle"></i>
            <p>Thank you! We'll notify you when we are available in your region.</p>
          </div>
        )}
          </div>
        </div>
      </div>

        
      </div>
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
    
  );
};

export default RegionOverlay; 