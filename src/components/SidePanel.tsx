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
  const sdkKey = localStorage.getItem('optimizely_sdk_key') || 'VcBzHwxVF7kba7WCvzSfW';
  const [country, setCountry] = useState(localStorage.getItem('user_country') || '');

  useEffect(() => {
    // Update Optimizely attributes when country changes
    if (country) {
      // Force a reload to apply new attributes
      window.location.reload();
    }
  }, [country]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    localStorage.setItem('user_country', newCountry);
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
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="user-id-wrapper bg-dark p-4 rounded">
          <div className="mb-4">
            <h4 className="text-white mb-3">User Country</h4>
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={country}
                onChange={handleCountryChange}
                placeholder="Enter country code (e.g., US, UK, FR)"
                className="form-control bg-dark text-light border-secondary"
                style={{ maxWidth: '200px' }}
              />
            </div>
          </div>

          <h3 className="text-white mb-3">Your User ID</h3>
          <div className="d-flex align-items-center justify-content-between">
            <code className="text-light bg-dark border border-secondary p-2 rounded">{userId}</code>
            
            <button 
              onClick={handleRegenerateUserId}
              className="theme-btn"
            >
              Generate New ID
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-white mb-3">Optimizely SDK Key</h4>
            <div className="d-flex align-items-center">
              <code className="text-light bg-dark border border-secondary p-2 rounded">{sdkKey}</code>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-white mb-3">Active Feature Flags</h4>
            {renderFeatureFlagInfo(dragonDecision, 'dragon-recommendation-2')}
            {renderFeatureFlagInfo(subscriptionDecision, 'subscription_tiers')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel; 