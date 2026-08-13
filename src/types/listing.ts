export type ListingCategory =
  | 'all'
  | 'cabins'
  | 'villas'
  | 'treehouses'
  | 'beachfront'
  | 'tiny'
  | 'luxury'
  | 'lake'
  | 'mountains';

export interface CategoryInfo {
  id: ListingCategory;
  label: string;
  icon: string; // Lucide icon name reference
  description: string;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  isSuperhost: boolean;
  responseRate: string;
  joinedDate: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  propertyType: string;
  location: Location;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  images: string[];
  description: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  host: Host;
  amenities: string[];
  reviews: Review[];
  badge?: string;
  isFavorite?: boolean;
}

export interface SearchFilterState {
  location: string;
  category: ListingCategory;
  checkIn: string;
  checkOut: string;
  guests: number;
  showTaxes: boolean;
  viewMode: 'grid' | 'map';
}
