import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';
import { StockLevel } from '../../data/retail/products';
import RecommendedProductsCarousel from '../../components/retail/RecommendedProductsCarousel';

const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, categories, brands } = useProductData();

  // Find the product by slug
  const product = useMemo(() => {
    if (!slug) return null;
    return products.find(p => p.slug === slug);
  }, [products, slug]);

  // State and refs must be declared unconditionally
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current && (window as any).bootstrap) {
      const carousel = (window as any).bootstrap.Carousel.getOrCreateInstance(carouselRef.current);
      carousel.to(selectedIndex);
    }
  }, [selectedIndex]);

  // Auto-select first available size when product loads
  useEffect(() => {
    if (product && !selectedSize) {
      const firstAvailableSize = product.stockLevel.find((stock: StockLevel) => stock.quantity > 0);
      if (firstAvailableSize) {
        setSelectedSize(firstAvailableSize.size);
      }
    }
  }, [product, selectedSize]);

  // Get brand name by ID
  const getBrandName = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    return brand?.name || 'Unknown Brand';
  };

  // Get category names
  const getCategoryNames = (categoryIds: number[]) => {
    return categoryIds
      .map(catId => categories.find(c => c.id === catId)?.name)
      .filter(Boolean)
      .join(', ');
  };

  // Helper functions for stock management
  const getTotalStock = (stockLevels: StockLevel[]) => {
    return stockLevels.reduce((total, stock) => total + stock.quantity, 0);
  };

  // Removed unused getAvailableSizes function

  const getStockForSize = (stockLevels: StockLevel[], size: string) => {
    return stockLevels.find(stock => stock.size === size)?.quantity || 0;
  };

  const isSizeAvailable = (stockLevels: StockLevel[], size: string) => {
    return getStockForSize(stockLevels, size) > 0;
  };

  // Handle product not found
  if (!product) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <h2>Product Not Found</h2>
          <p className="text-muted">The product you're looking for doesn't exist.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/products')}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Use product images or fallback to single image
  const productImages: string[] = product.productImages || [product.image];

  return (
    <div className="container-fluid my-5">
      <div className="row">
        {/* Thumbnails - 3 columns */}
        <div className="col-md-2 d-flex flex-column align-items-center">
          {productImages.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              className={`mb-2 ${selectedIndex === index ? 'border-primary' : ''}`}
              alt={`${product.name} - Thumbnail ${index + 1}`}
              style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>

        {/* Main Image Carousel - 6 columns */}
        <div className="col-6 d-flex align-items-center vertical-align-top justify-content-start">
          <div
            id="productImageCarousel"
            className="carousel slide w-100"
            data-bs-ride="carousel"
            ref={carouselRef}
            style={{ height: '100%' }}
          >
            <div className="carousel-inner h-100">
              {productImages.map((image: string, index: number) => (
                <div key={index} className={`carousel-item h-100${index === selectedIndex ? ' active' : ''}`}>
                  <img
                    src={image}
                    className="d-block w-100 rounded"
                    alt={`${product.name} view ${index + 1}`}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            {productImages.length > 1 && (
              <>
                <button className="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev"
                  onClick={() => setSelectedIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next"
                  onClick={() => setSelectedIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Info - 3 columns */}
        <div className="col-md-4">
          <h1 className="display-4">{product.name}</h1>
          {/* Price Section */}
          <div className="mb-4">
            <h3 className="text-primary">${product.price.toLocaleString()}</h3>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-muted text-decoration-line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {/* Brand */}
          <p className="text-white  mb-3">
            Brand: <strong>{getBrandName(product.brand)}</strong>
          </p>
          {/* Categories */}
          {product.category.length > 0 && (
            <p className="text-white mb-3">
              Categories: <strong>{getCategoryNames(product.category)}</strong>
            </p>
          )}
          {/* Size Selection */}
          <div className="mb-4">
            <h5 className="text-white mb-3">Select Size:</h5>
            <div className="size-selection d-flex flex-wrap gap-2">
              {product.stockLevel.map((stock: StockLevel) => (
                <button
                  key={stock.size}
                  className={`size-button ${selectedSize === stock.size ? 'selected' : ''} ${!isSizeAvailable(product.stockLevel, stock.size) ? 'out-of-stock' : ''}`}
                  onClick={() => isSizeAvailable(product.stockLevel, stock.size) ? setSelectedSize(stock.size) : null}
                  disabled={!isSizeAvailable(product.stockLevel, stock.size)}
                  title={isSizeAvailable(product.stockLevel, stock.size) ? `Size ${stock.size} - ${stock.quantity} in stock` : `Size ${stock.size} - Out of stock`}
                >
                  {stock.size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {selectedSize ? (
              <div>
                <span className={`badge bg-${isSizeAvailable(product.stockLevel, selectedSize) ? 'primary' : 'danger'} text-white me-2`}>
                  {isSizeAvailable(product.stockLevel, selectedSize) ? `Size ${selectedSize} - In Stock` : `Size ${selectedSize} - Out of Stock`}
                </span>
                {isSizeAvailable(product.stockLevel, selectedSize) && (
                  <small className="text-white">
                    {getStockForSize(product.stockLevel, selectedSize)} items available
                  </small>
                )}
              </div>
            ) : (
              <div>
                <span className={`badge bg-${getTotalStock(product.stockLevel) > 0 ? 'success' : 'danger'} text-white me-2`}>
                  {getTotalStock(product.stockLevel) > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {getTotalStock(product.stockLevel) > 0 && (
                  <small className="text-white">
                    {getTotalStock(product.stockLevel)} total items available across all sizes
                  </small>
                )}
              </div>
            )}
          </div>
          {/* Featured Badge */}
          {product.featured && (
            <div className="mb-3">
              <span className="badge bg-warning text-white">FEATURED</span>
            </div>
          )}
          {/* Description */}
          <p className="lead mb-4">{product.description || 'No description available.'}</p>
          {/* Add to Cart Button */}
          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary btn-lg" 
              type="button"
              disabled={!selectedSize || !isSizeAvailable(product.stockLevel, selectedSize || '')}
            >
              {!selectedSize 
                ? 'Select a Size' 
                : isSizeAvailable(product.stockLevel, selectedSize)
                  ? `Add to Basket - Size ${selectedSize}`
                  : 'Out of Stock'
              }
            </button>
          </div>
        </div>
      </div>
      {/* Recommended Products Section */}
      <div className="mt-5 col-9 mx-auto">
        <RecommendedProductsCarousel />
      </div>
    </div>
  );
};

export default ProductDetailsPage;