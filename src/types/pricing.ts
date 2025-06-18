export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  free_trial: boolean;
  free_trial_duration: number;
  features: string[];
}

export interface PricingData {
  plans: PricingPlan[];
  faq: {
    question: string;
    answer: string;
  }[];
} 