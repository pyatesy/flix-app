import React from 'react';
import { Link } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import FeaturedMovies from '../components/FeaturedMovies';
import Hero from '../components/Hero';
import Genre from '../components/Genre';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import { useMovieData } from '../hooks/useMovieData';
import { useThemeConfig } from '../hooks/useThemeConfig';

//import { generateUserId } from '../utils/userId';

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [decision] = useDecision('dragon-recommendation-2');
  const { movies: movieDatabase, genres } = useMovieData();
  const themeConfig = useThemeConfig();

  return (
    <div className="main-content">    
      {/* Hero Section */}
      <Hero mainMovies={movieDatabase
        .filter(movie => movie.featured === true)
        .filter(movie => {
          const genreExclude = themeConfig.overrides?.genreExcludeHeroTrending;
          if (genreExclude && genreExclude.length > 0) {
            const movieGenres = movie.genres.map((genreId: number) => 
              genres.find((g: any) => g.id === genreId)?.name
            ).filter(Boolean);
            return !movieGenres.some((genreName: string) => 
              genreExclude.includes(genreName)
            );
          }
          return true;
        })
        .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0,2)} 
      sliderMovies={movieDatabase
        .filter(movie => movie.featured === true)
        .filter(movie => {
          const genreExclude = themeConfig.overrides?.genreExcludeHeroTrending;
          if (genreExclude && genreExclude.length > 0) {
            const movieGenres = movie.genres.map((genreId: number) => 
              genres.find((g: any) => g.id === genreId)?.name
            ).filter(Boolean);
            return !movieGenres.some((genreName: string) => 
              genreExclude.includes(genreName)
            );
          }
          return true;
        })
        .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(2)} 
      trendingMovies={movieDatabase
        .filter(movie => movie.trending === true)
        .filter(movie => {
          const genreExclude = themeConfig.overrides?.genreExcludeHeroTrending;
          if (genreExclude && genreExclude.length > 0) {
            const movieGenres = movie.genres.map((genreId: number) => 
              genres.find((g: any) => g.id === genreId)?.name
            ).filter(Boolean);
            return !movieGenres.some((genreName: string) => 
              genreExclude.includes(genreName)
            );
          }
          return true;
        })
        .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0,1)} 
      />
      
      {/* Recommended Movies Section */}
      <section className="upcoming-movie-section fix section-padding">
        <div className="container-fluid">
          {decision.variationKey === 'dreamfyre' && (
            <MovieSlider 
              movies={movieDatabase
                .filter(movie => movie.genres.includes(1) || movie.genres.includes(3))
                .filter(movie => {
                  const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                  if (genreExclude && genreExclude.length > 0) {
                    const movieGenres = movie.genres.map((genreId: number) => 
                      genres.find((g: any) => g.id === genreId)?.name
                    ).filter(Boolean);
                    return !movieGenres.some((genreName: string) => 
                      genreExclude.includes(genreName)
                    );
                  }
                  return true;
                })
                .sort((a, b) => a.title.localeCompare(b.title))} 
              genres={genres.filter((genre: any) => {
                const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                if (genreExclude && genreExclude.length > 0) {
                  return !genreExclude.includes(genre.name);
                }
                return true;
              })} 
              title="Dreamfyre's Recommendations" 
              sliderId='dreamfyre-recommendations'
            />
          )}
          {decision.variationKey === 'vermax' && (
            <MovieSlider 
              movies={movieDatabase
                .filter(movie => movie.genres.includes(2) || movie.genres.includes(4))
                .filter(movie => {
                  const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                  if (genreExclude && genreExclude.length > 0) {
                    const movieGenres = movie.genres.map((genreId: number) => 
                      genres.find((g: any) => g.id === genreId)?.name
                    ).filter(Boolean);
                    return !movieGenres.some((genreName: string) => 
                      genreExclude.includes(genreName)
                    );
                  }
                  return true;
                })
                .sort((b, a) => a.title.localeCompare(b.title))} 
              genres={genres.filter((genre: any) => {
                const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                if (genreExclude && genreExclude.length > 0) {
                  return !genreExclude.includes(genre.name);
                }
                return true;
              })} 
              title="Vermax's Picks" 
              sliderId='vermax-picks'
            />
          )}
          {decision.variationKey === 'on' && (
            <MovieSlider 
              movies={movieDatabase
                .filter(movie => {
                  const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                  if (genreExclude && genreExclude.length > 0) {
                    const movieGenres = movie.genres.map((genreId: number) => 
                      genres.find((g: any) => g.id === genreId)?.name
                    ).filter(Boolean);
                    return !movieGenres.some((genreName: string) => 
                      genreExclude.includes(genreName)
                    );
                  }
                  return true;
                })
                .sort((a, b) => (b.recentlyViewed?.getTime() || 0) - (a.recentlyViewed?.getTime() || 0))} 
              genres={genres.filter((genre: any) => {
                const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                if (genreExclude && genreExclude.length > 0) {
                  return !genreExclude.includes(genre.name);
                }
                return true;
              })} 
              title="Recommended Movies" 
              sliderId='recommended-movies'
            />
          )}
        </div>
      </section>

      {/* TV Shows Section */}
      <section className="movie-section style-2 section-padding fix">
        <div className="container-fluid">
          <Genre />
        </div>
      </section>

      {/* Featured Today Section */}
      <section className="feature-movie-section fix section-padding pt-0">
        <div className="container">
          <FeaturedMovies 
            mainMovie={movieDatabase
              .filter(movie => movie.featured)
              .filter(movie => {
                const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                if (genreExclude && genreExclude.length > 0) {
                  const movieGenres = movie.genres.map((genreId: number) => 
                    genres.find((g: any) => g.id === genreId)?.name
                  ).filter(Boolean);
                  return !movieGenres.some((genreName: string) => 
                    genreExclude.includes(genreName)
                  );
                }
                return true;
              })
              .sort((a, b) => Number(b.rating) - Number(a.rating))[0]} 
            sideMovies={movieDatabase
              .filter(movie => movie.featured)
              .filter(movie => {
                const genreExclude = themeConfig.overrides?.genreExcludeRecommends;
                if (genreExclude && genreExclude.length > 0) {
                  const movieGenres = movie.genres.map((genreId: number) => 
                    genres.find((g: any) => g.id === genreId)?.name
                  ).filter(Boolean);
                  return !movieGenres.some((genreName: string) => 
                    genreExclude.includes(genreName)
                  );
                }
                return true;
              })
              .sort((a, b) => Number(b.rating) - Number(a.rating))
              .slice(1,5)} 
          />
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="recently-videos fix section-padding pt-0">
        <div className="container-fluid">
          <MovieSlider 
            movies={movieDatabase
              .filter(movie => movie.recentlyViewed !== 'null')
              .filter(movie => {
                // Exclude movies from genres specified in themeConfig.overrides.genreExcludeRecentlyViewed
                const genreExclude = themeConfig.overrides?.genreExcludeRecentlyViewed;
                console.log('themeConfig.overrides.genreExcludeRecentlyViewed', genreExclude);
                if (genreExclude && genreExclude.length > 0) {
                  
                  const movieGenres = movie.genres.map((genreId: number) => 
                    genres.find((g: any) => g.id === genreId)?.name
                  ).filter(Boolean);
                  
                  return !movieGenres.some((genreName: string) => 
                    genreExclude.includes(genreName)
                  );
                }
                return true; // Include all movies if no genreExclude is specified
              })
              .sort((a: any, b: any) => (b.recentlyViewed?.getTime() || 0) - (a.recentlyViewed?.getTime() || 0))} 
            genres={genres.filter((genre: any) => {
              // Exclude genres specified in themeConfig.overrides.genreExcludeRecentlyViewed
              const genreExclude = themeConfig.overrides?.genreExcludeRecentlyViewed;
              if (genreExclude && genreExclude.length > 0) {
                return !genreExclude.includes(genre.name);
              }
              return true; // Include all genres if no genreExclude is specified
            })}
            title="Recently viewed" 
            sliderId='recently-viewed'
          />
        </div>
      </section>

      {/* Unique Genres Section */}
      {genres
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .filter((genre: any) => {
          // Only include genres that have at least one movie
          const moviesInGenre = movieDatabase.filter(movie => movie.genres.includes(genre.id));
          return moviesInGenre.length > 0;
        })
        .map((genre: any) => (
        <section key={genre.id} className={`${genre.slug}-videos fix section-padding pt-0`}>
          <div className="container-fluid">
            <MovieSlider 
              movies={movieDatabase
                .sort((a, b) => a.title.localeCompare(b.title))
                .filter(movie => movie.genres.includes(genre.id))} 
              genres={genres}
              title={`${genre.name}`}
              sliderId={`${genre.slug}-videos`}
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home; 
