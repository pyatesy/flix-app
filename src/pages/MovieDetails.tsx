import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Movie, Genre } from '../types/movie';
import { movieDatabase, genres, actors } from '../data/movies';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: string;
  comment: string;
}

const MovieDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!slug) return;
    
    const foundMovie = movieDatabase.find(m => m.slug === slug);
    
    if (foundMovie) {
      setMovie(foundMovie);
      // Get genre details for the movie
      const movieGenreDetails = foundMovie.genres
        .map(genreId => genres.find(g => g.id === genreId))
        .filter((genre): genre is Genre => genre !== undefined);
      setMovieGenres(movieGenreDetails);
    }
  }, [slug]);


  if (!movie) {
    return <div className="container text-center py-5">Movie not found</div>;
  }

  return (
    <div className="movie-details-section section-padding pb-0">
      <div className="container-fluid">
        <div className="movie-details-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <div className="movie-details-image">
                <img src={movie.largeImage || movie.image} alt={movie.title} />
                {movie.linkToVideo && (
                  <a href={movie.linkToVideo} className="video-btn ripple video-popup">
                    <i className="fa-solid fa-play"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <div className="movie-details-content">
                <div className="description-content">
                  <h3>Description</h3>
                  <span>{movie.title}</span>
                  <ul className="description-list">
                    {movie.year && <li>{movie.year}</li>}
                    {movie.director && movie.director.length > 0 && (
                      <li>By {movie.director.join(', ')}</li>
                    )}
                    <li>{movie.duration}</li>
                    {movie.rating && (
                      <li>
                        <div className="star">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i < Math.floor(Number(movie.rating)) ? '' : 'color-2'}`}></i>
                          ))}
                        </div>
                      </li>
                    )}
                  </ul>
                  {movie.description && <p>{movie.description}</p>}
                </div>

                {movie.cast && movie.cast.length > 0 && (
                  <div className="description-content cost-items">
                    <div className="section-title-area">
                      <div className="section-title">
                        <h3>Cast</h3>
                      </div>
                      <div className="array-button-2">
                        <button className="cta-prev"><i className="fa-solid fa-chevron-left"></i></button>
                        <button className="cta-next"><i className="fa-solid fa-chevron-right"></i></button>
                      </div>
                    </div>
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation={{
                        prevEl: '.cta-prev',
                        nextEl: '.cta-next',
                      }}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                      }}
                      className="cast-slider"
                    >
                      {movie.cast.map((actorId) => {
                        const actor = actors.find(a => a.id === actorId);
                        return actor ? (
                          <SwiperSlide key={actor.id}>
                            <div className="cast-image">
                              <img src={actor.image} alt={actor.name} />
                              <div className="cast-name">{actor.name}</div>
                            </div>
                          </SwiperSlide>
                        ) : null;
                      })}
                    </Swiper>
                  </div>
                )}

              </div>
            </div>

            <div className="col-xl-4 mt-4 mt-xl-0">
              <div className="movie-sidebar">
                {movie.year && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M6.75 3.5V5.75M17.25 3.5V5.75M3 19.25V8C3 6.75736 4.00736 5.75 5.25 5.75H18.75C19.9926 5.75 21 6.75736 21 8V19.25M3 19.25C3 20.4926 4.00736 21.5 5.25 21.5H18.75C19.9926 21.5 21 20.4926 21 19.25M3 19.25V11.75C3 10.5074 4.00736 9.5 5.25 9.5H18.75C19.9926 9.5 21 10.5074 21 11.75V19.25" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h5>Released Year</h5>
                    </div>
                    <h4 className="date-text">{movie.year}</h4>
                  </div>
                )}

                {movie.language && movie.language.length > 0 && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M10.5 21.5L15.75 10.25L21 21.5M12 18.5H19.5M3 6.12136C4.96557 5.87626 6.96804 5.75 9 5.75M9 5.75C10.1208 5.75 11.2326 5.78841 12.3343 5.864M9 5.75V3.5M12.3343 5.864C11.1763 11.1578 7.68868 15.5801 3 18.0023M12.3343 5.864C13.2298 5.92545 14.1186 6.01146 15 6.12136M10.4113 14.6162C8.78554 12.9619 7.47704 10.9949 6.58432 8.81366" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h5>Available Languages</h5>
                    </div>
                    <ul className="languages-list">
                      {movie.language.map((lang, index) => (
                        <li key={index}><a href="#">{lang}</a></li>
                      ))}
                    </ul>
                  </div>
                )}

                {movie.rating && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M11.4807 3.9987C11.6729 3.53673 12.3273 3.53673 12.5195 3.9987L14.6454 9.11016C14.7264 9.30492 14.9096 9.43799 15.1199 9.45485L20.6381 9.89724C21.1369 9.93722 21.3391 10.5596 20.9591 10.8851L16.7548 14.4866C16.5946 14.6238 16.5246 14.8391 16.5736 15.0443L17.858 20.4292C17.9741 20.9159 17.4447 21.3005 17.0177 21.0397L12.2933 18.1541C12.1133 18.0441 11.8869 18.0441 11.7069 18.1541L6.98251 21.0397C6.55551 21.3005 6.02606 20.9159 6.14215 20.4292L7.42664 15.0443C7.47558 14.8391 7.40562 14.6238 7.24543 14.4866L3.04111 10.8851C2.66112 10.5596 2.86335 9.93722 3.36209 9.89724L8.88034 9.45485C9.0906 9.43799 9.27375 9.30492 9.35476 9.11016L11.4807 3.9987Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h5>Ratings</h5>
                    </div>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="rating-box">
                          <h4>IMDb</h4>
                          <div className="star">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fa-solid fa-star ${i < Math.floor(Number(movie.rating)) ? '' : 'color-2'}`}></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      
                    </div>
                  </div>
                )}

                {movieGenres.length > 0 && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M3.75 6.5C3.75 5.25736 4.75736 4.25 6 4.25H8.25C9.49264 4.25 10.5 5.25736 10.5 6.5V8.75C10.5 9.99264 9.49264 11 8.25 11H6C4.75736 11 3.75 9.99264 3.75 8.75V6.5Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.75 16.25C3.75 15.0074 4.75736 14 6 14H8.25C9.49264 14 10.5 15.0074 10.5 16.25V18.5C10.5 19.7426 9.49264 20.75 8.25 20.75H6C4.75736 20.75 3.75 19.7426 3.75 18.5V16.25Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5 6.5C13.5 5.25736 14.5074 4.25 15.75 4.25H18C19.2426 4.25 20.25 5.25736 20.25 6.5V8.75C20.25 9.99264 19.2426 11 18 11H15.75C14.5074 11 13.5 9.99264 13.5 8.75V6.5Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5 16.25C13.5 15.0074 14.5074 14 15.75 14H18C19.2426 14 20.25 15.0074 20.25 16.25V18.5C20.25 19.7426 19.2426 20.75 18 20.75H15.75C14.5074 20.75 13.5 19.7426 13.5 18.5V16.25Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h5>Genres</h5>
                    </div>
                    <ul className="languages-list">
                      {movieGenres.map((genre) => (
                        <li key={genre.id}><a href="#">{genre.name}</a></li>
                      ))}
                    </ul>
                  </div>
                )}

                {movie.director && movie.director.length > 0 && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <h5>Director</h5>
                    </div>
                    <div className="post-box-items">
                      <div className="post-content">
                        <h5>{movie.director.join(', ')}</h5>
                      </div>
                    </div>
                  </div>
                )}

                {movie.production && movie.production.length > 0 && (
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <h5>Production</h5>
                    </div>
                    <div className="post-box-items">
                      <div className="post-content">
                        <h5>{movie.production.join(', ')}</h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 