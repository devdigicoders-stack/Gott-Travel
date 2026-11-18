export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  country: string;
  countryAr?: string;
  tagline: string;
  taglineAr?: string;
  description: string;
  descriptionAr?: string;
  image: string;
  tourCount: number;
  isPopular: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  count: number;
}

export interface ItineraryItem {
  time: string;
  title: string;
  desc: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  destinationId: string;
  destinationName: string;
  destinationNameAr?: string;
  categoryId: string;
  categoryName: string;
  categoryNameAr?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: string;
  pickupIncluded: boolean;
  cancellationPolicy: string;
  cancellationPolicyAr?: string;
  badge?: string;
  badgeAr?: string;
  images: string[];
  highlights: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
}

export interface Review {
  id: string;
  author: string;
  country: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  experienceTitle: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export interface CatalogExperience {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  destination: string;
  destinationAr?: string;
  category: string;
  categoryAr?: string;
  duration: string;
  durationBucket: "under-3h" | "3-6h" | "6-12h" | "overnight" | "multiday";
  timeOfDay: "morning" | "afternoon" | "evening" | "overnight";
  price: number;
  originalPrice?: number | null;
  savePercent: number;
  rating: number;
  reviews: number;
  badges: string[];
  departsDubai: boolean;
  image: string;
  bestseller: boolean;
}

export interface SiteConfig {
  brandName: string;
  legalName: string;
  founded: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  currencies: Currency[];
  languages: { code: string; label: string; dir?: string }[];
}
