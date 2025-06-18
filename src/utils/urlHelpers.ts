import { Movie } from '../types/movie';

/**
 * Converts a movie title into a URL-friendly slug
 * @param title The movie title to encode
 * @returns URL-friendly slug
 * 
 * Example:
 * "Mission: Impossible - Final Reckoning" -> "mission-impossible-final-reckoning"
 */
export const encodeMovieTitle = (title: string): string => {
  return title
    .toLowerCase()
    // Replace special characters and spaces with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Converts a URL slug back to a movie title
 * @param slug The URL slug to decode
 * @returns The original movie title
 * 
 * Note: This is a simple implementation that just replaces hyphens with spaces
 * and capitalizes words. For a more accurate restoration, you would need to
 * maintain a mapping of slugs to original titles.
 */
export const decodeMovieTitle = (slug: string): string => {
  // First, let's find the original title from our movie database
  const movieDatabase = require('../data/movies').movieDatabase as Movie[];
  
  // Try to find a movie where the encoded title matches our slug
  const originalMovie = movieDatabase.find((movie: Movie) => 
    encodeMovieTitle(movie.title) === slug
  );
  
  // If we found the movie, return its original title
  if (originalMovie) {
    return originalMovie.title;
  }
  
  // Fallback: if we can't find the original title, just capitalize the words
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}; 