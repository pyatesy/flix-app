import { useDecision } from '@optimizely/react-sdk';
import { ThemeConfig } from '../types/theme';
import { defaultThemeConfig } from '../config/themeConfig';

export const useThemeConfig = (): ThemeConfig => {
  const [decision] = useDecision('theme_customization');
  
  // If feature flag is enabled and has themeData variable
  if (decision?.enabled && decision?.variables?.themeData) {
    try {
      // Parse the JSON string from Optimizely
      const themeData = decision.variables.themeData;
      const optimizelyThemeConfig = themeData as ThemeConfig;
      
      // Validate the parsed config has required properties
      if (optimizelyThemeConfig.colors && optimizelyThemeConfig.assets) {
        // Merge with default config to ensure all properties are present
        const mergedConfig: ThemeConfig = {
          // Start with default config
          ...defaultThemeConfig,
          
          // Merge colors (Optimizely overrides defaults)
          colors: {
            ...defaultThemeConfig.colors,
            ...optimizelyThemeConfig.colors,
          },
          
          // Merge assets (Optimizely overrides defaults)
          assets: {
            ...defaultThemeConfig.assets,
            ...optimizelyThemeConfig.assets,
          },
          
          // Merge optional typography (use Optimizely if present, otherwise defaults)
          typography: optimizelyThemeConfig.typography || defaultThemeConfig.typography,
          
          // Merge optional spacing (use Optimizely if present, otherwise defaults)
          spacing: optimizelyThemeConfig.spacing || defaultThemeConfig.spacing,
          
          // Merge optional border radius (use Optimizely if present, otherwise defaults)
          borderRadius: optimizelyThemeConfig.borderRadius || defaultThemeConfig.borderRadius,
          
          // Merge optional shadows (use Optimizely if present, otherwise defaults)
          shadows: optimizelyThemeConfig.shadows || defaultThemeConfig.shadows,
          
          // Merge other optional properties
          overrides: optimizelyThemeConfig.overrides || defaultThemeConfig.overrides,
          menu: optimizelyThemeConfig.menu || defaultThemeConfig.menu,
          
          // Backward compatibility for fonts
          fonts: optimizelyThemeConfig.fonts || defaultThemeConfig.fonts,
        };
        
        return mergedConfig;
      }
    } catch (error) {
      console.warn('Failed to parse Optimizely theme data, falling back to default:', error);
    }
  }
  
  // Fall back to default config
  return defaultThemeConfig;
}; 