// Re-export B2B types from data layer
export type { Solution, CaseStudy } from '../../data/b2b/solutions';
import type { Solution } from '../../data/b2b/solutions';

// Additional B2B specific types
export interface B2BBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
  highlighted?: boolean;
}

export interface B2BHeroProps {
  solution?: Solution;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

export interface B2BBenefitsProps {
  benefits?: B2BBenefit[];
}