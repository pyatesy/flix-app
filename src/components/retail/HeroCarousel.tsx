import React from 'react';
import { Link } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';

const HeroCarousel: React.FC = () => {
  const { products } = useProductData();
  
  // Filter for featured products only
  const featuredProducts = products.filter(product => product.featured);
  
  // If no featured products, don't render the carousel
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade bg-dark p-3" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        {featuredProducts.map((_, index) => (
          <li 
            key={index}
            data-bs-target="#heroCarousel" 
            data-bs-slide-to={index.toString()} 
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {featuredProducts.map((product, index) => (
          <div key={product.id} className={`carousel-item${index === 0 ? ' active' : ''}`}>
            <div className="row">
              <div className="col-md-6">
                <img 
                  className="d-block w-100" 
                  src={product.heroImage || product.image || '/assets/img/placeholder.jpg'} 
                  alt={product.name} 
                />
              </div>
              <div className="col-md-6">                   
                <div className="carousel-caption-right d-inline-block w-100 h-50 text-center p-5">
                  <h2 className="d-block w-100 mt-2 fs-6">{product.name}</h2>
                  <p>{product.description || 'No description available.'}</p>
                  <Link to={`/product/${product.slug}`} className="btn btn-primary w-100">
                    Shop Now
                  </Link>
                </div>
                {product.productImages && product.productImages[0] && (
                  <img 
                    className="d-inline-block w-50" 
                    src={product.productImages[0]} 
                    alt={`${product.name} - Image 2`} 
                  />
                )}
                {product.productImages && product.productImages[1] && (
                  <img 
                    className="d-inline-block w-50" 
                    src={product.productImages[1]} 
                    alt={`${product.name} - Image 3`} 
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;