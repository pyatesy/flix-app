import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { genres } from '../data/movies';

const Genre: React.FC = () => {
  const genreSliderRef = useRef<Swiper | null>(null);
  
  useEffect(() => {
    genreSliderRef.current = new Swiper('.genre-slider', {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.array-next',
        prevEl: '.array-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 8,
        },
      },
    });

    return () => {
      if (genreSliderRef.current) {
        genreSliderRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="genre-section fix section-padding pt-0">
      <div className="container-fluid">
        <div className="section-title text-center">
          <h2>Browse by Genre</h2>
          <p>
            Explore our collection of movies and shows across different genres
          </p>
        </div>
        <div className="genre-wrapper">
          <div className="swiper genre-slider">
            <div className="swiper-wrapper">
              {genres.map((genre) => (
                <div key={genre.id} className="swiper-slide genre-item-container">
                  <div className="genre-items">
                    <div className="genre-image">
                      <img src={genre.image} alt={genre.description} />
                      <div className="genre-content"> 
                        <h2>
                          <Link to={`/genre/${genre.slug}`} className="link-theme">
                            {genre.icon && <i className={`fas ${genre.icon}`}></i>} {genre.name}
                          </Link>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Genre; 