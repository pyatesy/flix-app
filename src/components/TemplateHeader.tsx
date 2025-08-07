import React from 'react';
import TemplateComponentLoader from './TemplateComponentLoader';

const TemplateHeader: React.FC = () => {
  return (
    <TemplateComponentLoader 
      componentType="header" 
      fallback={<div className="header-loading">Loading header...</div>} 
    />
  );
};

export default TemplateHeader; 