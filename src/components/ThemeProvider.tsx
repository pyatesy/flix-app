import React, { useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeConfig = useThemeConfig();

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply font family
    root.style.setProperty('--font-family', themeConfig.fonts.family);

    // Apply box shadow
    root.style.setProperty('--box-shadow', themeConfig.shadows.boxShadow);

    // Store theme assets in CSS custom properties for use in components
    root.style.setProperty('--logo-url', `url(${themeConfig.assets.logoUrl})`);
    root.style.setProperty('--breadcrumb-bg-url', `url(${themeConfig.assets.breadcrumbBackgroundUrl})`);

  }, [themeConfig]);

  return <>{children}</>;
};

export default ThemeProvider; 