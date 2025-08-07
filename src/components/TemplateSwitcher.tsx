import React from 'react';
import { useTemplate } from '../contexts/TemplateContext';
import { templateConfigs } from '../templates/config/templateConfigs';

const TemplateSwitcher: React.FC = () => {
  const { activeTemplate, setTemplate } = useTemplate();
  
  return (
    <div className="template-switcher" style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '5px',
      color: 'white'
    }}>
      <label htmlFor="template-select" style={{ marginRight: '10px' }}>
        Template:
      </label>
      <select 
        id="template-select"
        value={activeTemplate} 
        onChange={(e) => setTemplate(e.target.value)}
        style={{
          background: '#333',
          color: 'white',
          border: '1px solid #555',
          borderRadius: '3px',
          padding: '5px'
        }}
      >
        {Object.entries(templateConfigs).map(([id, config]) => (
          <option key={id} value={id}>
            {config.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSwitcher; 