import React, { useState, useEffect } from 'react';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import { generateUserId } from '../utils/userId';
import FeatureFlagGenerator from './FeatureFlagGenerator';
import optimizelyClient from '../config/optimizely';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  name: string;
  code: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose }) => {
  const { userId } = useUserId();
  const [country, setCountry] = useState(localStorage.getItem('user_country') || '');
  const [device, setDevice] = useState(localStorage.getItem('device') || 'browser');
  const [tempCountry, setTempCountry] = useState(country);
  const [customAttributes, setCustomAttributes] = useState(localStorage.getItem('custom_attributes') || '');
  const [tempCustomAttributes, setTempCustomAttributes] = useState(customAttributes);
  const [sdkKey, setSdkKey] = useState(localStorage.getItem('optimizely_sdk_key') || 'VcBzHwxVF7kba7WCvzSfW');
  const [tempSdkKey, setTempSdkKey] = useState(sdkKey);
  const [activeTab, setActiveTab] = useState<'demo' | 'admin' | 'flags'>('demo');

  // Check localStorage for initial state on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') as 'demo' | 'admin' | 'flags';
    if (savedTab && ['demo', 'admin', 'flags'].includes(savedTab)) {
      setActiveTab(savedTab);
      // Clear the localStorage after reading it
      localStorage.removeItem('activeTab');
    }
  }, []);
  
  // Country dropdown states
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [expandedJsonVariables, setExpandedJsonVariables] = useState<{[key: string]: boolean}>({});
  const [panelWidth, setPanelWidth] = useState<'small' | 'medium' | 'large'>('small');

  // Function to get all feature flags and their decisions
  const getAllFeatureFlags = () => {
    try {
      // Get the OptimizelyConfig object
      const config = optimizelyClient.getOptimizelyConfig();
      if (!config || !config.featuresMap) {
        console.error('No OptimizelyConfig or featuresMap found');
        return [];
      }

      // Get decisions for enabled flags
      const allDecisions = optimizelyClient.decideAll();
      
      // Create a map of all flags with their decisions
      return Object.entries(config.featuresMap).map(([flagKey, feature]) => {
        const decision = allDecisions[flagKey];
        return {
          key: flagKey,
          feature: feature,
          decision: decision || {
            enabled: false,
            variationKey: 'control',
            variables: null
          }
        };
      });
    } catch (error) {
      console.error('Error getting feature flags from OptimizelyConfig:', error);
    }
    return [];
  };

  // Comprehensive country list with ISO 3166-1 alpha-2 codes
  const countries: Country[] = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Democratic Republic of the Congo', code: 'CD' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'East Timor', code: 'TL' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Eswatini', code: 'SZ' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Greece', code: 'GR' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Ivory Coast', code: 'CI' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia', code: 'FM' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'North Korea', code: 'KP' },
    { name: 'North Macedonia', code: 'MK' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' },
    { name: 'South Sudan', code: 'SS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syria', code: 'SY' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Vatican City', code: 'VA' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ];

  useEffect(() => {
    // Update Optimizely attributes when country or device changes
    // Note: We'll handle reloads manually when user changes values
  }, [country, device]);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  // Set selected country when component mounts or country changes
  useEffect(() => {
    if (country) {
      const foundCountry = countries.find(c => c.code === country);
      setSelectedCountry(foundCountry || null);
    }
  }, [country]);

  const handleCountrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountry && selectedCountry.code !== country) {
      setCountry(selectedCountry.code);
      localStorage.setItem('user_country', selectedCountry.code);
      // Reload to apply new attributes
      window.location.reload();
    }
  };

  const handleCountrySelect = (selectedCountry: Country) => {
    setSelectedCountry(selectedCountry);
    setShowCountryDropdown(false);
    setCountrySearchTerm('');
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
      localStorage.setItem('sidePanelOpen', 'true');
      localStorage.setItem('activeTab', 'flags');
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
          <span style={{ color: '#e6e6e6' }}>{'{'}</span>
          {Object.entries(value).map(([key, val], index, array) => (
            <div key={key} className="json-property" style={indentStyle}>
              <span className="json-key" style={{ color: '#9cdcfe' }}>"{key}"</span>
              <span style={{ color: '#d4d4d4' }}>: </span>
              {typeof val === 'object' ? renderJsonValue(val, indent + 1) : (
                <span className="json-value" style={{ 
                  color: typeof val === 'string' ? '#ce9178' : 
                         typeof val === 'number' ? '#b5cea8' : 
                         typeof val === 'boolean' ? '#569cd6' : '#d4d4d4'
                }}>
                  {typeof val === 'string' ? `"${val}"` : String(val)}
                </span>
              )}
              {index < array.length - 1 && <span style={{ color: '#d4d4d4' }}>,</span>}
            </div>
          ))}
          <div style={{ marginLeft: `${(indent - 1) * 20}px` }}>
            <span style={{ color: '#e6e6e6' }}>{'}'}</span>
          </div>
        </div>
      );
    }
    return (
      <span className="json-value" style={{ 
        fontFamily: 'Courier New',
        color: typeof value === 'string' ? '#ce9178' : 
               typeof value === 'number' ? '#b5cea8' : 
               typeof value === 'boolean' ? '#569cd6' : '#d4d4d4'
      }}>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </span>
    );
  };

  const renderFeatureFlagInfo = (decision: any, flagKey: string) => {
    const isEnabled = decision.enabled;
    const variationKey = decision.variationKey || 'control';
    const borderColor = isEnabled ? '#28a745' : '#dc3545'; // green for enabled, red for disabled
    const textColor = isEnabled ? '#007bff' : '#6c757d'; // blue for enabled, gray for disabled
    const iconClass = isEnabled ? 'fas fa-toggle-on' : 'fas fa-toggle-off';
    
    return (
      <div key={flagKey} className="feature-flag-info mb-4">
        <h4 className="text-primary mb-3" style={{ color: textColor, fontWeight: 'bold' }}>
          <i className={`${iconClass} me-2`}></i>
          {flagKey}
        </h4>
        
        <div className="table-responsive">
          <table className="table table-dark table-sm" style={{ fontSize: '14px' }}>
            <tbody>
              {/* Variation Row */}
              <tr>
                <td style={{ width: '120px', fontWeight: 'bold', color: '#6c757d' }}>Variation:</td>
                <td>
                  <div className="d-flex align-items-center">
                    <code 
                      className={`bg-dark border p-2 rounded me-2`}
                      style={{ 
                        color: isEnabled ? '#28a745' : '#dc3545',
                        borderColor: borderColor
                      }}
                    >
                      {variationKey}
                    </code>
                    <button
                      onClick={handleRegenerateUserId}
                      className="btn btn-sm btn-outline-secondary"
                      title="Regenerate User ID to get new variation assignment"
                      style={{ padding: '4px 8px' }}
                    >
                      <i className="fas fa-sync-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Variables Rows - Only show if flag is enabled */}
              {isEnabled && decision.variables && Object.entries(decision.variables).map(([key, value]) => {
                const isJsonType = typeof value === 'object' && value !== null;
                const variableKey = `${flagKey}_${key}`;
                const isExpanded = expandedJsonVariables[variableKey];
                
                return (
                  <tr key={key}>
                    <td style={{ width: '120px', fontWeight: 'bold', color: '#6c757d' }}>
                      {key}:
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1">
                          {isJsonType && !isExpanded ? (
                            <div 
                              className="d-flex align-items-center cursor-pointer"
                              onClick={() => setExpandedJsonVariables(prev => ({
                                ...prev,
                                [variableKey]: true
                              }))}
                              style={{ 
                                cursor: 'pointer',
                                padding: '8px 12px',
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #666',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                            >
                              <span className="text-muted me-2">[JSON Object]</span>
                              <i className="fas fa-chevron-down text-primary"></i>
                            </div>
                          ) : (
                            <div 
                              className="value-container bg-dark border border-secondary p-2 rounded cursor-pointer"
                              onClick={() => setExpandedJsonVariables(prev => ({
                                ...prev,
                                [variableKey]: !isExpanded
                              }))}
                              style={{ 
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#212529'}
                            >
                              {renderJsonValue(value)}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDemoTab = () => (
    <div className="user-id-wrapper bg-dark p-4 rounded">
      <h3 className="text-white mb-3"><i className="fas fa-fingerprint"/> Your User ID</h3>
      <h6>Used to identify the user and to make bucketing decisions in Optimizely</h6>
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
      <hr/>
      <div className="mb-4">
        <h4 className="text-white mb-3"><i className="fas fa-display"/> Device Type</h4>
        <h6>Passed as 'device' attribute to Optimizely SDK</h6>
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
      <hr/>
      <div className="mb-4">
        <h4 className="text-white mb-3"><i className="fas fa-globe"/> User Country</h4>
        <h6>Passed as 'location' attribute to Optimizely SDK</h6>
        <div className="position-relative">
          <div className="d-flex align-items-center">
            <input
              type="text"
              value={selectedCountry ? `${selectedCountry.name} (${selectedCountry.code})` : ''}
              onClick={() => setShowCountryDropdown(true)}
              placeholder="Select a country..."
              className="form-control bg-dark text-light border-secondary"
              style={{ maxWidth: '300px' }}
              readOnly
            />
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="btn btn-secondary ms-2"
            >
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
          
          {showCountryDropdown && (
            <div className="position-absolute w-100" style={{ 
              top: '100%', 
              zIndex: 1000,
              backgroundColor: '#333',
              border: '1px solid #666',
              borderRadius: '5px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <div className="p-2">
                <input
                  type="text"
                  value={countrySearchTerm}
                  onChange={(e) => setCountrySearchTerm(e.target.value)}
                  placeholder="Search countries..."
                  className="form-control bg-dark text-light border-secondary mb-2"
                  autoFocus
                />
                {filteredCountries.map((country) => (
                                     <div
                     key={country.code}
                     onClick={() => handleCountrySelect(country)}
                     className="p-2 text-light"
                     style={{
                       cursor: 'pointer',
                       borderBottom: '1px solid #444'
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                   >
                    <div className="d-flex justify-content-between">
                      <span>{country.name}</span>
                      <code className="text-secondary">{country.code}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {selectedCountry && (
          <button
            onClick={handleCountrySubmit}
            className="btn btn-primary mt-2"
          >
            <i className="fas fa-check"></i> Apply Country
          </button>
        )}
      </div>
<hr/>
      <div className="mb-4">
        <h4 className="text-white mb-3"><i className="fas fa-user-group"/> Audience Attributes</h4>
        <h6>Passed as 'attributes' to Optimizely SDK for audience targeting</h6>
        <div className="mt-2">
            <small className="text-light">Format: key=value (one per line)</small>
          </div>
        <form onSubmit={handleCustomAttributesSubmit}>
                      <textarea
              value={tempCustomAttributes}
              onChange={handleCustomAttributesChange}
              placeholder="Enter key=value pairs, one per line:&#10;age=25&#10;subscription=premium&#10;language=en"
              className="form-control bg-dark text-light border-secondary"
              rows={6}
              style={{ 
                fontFamily: 'Courier New', 
                fontSize: '16px',
                backgroundColor: '#2a2a2a',
                border: '2px solid #666',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007bff';
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#666';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
              }}
            />

          <button
            type="submit"
            className="btn btn-secondary mt-2"
          >
            <i className="fas fa-check"></i> Apply Attributes
          </button>
        </form>
        
        {customAttributes && (
          <div className="mt-3">
            <h5 className="text-white mb-2">Current Attributes Passed to Optimizely:</h5>
            <div className="bg-dark border border-secondary p-2 rounded" style={{ fontFamily: 'Courier New' }}>
              {customAttributes.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine && trimmedLine.includes('=')) {
                  const [key, value] = trimmedLine.split('=').map(part => part.trim());
                  return (
                    <div key={index} className="text-light">
                      <span style={{ color: '#9cdcfe' }}>"{key}"</span>
                      <span style={{ color: '#d4d4d4' }}>: </span>
                      <span style={{ color: '#ce9178' }}>"{value}"</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>     

    </div>
  );

  const renderAdminTab = () => (
    <div className="admin-wrapper bg-dark p-4 rounded">
      <h3><i className="fas fa-cog"/> Admin Tools</h3>
      
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
        <h4 className="text-white mb-3"><i className="fas fa-magic"/> Feature Flag Generator</h4>
        <p className="text-light mb-3">
          Generate Optimizely feature flags in your own account using the current app configuration.
        </p>
        <FeatureFlagGenerator />
      </div>
    </div>
  );

  const renderFlagsTab = () => {
    const allFeatureFlags = getAllFeatureFlags();
    
    return (
      <div className="flags-wrapper bg-dark p-4 rounded">
        <h3><i className="fas fa-toggle-on"/> Feature Flags</h3>
        <p className="text-light mb-3">
          Current feature flag decisions and their variations for this user.
        </p>
        
        <div className="mt-4">
          {allFeatureFlags.map((flag: any) => (
            <div key={flag.key}>
              {renderFeatureFlagInfo(flag.decision, flag.key)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''} width-${panelWidth}`}>
      <div className="side-panel-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2><i className="fas fa-cog"/> Settings</h2>
          <div className="d-flex align-items-center gap-2">
            
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation mb-4">
          <div className="nav nav-tabs" role="tablist">
            <button
              className={`nav-link ${activeTab === 'demo' ? 'active' : ''}`}
              onClick={() => setActiveTab('demo')}
              style={{
                backgroundColor: activeTab === 'demo' ? '#007bff' : 'transparent',
                color: activeTab === 'demo' ? '#fff' : '#6c757d',
                border: '1px solid #6c757d',
                borderBottom: activeTab === 'demo' ? 'none' : '1px solid #6c757d',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px 5px 0 0'
              }}
            >
              <i className="fas fa-play me-2"></i>
              Demo
            </button>
            <button
              className={`nav-link ${activeTab === 'flags' ? 'active' : ''}`}
              onClick={() => setActiveTab('flags')}
              style={{
                backgroundColor: activeTab === 'flags' ? '#007bff' : 'transparent',
                color: activeTab === 'flags' ? '#fff' : '#6c757d',
                border: '1px solid #6c757d',
                borderBottom: activeTab === 'flags' ? 'none' : '1px solid #6c757d',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px 5px 0 0'
              }}
            >
              <i className="fas fa-toggle-on me-2"></i>
              Flags
            </button>
            <button
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
              style={{
                backgroundColor: activeTab === 'admin' ? '#007bff' : 'transparent',
                color: activeTab === 'admin' ? '#fff' : '#6c757d',
                border: '1px solid #6c757d',
                borderBottom: activeTab === 'admin' ? 'none' : '1px solid #6c757d',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px 5px 0 0'
              }}
            >
              <i className="fas fa-cog me-2"></i>
              Admin
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'demo' && renderDemoTab()}
          {activeTab === 'flags' && renderFlagsTab()}
          {activeTab === 'admin' && renderAdminTab()}
        </div>

        {/* Footer with Width Control Buttons */}
        <div className="side-panel-footer" style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          padding: '0 2rem'
        }}>
          <button
            onClick={() => setPanelWidth('small')}
            className={`btn ${panelWidth === 'small' ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              borderRadius: '6px'
            }}
            title="Small width (650px)"
          >
            <i className="fas fa-desktop" style={{ fontSize: '12px' }}></i>
          </button>
          <button
            onClick={() => setPanelWidth('medium')}
            className={`btn ${panelWidth === 'medium' ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '10px 14px',
              fontSize: '16px',
              borderRadius: '6px'
            }}
            title="Medium width (30% of screen)"
          >
            <i className="fas fa-desktop" style={{ fontSize: '14px' }}></i>
          </button>
          <button
            onClick={() => setPanelWidth('large')}
            className={`btn ${panelWidth === 'large' ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '12px 16px',
              fontSize: '18px',
              borderRadius: '6px'
            }}
            title="Large width (50% of screen)"
          >
            <i className="fas fa-desktop" style={{ fontSize: '16px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel; 