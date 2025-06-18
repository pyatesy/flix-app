import { encodeMovieTitle, decodeMovieTitle } from '../utils/urlHelpers';

export const useMovieUrl = () => {
  return {
    /**
     * Converts a movie title into a URL-friendly slug
     * @param title The movie title to encode
     * @returns URL-friendly slug
     */
    encodeTitle: encodeMovieTitle,

    /**
     * Converts a URL slug back to a movie title
     * @param slug The URL slug to decode
     * @returns The original movie title
     */
    decodeTitle: decodeMovieTitle,

    /**
     * Creates a full movie URL path
     * @param title The movie title
     * @returns Full URL path (e.g., "/movie/mission-impossible-final-reckoning")
     */
    getMoviePath: (slug: string) => `/movie/${(slug)}`
  };
}; 