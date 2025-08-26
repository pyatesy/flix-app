import React from 'react';
import { useProductData } from '../../hooks/useProductData';
import { Product } from '../../data/retail/products';
import { Link } from 'react-router-dom';

const HeroCarousel: React.FC = () => {
  const { products } = useProductData();
  
  // Get featured products for hero carousel, limit to 3
  const featuredProducts = products.filter((product: Product) => product.featured).slice(0, 5);
  
  // If no featured products, use first 3 products
  const carouselProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 5);

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        {carouselProducts.map((_, index) => (
          <li 
            key={index}
            data-bs-target="#heroCarousel" 
            data-bs-slide-to={index} 
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {carouselProducts.map((product: Product, index) => (
          <div key={product.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="row">
              <div className="col-md-6">
                <img 
                  className="d-block w-100" 
                  src={product.heroImage || product.carouselImage || product.image} 
                  alt={product.name} 
                />
              </div>
              <div className="col-md-6">                   
                <div className="carousel-caption-right d-inline-block w-100 h-50 text-center p-5">
                  <h2 className="d-block w-100 mt-2 fs-6">{product.name}</h2>
                  <p>{product.smallDescription || product.description}</p>
                  <Link to={`/product/${product.slug}`} className="btn btn-primary w-100">
                    Shop Now - ${product.price.toLocaleString()}
                  </Link>
                </div>
                {product.productImages && product.productImages.length >= 2 && (
                  <>
                    <img 
                      className="d-inline-block w-50" 
                      src={product.productImages[0]} 
                      alt={`${product.name} detail 1`} 
                    />
                    <img 
                      className="d-inline-block w-50" 
                      src={product.productImages[1]} 
                      alt={`${product.name} detail 2`} 
                    />
                  </>
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