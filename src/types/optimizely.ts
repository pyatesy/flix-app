export interface OptimizelyPricingData {
  plans: {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    free_trial: boolean;
    free_trial_duration: number;
    features: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
} 