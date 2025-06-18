import React, { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import { generateUserId } from '../utils/userId';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose }) => {
  const { userId } = useUserId();
  const [dragonDecision] = useDecision('dragon-recommendation-2');
  const [subscriptionDecision] = useDecision('subscription_tiers');
  const [notAvailableDecision] = useDecision('not_available');
  const sdkKey = localStorage.getItem('optimizely_sdk_key') || 'VcBzHwxVF7kba7WCvzSfW';
  const [country, setCountry] = useState(localStorage.getItem('user_country') || '');
  const [device, setDevice] = useState(localStorage.getItem('device') || 'browser');
  const [tempCountry, setTempCountry] = useState(country);

  useEffect(() => {
    // Update Optimizely attributes when country or device changes
    // Note: We'll handle reloads manually when user changes values
  }, [country, device]);

  const handleCountrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCountry !== country) {
      setCountry(tempCountry);
      localStorage.setItem('user_country', tempCountry);
      // Reload to apply new attributes
      window.location.reload();
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempCountry(e.target.value);
  };

  const handleDeviceChange = (newDevice: string) => {
    setDevice(newDevice);
    localStorage.setItem('device', newDevice);
    // Reload to apply new attributes
    window.location.reload();
  };

  const handleRegenerateUserId = async () => {
    const newUserId = generateUserId();
    await new Promise<void>((resolve) => {
      localStorage.setItem('userId', newUserId);
      resolve();
    });
    window.location.reload();
  };

  const renderJsonValue = (value: any, indent: number = 0) => {
    const indentStyle = { marginLeft: `${indent * 20}px` };
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="json-object" style={{ fontFamily: 'Courier New' }}>
          <span>{'{'}</span>
          {Object.entries(value).map(([key, val], index, array) => (
            <div key={key} className="json-property" style={indentStyle}>
              <span className="json-key">"{key}"</span>
              <span>: </span>
              {typeof val === 'object' ? renderJsonValue(val, indent + 1) : (
                <span className="json-value">
                  {typeof val === 'string' ? `"${val}"` : String(val)}
                </span>
              )}
              {index < array.length - 1 && <span>,</span>}
            </div>
          ))}
          <div style={{ marginLeft: `${(indent - 1) * 20}px` }}>{'}'}</div>
        </div>
      );
    }
    return (
      <span className="json-value" style={{ fontFamily: 'Courier New' }}>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </span>
    );
  };

  const renderFeatureFlagInfo = (decision: any, flagKey: string) => {
    if (!decision.enabled) return null;
    
    return (
      <div key={flagKey} className="feature-flag-info mb-3">
        <h4 className="text-white mb-2">{flagKey}</h4>
        <div className="d-flex flex-column gap-2">
          <div>
            <span className="text-light">Variation: </span>
            <code className="text-light bg-dark border border-secondary p-2 rounded">{decision.variationKey || 'control'}</code>
          </div>
          {decision.variables && Object.entries(decision.variables).map(([key, value]) => (
            <div key={key} className="variable-info">
              <span className="text-light">{key}: </span>
              <div className="value-container bg-dark border border-secondary p-2 rounded">
                {renderJsonValue(value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-content">
        <h2><i className="fas fa-cog"/> Settings</h2>
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="user-id-wrapper bg-dark p-4 rounded">
        <h3><i className="fas fa-user-group"/> Attributes</h3>
          <div className="mb-4">
            <h4 className="text-white mb-3">User Country</h4>
            <form onSubmit={handleCountrySubmit} className="d-flex align-items-center">
              <input
                type="text"
                value={tempCountry}
                onChange={handleCountryChange}
                placeholder="Enter country code (e.g., US, UK, FR)"
                className="form-control bg-dark text-light border-secondary"
                style={{ maxWidth: '200px' }}
              />
              <button
                type="submit"
                className="btn btn-secondary ms-2"
              >
                <i className="fas fa-check"></i>
              </button>
            </form>
          </div>

          <div className="mb-4">
            <h4 className="text-white mb-3">Device Type</h4>
            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => handleDeviceChange('mobile')}
                className={`mt-3 btn ${device === 'mobile' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
              >
                <i className="fas fa-mobile-alt me-2"></i>
                Mobile App
              </button>
              <button
                onClick={() => handleDeviceChange('tv')}
                className={`mt-3 btn ${device === 'tv' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
              >
                <i className="fas fa-tv me-2"></i>
                TV App
              </button>
              <button
                onClick={() => handleDeviceChange('browser')}
                className={`mt-3 btn ${device === 'browser' ? 'btn-primary' : 'btn-secondary'} btn-lg`}
              >
                <i className="fas fa-globe me-2"></i>
                Browser
              </button>
            </div>
            <div className="mt-2">
              <small className="text-light">Current: <code className="text-light bg-dark border border-secondary px-2 py-1 rounded">{device}</code></small>
            </div>
          </div>

          <h3 className="text-white mb-3"><i className="fas fa-fingerprint"/> Your User ID</h3>
          <div className="">
            <code className="text-light bg-dark border border-secondary p-2 rounded large-text">{userId}</code>
            <br/>
            <button 
              onClick={handleRegenerateUserId}
              className="theme-btn block-btn mt-3"
            >
              <i className="fas fa-sync"/> New ID
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-white mb-3"><i className="fas fa-globe"/> Optimizely SDK Key</h4>
            <div className="d-flex align-items-center">
              <code className="text-light bg-dark border border-secondary p-2 rounded">{sdkKey}</code>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-white mb-3"><i className="fas fa-toggle-on"/> Active Feature Flags</h4>
            {renderFeatureFlagInfo(dragonDecision, 'dragon-recommendation-2')}
            {renderFeatureFlagInfo(notAvailableDecision, 'not_available')}
            {renderFeatureFlagInfo(subscriptionDecision, 'subscription_tiers')}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel; 