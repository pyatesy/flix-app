export interface Movie {
  id: number;
  title: string;
  slug: string;
  image: string;
  duration: string;
  quality: string;
  genre?: string;
  genres: number[];  // Array of genre IDs
  rating?: string;
  year?: string;
  number?: string;
  order?: string;
  likes?: number;
  hearts?: number;
  recentlyViewed?: Date;
  featured?: boolean;
  largeImage?: string;
  heroImage?: string;
  description?: string;
  language?: string[];
  director?: string[];
  cast?: number[]; //array of actor ids
  production?: string[];
  linkToVideo?: string;
}

export interface Actor {
  id: number;
  name: string;
  image: string;
}

export interface FeaturedMovie extends Movie {
  likes: number;
  hearts: number;
  description: string;
}

export interface HeroMovie extends Movie {
  isMain?: boolean;
  largeImage?: string;
}

export interface Category {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  link: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  slug: string;
  image?: string;
}

