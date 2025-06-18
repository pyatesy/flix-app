import { useDecision } from '@optimizely/react-sdk';
import { MovieData } from '../types/theme';
import { movieDatabase, genres, actors } from '../data/movies';

export const useMovieData = () => {
  const [decision] = useDecision('theme_customization');

  // If feature flag is enabled and has movieData variable
  if (decision?.enabled && decision?.variables?.movieData) {
    try {
      const optimizelyMovieData = decision.variables.movieData as MovieData;
   
      // Validate the parsed config has required properties
      if (optimizelyMovieData.movies && optimizelyMovieData.genres && optimizelyMovieData.actors) {
        console.log('🎬 Using Optimizely movie data override');
        return {
          movies: optimizelyMovieData.movies,
          genres: optimizelyMovieData.genres,
          actors: optimizelyMovieData.actors,
        };
      }
    } catch (error) {
      console.warn('❌ Failed to parse Optimizely movie data, using fallback:', error);
    }
  }

  // Fallback to default movie data
  console.log('🎬 Using default movie data');
  return {
    movies: movieDatabase,
    genres: genres,
    actors: actors,
  };
}; 