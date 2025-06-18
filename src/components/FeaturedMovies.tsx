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
      <div className="row">
        <div className="col-xl-7">
          <div className="feature-movie-banner">
            <div className="feature-movie">
              <img src={mainMovie.image} alt={mainMovie.title} />
              <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" className="video-btn ripple video-popup">
                <i className="fa-solid fa-play"></i>
                {mainMovie.title}
              </a>
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6">
          <div className="feature-movie-right">
            <div className="movie-list-area">
              {sideMovies.map((movie) => (
                <div key={movie.id} className="movie-list-items">
                  <div className="movie-list-image">
                    <img src={movie.image} alt={movie.title}/>
                    <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" className="video-btn ripple video-popup">
                      <i className="fa-solid fa-play"></i>
                    </a>
                  </div>
                  <div className="movie-list-content">
                    <h4><Link to="/movie-details">{movie.title}</Link></h4>
                    <span>{movie.duration}</span>
                    <p>{movie.description}</p>
                    <ul className="post-like"> 
                      <li>
                        <i className="fa-sharp fa-regular fa-thumbs-up"></i>
                        {movie.likes}
                      </li>
                      <li>
                        <i className="fa-sharp fa-regular fa-heart"></i>
                        {movie.hearts}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovies; 