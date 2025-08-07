import React, { Suspense, lazy } from 'react';
import { useTemplate } from '../contexts/TemplateContext';

interface TemplateComponentLoaderProps {
  componentType: 'header' | 'footer';
  fallback?: React.ReactNode;
}

const TemplateComponentLoader: React.FC<TemplateComponentLoaderProps> = ({ 
  componentType, 
  fallback = <div>Loading...</div> 
}) => {
  const { activeTemplate } = useTemplate();

  // Define component mappings for each template
  const componentMappings = {
    streaming: {
      header: () => import('./streaming/Header'),
      footer: () => import('./streaming/Footer')
    },
    retail: {
      header: () => import('./retail/Header'),
      footer: () => import('./retail/Footer')
    },
    b2b: {
      header: () => import('./b2b/Header'),
      footer: () => import('./b2b/Footer')
    }
  };

  // Get the component import function for the current template and component type
  const getComponentImport = () => {
    const templateComponents = componentMappings[activeTemplate as keyof typeof componentMappings];
    if (templateComponents && templateComponents[componentType]) {
      return templateComponents[componentType];
    }
    
    // Fallback to shared components if template-specific component doesn't exist
    return () => import(`./shared/${componentType === 'header' ? 'Header' : 'Footer'}`);
  };

  const Component = lazy(getComponentImport());

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

export default TemplateComponentLoader; 