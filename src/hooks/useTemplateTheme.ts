import { useTemplate } from '../contexts/TemplateContext';
import { useDecision } from '@optimizely/react-sdk';

export const useTemplateTheme = () => {
  const { templateConfig } = useTemplate();
  const [decision] = useDecision('theme_customization');
  
  // Get template-specific theme from Optimizely or fallback to template default
  if (decision?.enabled && decision?.variables?.themeData) {
    try {
      const themeDataString = decision.variables.themeData as string;
      const optimizelyTheme = JSON.parse(themeDataString);
      return optimizelyTheme;
    } catch (error) {
      console.warn('Failed to parse template theme data');
    }
  }
  
  return templateConfig.themeConfig;
}; 