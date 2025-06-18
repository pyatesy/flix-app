import React from 'react';
import { Link } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import FeaturedMovies from '../components/FeaturedMovies';
import { useMovieUrl } from '../hooks/useMovieUrl';
import { 
  movieDatabase,
  genres 
} from '../data/movies';

const recentlyViewed = movieDatabase
.filter(movie => movie.featured === true)
.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));


const Movie: React.FC = () => {
  const { getMoviePath } = useMovieUrl();

  return (
    <div className="movie-page">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-wrapper" style={{ backgroundImage: "url('/assets/img/breadcrumb-bg.jpg')" }}>
        <div className="container">
          <div className="page-heading">
            <div className="page-header-left">
              <h1>Movies</h1>
              <ul className="breadcrumb-items">
                <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><i className="fas fa-angle-right"></i></li>
                <li>Movies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
            {/* Featured Today Section */}
      <section className="feature-movie-section fix section-padding pt-0">
        <div className="container">
          <FeaturedMovies mainMovie={movieDatabase.sort((a, b) => Number(b.rating) - Number(a.rating)).filter(movie => movie.featured)[0]} sideMovies={movieDatabase.sort((a, b) => Number(b.rating) - Number(a.rating)).filter(movie => movie.featured).slice(1,5)} />
        </div>
      </section>

      {/* Movie Trailers Section */}
      <section className="trending-section-2 section-padding section-bg-2">
        <div className="container-fluid">
          <div className="section-title-area">
          </div>
          <MovieSlider movies={movieDatabase} genres={genres} title="Recommended Movies" sliderId='recommended-movies' />
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="popular-movie-section-2 fix section-padding section-bg-2">
        <div className="container-fluid">
          <div className="section-title text-center wow fadeInUp" data-wow-delay=".3s">
            <h2><i className="fa-solid fa-crown" /> popular movies</h2>
          </div>
          <div className="trending-wrapper-2 style-2">
            <div className="row">
              {movieDatabase.map((movie) => (
                <div key={movie.id} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                  <div className="trending-box-items">
                    <div className="trending-image">
                      <img src={movie.image} alt={movie.title} />
                      <div className="icon">
                        <i className="fa-solid fa-crown"></i>
                      </div>
                    </div>
                    <div className="trending-content">
                      <div className="content">
                        <h3><Link to={`/movie/${movie.slug}`}>{movie.title}</Link></h3>
                        <p>{movie.genre}</p>
                      </div>
                      <div className="star">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < Math.floor(Number(movie.rating || 0)) ? '' : 'color-2'}`}
                        ></i>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movie; 