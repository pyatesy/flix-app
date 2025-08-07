import { useDecision } from '@optimizely/react-sdk';
import { solutions, caseStudies, Solution, CaseStudy } from '../data/b2b/solutions';

export interface B2BData {
  solutions: Solution[];
  caseStudies: CaseStudy[];
}

export const useB2BData = (): B2BData => {
  const [decision] = useDecision('b2b_data_customization');

  // If feature flag is enabled and has b2bData variable
  if (decision?.enabled && decision?.variables?.b2bData) {
    try {
      const optimizelyB2BData = decision.variables.b2bData as any;
   
      // Validate the parsed config has required properties
      if (optimizelyB2BData.solutions && optimizelyB2BData.caseStudies) {
        console.log('🏢 Using Optimizely B2B data override');
        return {
          solutions: optimizelyB2BData.solutions,
          caseStudies: optimizelyB2BData.caseStudies,
        };
      }
    } catch (error) {
      console.warn('❌ Failed to parse Optimizely B2B data, using fallback:', error);
    }
  }

  // Fallback to default B2B data
  console.log('🏢 Using default B2B data');
  return {
    solutions: solutions,
    caseStudies: caseStudies,
  };
};