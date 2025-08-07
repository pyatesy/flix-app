import React, { useEffect } from 'react';
import { useThemeConfig } from '../../hooks/useThemeConfig';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeConfig = useThemeConfig();

  useEffect(() => {
    console.log('🎨 ThemeProvider applying theme config:', themeConfig);
    
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for CSS variables
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssKey}`, value);
      console.log(`🎨 Applied CSS variable --${cssKey}: ${value}`);
    });

    // Apply font family (for backward compatibility)
    if (themeConfig.fonts?.family) {
      root.style.setProperty('--font-family', themeConfig.fonts.family);
    }

    // Apply typography variables (with defaults if not present)
    if (themeConfig.typography) {
      Object.entries(themeConfig.typography).forEach(([key, value]) => {
        const cssKey = key === 'fontFamily' ? 'font-family' : 
                      key === 'fontFamilyBase' ? 'font-family-base' :
                      key === 'fontSizeBase' ? 'font-size-base' :
                      key === 'lineHeightBase' ? 'line-height-base' :
                      key === 'fontSizeH1' ? 'font-size-h1' :
                      key === 'fontSizeH2' ? 'font-size-h2' :
                      key === 'fontSizeH3' ? 'font-size-h3' :
                      key === 'fontSizeH4' ? 'font-size-h4' :
                      key === 'fontSizeH5' ? 'font-size-h5' :
                      key === 'fontSizeH6' ? 'font-size-h6' :
                      key === 'fontSizeUp1' ? 'font-size-up-1' :
                      key === 'fontSizeUp2' ? 'font-size-up-2' :
                      key === 'fontSizeUp3' ? 'font-size-up-3' :
                      key === 'fontSizeUp4' ? 'font-size-up-4' :
                      key === 'fontSizeUp5' ? 'font-size-up-5' :
                      key === 'fontSizeUp6' ? 'font-size-up-6' : key;
        root.style.setProperty(`--${cssKey}`, String(value));
      });
    } else {
      // Apply default typography values
      root.style.setProperty('--font-family', '"Barlow Condensed", sans-serif');
      root.style.setProperty('--font-family-base', '"Barlow Condensed", BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif');
      root.style.setProperty('--font-size-base', '1rem');
      root.style.setProperty('--line-height-base', '1.5');
      root.style.setProperty('--font-size-h1', '72px');
      root.style.setProperty('--font-size-h2', '40px');
      root.style.setProperty('--font-size-h3', '24px');
      root.style.setProperty('--font-size-h4', '20px');
      root.style.setProperty('--font-size-h5', '18px');
      root.style.setProperty('--font-size-h6', '16px');
      root.style.setProperty('--font-size-up-1', '1.5rem');
      root.style.setProperty('--font-size-up-2', '2rem');
      root.style.setProperty('--font-size-up-3', '2.5rem');
      root.style.setProperty('--font-size-up-4', '3rem');
      root.style.setProperty('--font-size-up-5', '3.5rem');
      root.style.setProperty('--font-size-up-6', '4rem');
    }

    // Apply spacing variables (with defaults if not present)
    if (themeConfig.spacing) {
      Object.entries(themeConfig.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    } else {
      // Apply default spacing values
      root.style.setProperty('--spacing-xs', '0.25rem');
      root.style.setProperty('--spacing-sm', '0.5rem');
      root.style.setProperty('--spacing-md', '1rem');
      root.style.setProperty('--spacing-lg', '1.5rem');
      root.style.setProperty('--spacing-xl', '3rem');
    }

    // Apply border radius variables (with defaults if not present)
    if (themeConfig.borderRadius) {
      Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
        const cssKey = key === 'default' ? 'border-radius' : `border-radius-${key}`;
        root.style.setProperty(`--${cssKey}`, value);
      });
    } else {
      // Apply default border radius values
      root.style.setProperty('--border-radius', '0.375rem');
      root.style.setProperty('--border-radius-lg', '0.5rem');
      root.style.setProperty('--border-radius-sm', '0.25rem');
    }

    // Apply shadow variables (with defaults if not present)
    if (themeConfig.shadows) {
      Object.entries(themeConfig.shadows).forEach(([key, value]) => {
        const cssKey = key === 'default' ? 'box-shadow' : `box-shadow-${key}`;
        root.style.setProperty(`--${cssKey}`, value);
      });
    } else {
      // Apply default shadow values
      root.style.setProperty('--box-shadow', '0px 1px 14px 0px rgba(0, 0, 0, 0.13)');
      root.style.setProperty('--box-shadow-lg', '0 0.5rem 1rem rgba(0, 0, 0, 0.15)');
      root.style.setProperty('--box-shadow-bootstrap', '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)');
    }

    // Store theme assets in CSS custom properties for use in components
    root.style.setProperty('--logo-url', `url(${themeConfig.assets.logoUrl})`);
    root.style.setProperty('--breadcrumb-bg-url', `url(${themeConfig.assets.breadcrumbBackgroundUrl})`);

    if('title' in themeConfig.assets){
      document.title = `${themeConfig.assets.title}`;
    }else{
      document.title = 'Optimizely - Demo Environments';
    }

    if('faviconUrl' in themeConfig.assets && themeConfig.assets.faviconUrl){
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if(link){
        link.href = themeConfig.assets.faviconUrl ? String(themeConfig.assets.faviconUrl) : '';
      }else{
        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = themeConfig.assets.faviconUrl ? String(themeConfig.assets.faviconUrl) : '';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }, [themeConfig]);

  return <>{children}</>;
};

export default ThemeProvider; 