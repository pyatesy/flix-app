import React from 'react';
import { Link } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';

const RecommendedProductsCarousel: React.FC = () => {
  const { products } = useProductData();
  
  // Get recommended products (featured or first 9 products)
  const recommendedProducts = products.filter(product => product.recommended).slice(0, 9);
  const productsToShow = recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 9);
  
  // Group products into slides of 3
  const slides = [];
  for (let i = 0; i < productsToShow.length; i += 3) {
    slides.push(productsToShow.slice(i, i + 3));
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="container-fluid my-5">
      <h2 className="text-center mb-4">Recommended Products</h2>
      <div id="recommendedCarousel" className="carousel slide recommended-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}>
              <div className="row justify-content-center">
                {slide.map((product) => (
                  <div key={product.id} className="col-md-4">
                    <div className="card">
                      <img 
                        className="card-img-top" 
                        src={product.heroImage || product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={product.name}
                        style={{ height: '500px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          {product.salePrice ? (
                            <>
                              <span className="text-decoration-line-through text-muted me-2">
                                ${product.price.toFixed(2)}
                              </span>
                              <span className="text-danger fw-bold">
                                ${product.salePrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="fw-bold">${product.price.toFixed(2)}</span>
                          )}
                        </p>
                        <Link 
                          to={`/product/${product.slug}`} 
                          className="btn btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {slides.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#recommendedCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#recommendedCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendedProductsCarousel;