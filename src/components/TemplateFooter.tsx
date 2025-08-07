import React from 'react';
import TemplateComponentLoader from './TemplateComponentLoader';

const TemplateFooter: React.FC = () => {
  return (
    <TemplateComponentLoader 
      componentType="footer" 
      fallback={<div className="footer-loading">Loading footer...</div>} 
    />
  );
};

export default TemplateFooter; 