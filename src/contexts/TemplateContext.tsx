import React, { createContext, useContext, useState, useEffect } from 'react';
import { TemplateContextType } from '../types/template';
import { templateConfigs, TEMPLATES } from '../templates/config/templateConfigs';
import { TemplateOptimizelyManager } from '../utils/templateOptimizelyManager';
import { TemplateSdkManager } from '../utils/templateSdkManager';

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [activeTemplate, setActiveTemplate] = useState(() => {
    // Get from localStorage or URL parameter
    return localStorage.getItem('activeTemplate') || TEMPLATES.STREAMING;
  });

  const [templateVersion, setTemplateVersion] = useState(0);

  const templateConfig = templateConfigs[activeTemplate as keyof typeof templateConfigs];

  const setTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    localStorage.setItem('activeTemplate', templateId);
    
    // Update the active template in the SDK manager
    TemplateSdkManager.setActiveTemplate(templateId);
    
    // Update the default client in the Optimizely manager
    TemplateOptimizelyManager.updateDefaultClient();
    
    // Force a re-render by updating template version
    setTemplateVersion(prev => prev + 1);
  };

  const isTemplateActive = (templateId: string) => activeTemplate === templateId;

  // Initialize the active template in the SDK manager on mount
  useEffect(() => {
    TemplateSdkManager.setActiveTemplate(activeTemplate);
    TemplateOptimizelyManager.updateDefaultClient();
  }, []);

  return (
    <TemplateContext.Provider value={{
      activeTemplate,
      templateConfig,
      setTemplate,
      isTemplateActive,
      templateVersion
    }}>
      {children}
    </TemplateContext.Provider>
  );
}; 