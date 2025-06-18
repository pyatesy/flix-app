import { useDecision } from '@optimizely/react-sdk';
import optimizelyClient from '../config/optimizely';

export const useFeatureFlag = (featureKey: string) => {
  const [decision] = useDecision(featureKey);

  return {
    isEnabled: decision.enabled,
    variables: decision.variables
  };
}; 