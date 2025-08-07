import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
//import 'swiper/css';

interface HotPickMovie {
  id: number;
  title: string;
  image: string;
  duration: string;
  quality: string;
  genre: string;
  number: string;
}

interface HotPicksSliderProps {
  movies: HotPickMovie[];
  title?: string;
}

const HotPicksSlider: React.FC<HotPicksSliderProps> = ({ movies, title }) => {
  return (
    <section className="movie-section style-2 section-padding fix">
      {title && (
        <div className="container">
          <div className="section-title text-center">
            <h2>{title}</h2>
          </div>
        </div>
      )}
      <div className="movie-slider-2">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          speed={1500}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            1399: { slidesPerView: 4 },
            1199: { slidesPerView: 3 },
            991: { slidesPerView: 2 },
            767: { slidesPerView: 2 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 }
          }}
          className="hot-picks-slider"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="movie-box-items-2">
                <div className="movie-image">
                  <img src={movie.image} alt={movie.title} />
                  <div className="number">
                    {movie.number}
                  </div>
                  <div className="movie-content">
                    <Link to={`/movie/${movie.id}`} className="video-btn ripple video-popup">
                      <i className="fa-solid fa-play"></i>
                    </Link>
                    <ul className="post-time">
                      <li>
                        <i className="fa-regular fa-clock"></i>
                        {movie.duration}
                      </li>
                      <li>
                        <i className="fa-sharp fa-regular fa-tv"></i>
                        {movie.quality}
                      </li>
                    </ul>
                    <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
                    <p>{movie.genre}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HotPicksSlider; 