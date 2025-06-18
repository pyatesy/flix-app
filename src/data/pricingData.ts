import { PricingData } from '../types/pricing';

export const pricingData: PricingData = {
  plans: [
    {
      name: "Basic Plan",
      description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      free_trial: true,
      free_trial_duration: 7,
      features: [
        "HD Available",
        "Watch on Mobile & Tablet",
        "Movies & TV Shows",
        "Cancel Anytime",
        "First Month Free"
      ]
    },
    {
      name: "Standard Plan",
      description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      monthlyPrice: 12.99,
      yearlyPrice: 129.99,
      free_trial: false,
      free_trial_duration: 7,
      features: [
        "Full HD Available",
        "Watch on Mobile & Tablet",
        "Movies & TV Shows",
        "Cancel Anytime",
        "First Month Free",
        "Exclusive Content"
      ]
    },
    {
      name: "Premium Plan",
      description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      monthlyPrice: 14.99,
      yearlyPrice: 149.99,
      free_trial: false,
      free_trial_duration: 7,
      features: [
        "Ultra HD Available",
        "Watch on Mobile & Tablet",
        "Movies & TV Shows",
        "Cancel Anytime",
        "First Month Free",
        "Exclusive Content",
        "Offline Viewing"
      ]
    }
  ],
  faq: [
    {
      question: "What is WowTube?",
      answer: "Why doesn't Netflix, Hulu, or any streaming service have every show and movie available for streaming? Because of licensing rights. A streaming service has to pay for the right to stream movies and TV shows, or in some cases, entire libraries of movies and TV shows."
    },
    {
      question: "How much does TicsTube cost?",
      answer: "Why doesn't Netflix, Hulu, or any streaming service have every show and movie available for streaming? Because of licensing rights. A streaming service has to pay for the right to stream movies and TV shows, or in some cases, entire libraries of movies and TV shows."
    },
    {
      question: "What content is available on TicsTube?",
      answer: "Why doesn't Netflix, Hulu, or any streaming service have every show and movie available for streaming? Because of licensing rights. A streaming service has to pay for the right to stream movies and TV shows, or in some cases, entire libraries of movies and TV shows."
    }
  ]
}; 