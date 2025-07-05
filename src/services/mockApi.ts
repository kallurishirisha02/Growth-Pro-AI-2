import { BusinessData } from '@/components/BusinessCard';

// Mock business data generator with realistic ratings and review counts
const generateBusinessData = (name: string, location: string): { rating: number; reviews: number } => {
  // Generate realistic rating (3.5 - 4.9)
  const rating = Math.round((3.5 + Math.random() * 1.4) * 10) / 10;
  
  // Generate realistic review count based on business type and location
  const baseReviews = Math.floor(Math.random() * 500) + 50;
  const locationMultiplier = location.toLowerCase().includes('new york') || 
                            location.toLowerCase().includes('los angeles') || 
                            location.toLowerCase().includes('chicago') ? 1.5 : 1;
  const reviews = Math.floor(baseReviews * locationMultiplier);

  return { rating, reviews };
};

// SEO headline templates with dynamic content
const headlineTemplates = [
  "#{name} in #{location} - Rated #{rating}★ by #{reviews}+ Happy Customers",
  "Top-Rated #{name} in #{location} | #{reviews} Reviews & #{rating}-Star Service",
  "#{location}'s Premier #{name} - #{rating}★ Rating & #{reviews}+ Satisfied Clients",
  "Expert #{name} Services in #{location} | #{rating}-Star Rated with #{reviews} Reviews",
  "#{name} in #{location} - #{reviews}+ Reviews, #{rating}★ Excellence Guaranteed",
  "Professional #{name} in #{location} | #{rating}-Star Service, #{reviews}+ Happy Customers",
  "#{location}'s Trusted #{name} - #{rating}★ Rating from #{reviews}+ Local Reviews",
  "Premium #{name} Services in #{location} | #{rating}★ Rated by #{reviews}+ Customers"
];

const generateHeadline = (name: string, location: string, rating: number, reviews: number): string => {
  const randomTemplate = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  
  return randomTemplate
    .replace(/#{name}/g, name)
    .replace(/#{location}/g, location)
    .replace(/#{rating}/g, rating.toString())
    .replace(/#{reviews}/g, reviews.toLocaleString());
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockApi = {
  // POST /business-data
  getBusinessData: async (name: string, location: string): Promise<BusinessData> => {
    // Simulate network delay
    await delay(1500 + Math.random() * 1000);
    
    const { rating, reviews } = generateBusinessData(name, location);
    const headline = generateHeadline(name, location, rating, reviews);
    
    return {
      name,
      location,
      rating,
      reviews,
      headline
    };
  },

  // GET /regenerate-headline
  regenerateHeadline: async (name: string, location: string, currentRating: number, currentReviews: number): Promise<string> => {
    // Simulate network delay
    await delay(800 + Math.random() * 700);
    
    return generateHeadline(name, location, currentRating, currentReviews);
  }
};

// Error simulation (10% chance)
const shouldSimulateError = () => Math.random() < 0.05;

export const mockApiWithErrors = {
  getBusinessData: async (name: string, location: string): Promise<BusinessData> => {
    if (shouldSimulateError()) {
      throw new Error('Unable to fetch business data. Please try again.');
    }
    return mockApi.getBusinessData(name, location);
  },

  regenerateHeadline: async (name: string, location: string, currentRating: number, currentReviews: number): Promise<string> => {
    if (shouldSimulateError()) {
      throw new Error('Unable to generate new headline. Please try again.');
    }
    return mockApi.regenerateHeadline(name, location, currentRating, currentReviews);
  }
};