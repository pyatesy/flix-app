import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie, Genre } from '../types/movie';
import { Navigation } from 'swiper/modules';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/effect-fade';

interface MovieSliderProps {
  movies: Movie[];
  genres: Genre[];
  title?: string;
  sliderId?: string;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies, genres, title, sliderId }) => {
  
  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map(id => genres.find(genre => genre.id === id)?.name)
      .filter(Boolean)
      .join(' • ');
  };

  return (
    <div className="trending-wrapper-2 container-fluid">
      {title && (
        <div className="section-title-area">
          <div className="section-title">
            <h2>{title}</h2>
          </div>
        </div>
      )}
      <div className="swiper-container">
        <div className="array-button">
          <button className={'array-prev'} id={`prev-${sliderId}`}><i className="fa-solid fa-chevron-left"></i></button>
          <button className={'array-next'} id={`next-${sliderId}`}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <Swiper
          modules={[Navigation]}  
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: `#next-${sliderId}`,
            prevEl: `#prev-${sliderId}`,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="trending-slider"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="trending-box-items">
                <div className="trending-image">
                  <img src={movie.image} alt={movie.title} />
                  <div className="icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <Link to={`/movie/${movie.slug}`} className="video-btn">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="trending-content">
                  <div className="content">
                    <h3>
                      <Link to={`/movie/${movie.slug}`}>{movie.title}</Link>
                    </h3>
                    <p>{getGenreNames(movie.genres)} • {movie.year} • {movie.duration}</p>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider; 