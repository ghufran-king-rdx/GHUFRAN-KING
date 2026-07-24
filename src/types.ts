export interface Service {
  id: string;
  title: string;
  category: 'development' | 'marketing' | 'hosting' | 'design' | 'automation';
  categoryLabel: string;
  iconName: string; // Lucide icon identifier
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  pricingStarting: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Website' | 'E-commerce' | 'Digital Marketing' | 'Graphic Design' | 'AI Solutions';
  client: string;
  thumbnail: string;
  description: string;
  results: string;
  tags: string[];
  liveUrl?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  badge?: string;
  popular?: boolean;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  serviceUsed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Development' | 'Marketing' | 'Hosting & Domains' | 'AI & WhatsApp';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  budget: string;
  message: string;
}

export interface AgencyStats {
  projectsCompleted: number;
  happyClients: number;
  supportAvailability: string;
  clientRetention: number;
}
