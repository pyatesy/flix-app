import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, useUserId } from './contexts/UserContext';
import { TemplateProvider } from './contexts/TemplateContext';
import DynamicOptimizelyProvider from './components/DynamicOptimizelyProvider';
import TemplateHeader from './components/TemplateHeader';
import TemplateFooter from './components/TemplateFooter';
import TemplateRouter from './components/TemplateRouter';
import TemplateSwitcher from './components/TemplateSwitcher';
import { LoadingOverlay, RegionOverlay, ThemeProvider, TVScreenWrapper, MobileScreenWrapper } from './components/shared';
import OfferBanner from './components/OfferBanner';
import './styles/filters.css';

const AppContent: React.FC = () => {
  const { userId } = useUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizelyReady, setIsOptimizelyReady] = useState(false);
  const device = localStorage.getItem('device') || 'browser';
  const isTVMode = device === 'tv';
  const isMobileMode = device === 'mobile';

  useEffect(() => {
    // Add cursor elements to the DOM
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);

    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);

    // Cleanup on unmount
    return () => {
      if (cursorInner.parentNode) document.body.removeChild(cursorInner);
      if (cursorOuter.parentNode) document.body.removeChild(cursorOuter);
    };
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Note: We don't need to wait for optimizelyClient.onReady() here anymore
        // since the DynamicOptimizelyProvider handles client creation
        setIsOptimizelyReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading || !isOptimizelyReady) {
    return <LoadingOverlay />;
  }

  const appContent = (
    <Router>
      <div className="body-bg">
        <TemplateHeader />
        <OfferBanner />
        <main>
          <TemplateRouter />
        </main>
        <TemplateFooter />
        <div id="back-top">
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <RegionOverlay />
      </div>
    </Router>
  );

  return (
    <TVScreenWrapper isTVMode={isTVMode}>
      <MobileScreenWrapper isMobileMode={isMobileMode}>
        {appContent}
      </MobileScreenWrapper>
    </TVScreenWrapper>
  );
};

const App: React.FC = () => {
  // Parse custom attributes from localStorage
  const parseCustomAttributes = () => {
    const customAttributesStr = localStorage.getItem('custom_attributes') || '';
    const attributes: Record<string, string> = {};
    
    if (customAttributesStr.trim()) {
      customAttributesStr.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes('=')) {
          const [key, value] = trimmedLine.split('=').map(part => part.trim());
          if (key && value) {
            attributes[key] = value;
          }
        }
      });
    }
    
    return attributes;
  };

  const customAttributes = parseCustomAttributes();

  return (
    <UserProvider>
      <TemplateProvider>
        <DynamicOptimizelyProvider
          user={{
            id: localStorage.getItem('userId') || '',
            attributes: {
              device: localStorage.getItem('device') || '',
              browser: localStorage.getItem('browser') || '',
              os: localStorage.getItem('os') || '',
              location: localStorage.getItem('user_country') || '',
              ...customAttributes, // Spread custom attributes
            }
          }}
        >
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </DynamicOptimizelyProvider>
      </TemplateProvider>
    </UserProvider>
  );
};

export default App;
