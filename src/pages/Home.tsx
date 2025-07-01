import React from 'react';
import { Link } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import FeaturedMovies from '../components/FeaturedMovies';
import Hero from '../components/Hero';
import Genre from '../components/Genre';
import { useDecision } from '@optimizely/react-sdk';
import { useUserId } from '../contexts/UserContext';
import { useMovieData } from '../hooks/useMovieData';

//import { generateUserId } from '../utils/userId';

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [decision] = useDecision('dragon-recommendation-2');
  const { movies: movieDatabase, genres } = useMovieData();

  return (
    <div className="main-content">    
      {/* Hero Section */}
      <Hero mainMovies={movieDatabase
.filter(movie => movie.featured === true)
.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0,2)} 
sliderMovies={movieDatabase
.filter(movie => movie.featured === true)
.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(2)} 
trendingMovies={movieDatabase
.filter(movie => movie.trending === true)
.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0,1)} 
/>
      
      {/* Recommended Movies Section */}
      <section className="upcoming-movie-section fix section-padding">
        <div className="container-fluid">
          {decision.variationKey === 'dreamfyre' && (
            <MovieSlider movies={movieDatabase.filter(movie => movie.genres.includes(1) || movie.genres.includes(3)).sort((a, b) => a.title.localeCompare(b.title))} genres={genres} title="Dreamfyre's Recommendations" sliderId='dreamfyre-recommendations'/>
          )}
          {decision.variationKey === 'vermax' && (
            <MovieSlider movies={movieDatabase.filter(movie => movie.genres.includes(2) || movie.genres.includes(4)).sort((b, a) => a.title.localeCompare(b.title))} genres={genres} title="Vermax's Picks" sliderId='vermax-picks'/>
          )}
          {decision.variationKey === 'on' && (
            <MovieSlider movies={movieDatabase.sort((a, b) => (b.recentlyViewed?.getTime() || 0) - (a.recentlyViewed?.getTime() || 0)) } genres={genres} title="Recommended Movies" sliderId='recommended-movies'/>
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
          <FeaturedMovies mainMovie={movieDatabase.sort((a, b) => Number(b.rating) - Number(a.rating)).filter(movie => movie.featured)[0]} sideMovies={movieDatabase.sort((a, b) => Number(b.rating) - Number(a.rating)).filter(movie => movie.featured).slice(1,5)} />
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="recently-videos fix section-padding pt-0">
        <div className="container-fluid">
          <MovieSlider 
            movies={movieDatabase
              .filter(movie => movie.recentlyViewed !== null)
              .sort((a: any, b: any) => (b.recentlyViewed?.getTime() || 0) - (a.recentlyViewed?.getTime() || 0))} 
            genres={genres}
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
