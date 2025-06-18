import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface FeaturedMoviesProps {
  mainMovie: Movie;
  sideMovies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ mainMovie, sideMovies }) => {
  return (
    <div className="feature-movie-wrapper">
      <div className="section-title style-2">
        <h2>Featured today</h2>
      </div>
      <div className="row g-4">
        {mainMovie && (
          <div className="col-lg-6">
            <div className="hero-image">
              <img src={mainMovie.image} alt={mainMovie.title} />
              <a href={`/movie/${mainMovie.slug}`}  className="video-btn ripple video-popup">
                <i className="fa-solid fa-play"></i>
              </a>
              <div className="movie-content">
                <ul className="post-time">
                  <li>
                    <i className="fa-regular fa-clock"></i>
                    {mainMovie.duration}
                  </li>
                  <li>
                    <i className="fa-sharp fa-regular fa-tv"></i>
                    {mainMovie.quality}
                  </li>
                </ul>
                <h3><Link to={`/movie/${mainMovie.slug}`}>{mainMovie.title}</Link></h3>
                <p>{mainMovie.genre}</p>
              </div>
            </div>
          </div>
        )}
        <div className="col-lg-6">
          <div className="row g-4">
            {sideMovies.map((movie) => (
              <div key={movie.id} className="col-lg-6">
                <div className="hero-image">
                  <img src={movie.image} alt={movie.title} />
                  <a href={`/movie/${movie.slug}`} className="video-btn ripple video-popup">
                    <i className="fa-solid fa-play"></i>
                  </a>
                  <div className="movie-content">
                    <ul className="post-time">
                      <li>
                        <i className="fa-regular fa-clock"></i>
                        {movie.duration}
                      </li>
                      <li>
                        <i className="fa-sharp fa-regular fa-tv"></i>
                        {movie.quality || 'HD'}
                      </li>
                    </ul>
                    <h3><Link to={`/movie/${movie.slug}`}>{movie.title}</Link></h3>
                    <p>{movie.genre || movie.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovies; 