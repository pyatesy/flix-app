export interface Solution {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  pricing: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  company: string;
  industry: string;
  image: string;
  description: string;
  results: string[];
  featured?: boolean;
}

export const solutions: Solution[] = [
  {
    id: 1,
    name: "Enterprise Analytics Platform",
    slug: "enterprise-analytics-platform",
    description: "Comprehensive analytics solution for enterprise data insights",
    image: "/assets/img/solutions/analytics.jpg",
    category: "Analytics",
    features: ["Real-time dashboards", "Advanced reporting", "Data visualization", "Custom integrations"],
    pricing: "Contact Sales",
    featured: true
  },
  {
    id: 2,
    name: "Cloud Infrastructure Management",
    slug: "cloud-infrastructure-management",
    description: "Streamlined cloud infrastructure management and optimization",
    image: "/assets/img/solutions/cloud.jpg",
    category: "Infrastructure",
    features: ["Multi-cloud support", "Cost optimization", "Security compliance", "Automated scaling"],
    pricing: "Contact Sales",
    featured: true
  },
  {
    id: 3,
    name: "Customer Relationship Management",
    slug: "customer-relationship-management",
    description: "Complete CRM solution for modern businesses",
    image: "/assets/img/solutions/crm.jpg",
    category: "Sales",
    features: ["Lead management", "Sales automation", "Customer insights", "Mobile access"],
    pricing: "Contact Sales"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Global Retail Chain Transformation",
    slug: "global-retail-chain-transformation",
    company: "RetailCorp",
    industry: "Retail",
    image: "/assets/img/case-studies/retail.jpg",
    description: "How RetailCorp increased efficiency by 40% with our analytics platform",
    results: ["40% increase in operational efficiency", "25% reduction in costs", "Improved customer satisfaction"],
    featured: true
  },
  {
    id: 2,
    title: "Financial Services Innovation",
    slug: "financial-services-innovation",
    company: "FinTech Solutions",
    industry: "Financial Services",
    image: "/assets/img/case-studies/fintech.jpg",
    description: "FinTech Solutions achieved 60% faster time-to-market with our cloud platform",
    results: ["60% faster time-to-market", "Enhanced security compliance", "Scalable infrastructure"],
    featured: true
  }
]; 