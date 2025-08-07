import { useFeatureFlag } from './useFeatureFlag';
import { useTemplate } from '../contexts/TemplateContext';

export const useTemplateFeatureFlag = (featureKey: string) => {
  const { templateConfig } = useTemplate();
  const { isEnabled, variables } = useFeatureFlag(featureKey);
  
  // Only enable flags that belong to the current template
  const isTemplateFlag = templateConfig.featureFlags.includes(featureKey);
  
  return {
    isEnabled: isEnabled && isTemplateFlag,
    variables,
    isTemplateFlag
  };
}; 