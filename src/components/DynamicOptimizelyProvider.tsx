import React, { useState, useEffect } from 'react';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { createInstance } from '@optimizely/react-sdk';
import { TemplateSdkManager } from '../utils/templateSdkManager';
import { useTemplate } from '../contexts/TemplateContext';

interface DynamicOptimizelyProviderProps {
  children: React.ReactNode;
  user: {
    id: string;
    attributes: Record<string, string>;
  };
}

const DynamicOptimizelyProvider: React.FC<DynamicOptimizelyProviderProps> = ({ 
  children, 
  user 
}) => {
  const { activeTemplate, templateVersion } = useTemplate();
  const [optimizelyClient, setOptimizelyClient] = useState(() => {
    const sdkKey = TemplateSdkManager.getTemplateSdkKey(activeTemplate);
    console.log(`🎯 Creating Optimizely client for template: ${activeTemplate} with SDK key: ${sdkKey.substring(0, 10)}...`);
    return createInstance({
      sdkKey,
      datafileOptions: {
        autoUpdate: true,
        updateInterval: 6000,
      },
    });
  });

  // Update client when template changes
  useEffect(() => {
    const sdkKey = TemplateSdkManager.getTemplateSdkKey(activeTemplate);
    console.log(`🔄 Updating Optimizely client for template: ${activeTemplate} with SDK key: ${sdkKey.substring(0, 10)}...`);
    const newClient = createInstance({
      sdkKey,
      datafileOptions: {
        autoUpdate: true,
        updateInterval: 6000,
      },
    });
    setOptimizelyClient(newClient);
  }, [activeTemplate, templateVersion]);

  return (
    <OptimizelyProvider
      optimizely={optimizelyClient}
      user={user}
    >
      {children}
    </OptimizelyProvider>
  );
};

export default DynamicOptimizelyProvider; 