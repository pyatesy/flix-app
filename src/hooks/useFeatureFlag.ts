import { useDecision } from '@optimizely/react-sdk';

export const useFeatureFlag = (featureKey: string) => {
  const [decision] = useDecision(featureKey);
  
  return {
    isEnabled: decision?.enabled || false,
    variables: decision?.variables || null,
    variationKey: decision?.variationKey || null
  };
}; 