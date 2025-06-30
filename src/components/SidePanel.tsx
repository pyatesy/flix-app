import React, { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import { generateUserId } from '../utils/userId';
import FeatureFlagGenerator from './FeatureFlagGenerator';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose }) => {
  const { userId } = useUserId();
  const [dragonDecision] = useDecision('dragon-recommendation-2');
  const [subscriptionDecision] = useDecision('subscription_tiers');
  const [notAvailableDecision] = useDecision('not_available');
  const [themeCustomizationDecision] = useDecision('theme_customization');
  const [offerBannerDecision] = useDecision('offer_banner');
  const [country, setCountry] = useState(localStorage.getItem('user_country') || '');
  const [device, setDevice] = useState(localStorage.getItem('device') || 'browser');
  const [tempCountry, setTempCountry] = useState(country);
  const [customAttributes, setCustomAttributes] = useState(localStorage.getItem('custom_attributes') || '');
  const [tempCustomAttributes, setTempCustomAttributes] = useState(customAttributes);
  const [sdkKey, setSdkKey] = useState(localStorage.getItem('optimizely_sdk_key') || 'VcBzHwxVF7kba7WCvzSfW');
  const [tempSdkKey, setTempSdkKey] = useState(sdkKey);

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

  const handleCustomAttributesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCustomAttributes !== customAttributes) {
      setCustomAttributes(tempCustomAttributes);
      localStorage.setItem('custom_attributes', tempCustomAttributes);
      // Reload to apply new attributes
      window.location.reload();
    }
  };

  const handleCustomAttributesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempCustomAttributes(e.target.value);
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

  const handleSdkKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSdkKey(e.target.value);
  };

  const handleSdkKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempSdkKey !== sdkKey) {
      setSdkKey(tempSdkKey);
      localStorage.setItem('optimizely_sdk_key', tempSdkKey);
      // Reload to apply new SDK key
      window.location.reload();
    }
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
        <div className="mt-4">
            <h4 className="text-white mb-3"><i className="fas fa-magic"/> Feature Flag Generator</h4>
            <p className="text-light mb-3">
              Generate Optimizely feature flags in your own account using the current app configuration.
            </p>
            <FeatureFlagGenerator />
          </div>
          
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

          <div className="mb-4">
            <h4 className="text-white mb-3">Custom Attributes</h4>
            <form onSubmit={handleCustomAttributesSubmit}>
              <textarea
                value={tempCustomAttributes}
                onChange={handleCustomAttributesChange}
                placeholder="Enter key=value pairs, one per line:&#10;age=25&#10;subscription=premium&#10;language=en"
                className="form-control bg-dark text-light border-secondary"
                rows={6}
                style={{ fontFamily: 'Courier New', fontSize: '16px' }}
              />
              <div className="mt-2">
                <small className="text-light">Format: key=value (one per line)</small>
              </div>
              <button
                type="submit"
                className="btn btn-secondary mt-2"
              >
                <i className="fas fa-check"></i> Apply Attributes
              </button>
            </form>
            
            {customAttributes && (
              <div className="mt-3">
                <h5 className="text-white mb-2">Current Custom Attributes:</h5>
                <div className="bg-dark border border-secondary p-2 rounded">
                  {customAttributes.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine && trimmedLine.includes('=')) {
                      const [key, value] = trimmedLine.split('=').map(part => part.trim());
                      return (
                        <div key={index} className="text-light">
                          <code>{key}</code>: <code>{value}</code>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
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
            <form onSubmit={handleSdkKeySubmit} className="d-flex align-items-center">
              <input
                type="text"
                value={tempSdkKey}
                onChange={handleSdkKeyChange}
                placeholder="Enter Optimizely SDK Key"
                className="form-control bg-dark text-light border-secondary"
                style={{ fontFamily: 'Courier New', fontSize: '14px' }}
              />
              <button
                type="submit"
                className="btn btn-secondary ms-2"
              >
                <i className="fas fa-check"></i>
              </button>
            </form>
            <div className="mt-2">
              <small className="text-light">Current: <code className="text-light bg-dark border border-secondary px-2 py-1 rounded">{sdkKey}</code></small>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-white mb-3"><i className="fas fa-toggle-on"/> Active Feature Flags</h4>
            {renderFeatureFlagInfo(dragonDecision, 'dragon-recommendation-2')}
            {renderFeatureFlagInfo(notAvailableDecision, 'not_available')}
            {renderFeatureFlagInfo(offerBannerDecision, 'offer_banner')}
            {renderFeatureFlagInfo(subscriptionDecision, 'subscription_tiers')}
            {renderFeatureFlagInfo(themeCustomizationDecision, 'theme_customization')}
           
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default SidePanel; 