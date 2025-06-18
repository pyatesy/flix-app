import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
//import 'swiper/scss';
//import 'swiper/scss/navigation';
//import 'swiper/scss/pagination';
/*import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';*/

interface HeroMovie {
  id: number;
  title: string;
  image: string;
  duration: string;
  quality: string;
  genre: string;
}

interface HeroProps {
  mainMovies: HeroMovie[];
  sliderMovies: HeroMovie[];
}

const Hero: React.FC<HeroProps> = ({ mainMovies, sliderMovies }) => {
  const movieSliderRef = useRef<Swiper | null>(null);
  const trendingSliderRef = useRef<Swiper | null>(null);

  useEffect(() => {
    // Initialize main movie slider
    movieSliderRef.current = new Swiper('.movie-slider', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '#next-hero',
        prevEl: '#prev-hero',
      },
      pagination: {
        el: '.dot2',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });

    // Initialize trending slider
    trendingSliderRef.current = new Swiper('.trending-movie-slider', {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '#next-trending',
        prevEl: '#prev-trending',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },
    });

    return () => {
      if (movieSliderRef.current) {
        movieSliderRef.current.destroy();
      }
      if (trendingSliderRef.current) {
        trendingSliderRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="hero-section section-padding bg-cover" style={{ backgroundImage: "url('/assets/img/dark-gradient-bg.jpg')" }}>
      <div className="hero-1">
        <div className="container-fluid">
          <div className="row g-4">
            {mainMovies.map((movie, index) => (
              <div key={movie.id} className="col-lg-6">
                <div className="hero-image">
                  <img src={movie.image} alt={movie.title} />
                  <a href="#" className="video-btn ripple video-popup">
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
                        {movie.quality}
                      </li>
                    </ul>
                    <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
                    <p>{movie.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="movie-wrapper">
            <div className="swiper movie-slider">
              <div className="swiper-wrapper">
                {sliderMovies.map((movie) => (
                  <div key={movie.id} className="swiper-slide">
                    <div className="movie-box-items">
                      <div className="movie-image">
                        <img src={movie.image} alt={movie.title} />
                        <a href="#" className="video-btn ripple video-popup">
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
                              {movie.quality}
                            </li>
                          </ul>
                          <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
                          <p>{movie.genre}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="array-button">
              <button className="array-prev" id="prev-hero"><i className="fa-solid fa-chevron-left"></i></button>
              <button className="array-next" id="next-hero"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className="swiper-dot-3 text-center">
              <div className="dot2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cta-movie-banner-area section-padding">
          <div className="section-title text-center">
            <h2><img src="/assets/img/lightning.png" alt="lightning" />TRENDING NOW</h2>
          </div>
          <div className="cta-movie-banner-items bg-cover" style={{ backgroundImage: "url('/assets/img/cta-movie/movie-bg-3.jpg')" }}>
            <div className="row g-4">
              <div className="col-xl-4">
                <div className="banner-movie-content">
                  <a href="#" className="video-btn ripple video-popup">
                    <i className="fa-solid fa-play"></i>
                  </a>
                  <h2>Peaky Blinders</h2>
                  <p>A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.</p>
                </div>
              </div>
              <div className="col-xl-8">
              
                <div className="trending-movie-right-items" style={{ marginTop: '200px' }}>
                  <div className="swiper trending-movie-slider">
                  <h3>Other Also Watched</h3>
                    <div className="swiper-wrapper">
                      {sliderMovies.map((movie) => (
                        <div key={movie.id} className="swiper-slide">
                          <div className="trending-movie-thumb">
                            <img src={movie.image} alt={movie.title} />
                            <div className="trending-movie-content">
                              <span>
                                <i className="fa-sharp fa-regular fa-tv"></i>
                                {movie.quality}
                              </span>
                              <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="array-button-items">
                    <div className="array-button-2">
                      <button className="array-prev" id="prev-trending"><i className="fa-solid fa-chevron-left"></i></button>
                      <button className="array-next" id="next-trending"><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 