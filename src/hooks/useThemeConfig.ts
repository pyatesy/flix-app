import { useDecision } from '@optimizely/react-sdk';
import { ThemeConfig, OptimizelyThemeData } from '../types/theme';
import { defaultThemeConfig } from '../config/themeConfig';

export const useThemeConfig = (): ThemeConfig => {
  const [decision] = useDecision('theme_customization');

  // If feature flag is enabled and has themeData variable
  if (decision?.enabled && decision?.variables?.themeData) {
    try {
      const optimizelyThemeConfig = decision.variables.themeData as ThemeConfig;
      //const optimizelyThemeConfig: ThemeConfig = themeDataString;
      
      // Validate the parsed config has required properties
      if (optimizelyThemeConfig.colors && optimizelyThemeConfig.assets) {
        return optimizelyThemeConfig;
      }
    } catch (error) {
      console.warn('Failed to parse Optimizely theme data, falling back to default:', error);
    }
  }

  // Fall back to default config
  return defaultThemeConfig;
}; 