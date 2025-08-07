import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';
import { Product, StockLevel } from '../../data/retail/products';

// Helper functions for stock management
const getTotalStock = (stockLevels: StockLevel[]) => {
  return stockLevels.reduce((total, stock) => total + stock.quantity, 0);
};

const isProductInStock = (stockLevels: StockLevel[]) => {
  return getTotalStock(stockLevels) > 0;
};

const getAvailableSizes = (stockLevels: StockLevel[]) => {
  return stockLevels.filter(stock => stock.quantity > 0);
};

export interface ProductListProps {
  categoryId?: number;
  categorySlug?: string;
  filters?: {
    priceRange?: { min: number; max: number };
    brands?: number[];
    categories?: number[];
    featured?: boolean;
    inStock?: boolean;
  };
  sortBy?: {
    field: keyof Product;
    direction: 'asc' | 'desc';
  };
  limit?: number;
}

export interface FilterState {
  priceRange?: { min: number; max: number };
  brands: number[];
  featured: boolean;
  inStock: boolean;
}

export interface SortState {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

const ProductList: React.FC<ProductListProps> = ({ 
  categoryId, 
  categorySlug, 
  filters, 
  sortBy = { field: 'name', direction: 'asc' },
  limit 
}) => {
  const { products, categories, brands } = useProductData();
  
  // State for image hover effects
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [isAnimating, setIsAnimating] = useState<{ [key: number]: boolean }>({});

  // Get category info
  const category = useMemo(() => {
    if (categoryId) {
      return categories.find(c => c.id === categoryId);
    }
    if (categorySlug) {
      return categories.find(c => c.slug === categorySlug);
    }
    return null;
  }, [categories, categoryId, categorySlug]);

  // Handle mouse enter on product image
  const handleMouseEnter = (productId: number, productImages: string[]) => {
    if (productImages.length <= 1) return; // No need to animate if only one image
    
    setHoveredProductId(productId);
    setIsAnimating(prev => ({ ...prev, [productId]: true }));
    
    // Get current image index or default to 0
    const currentIndex = currentImageIndex[productId] || 0;
    
    // Select a random different image
    let randomIndex: any;
    do {
      randomIndex = Math.floor(Math.random() * productImages.length);
    } while (randomIndex === currentIndex && productImages.length > 1);
    
    // Preload the selected image before starting animation
    const preloadImage = new Image();
    preloadImage.onload = () => {
      // Image is loaded, now start the animation
      setTimeout(() => {
        setCurrentImageIndex(prev => ({ ...prev, [productId]: randomIndex }));
        setIsAnimating(prev => ({ ...prev, [productId]: false }));
      }, 500); // Half of the 1s animation duration
    };
    preloadImage.onerror = () => {
      // If preload fails, still proceed with animation
      setTimeout(() => {
        setCurrentImageIndex(prev => ({ ...prev, [productId]: randomIndex }));
        setIsAnimating(prev => ({ ...prev, [productId]: false }));
      }, 500);
    };
    preloadImage.src = productImages[randomIndex];
  };

  // Handle mouse leave on product image
  const handleMouseLeave = (productId: number) => {
    setHoveredProductId(null);
    setIsAnimating(prev => ({ ...prev, [productId]: true }));
    
    // Restore original image (index 0) after fade out animation
    setTimeout(() => {
      setCurrentImageIndex(prev => ({ ...prev, [productId]: 0 }));
      setIsAnimating(prev => ({ ...prev, [productId]: false }));
    }, 500); // Half of the 1s animation duration
  };

  // Get current image for a product
  const getCurrentImage = (product: Product) => {
    const imageIndex = currentImageIndex[product.id] || 0;
    return product.productImages?.[imageIndex] || product.image;
  };

  // Get animation class for image
  const getImageAnimationClass = (productId: number) => {
    if (isAnimating[productId]) {
      return hoveredProductId === productId ? 'rounded-top rounded-4' : 'rounded-top rounded-4';
    }
    return 'animated fadeIn 1s rounded-top rounded-4';
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    // Filter by category - include current category and all its children
    if (category) {
      // Get all child categories of the current category
      const childCategories = categories.filter(cat => cat.parentCategory === category.id);
      const categoryIdsToInclude = [category.id, ...childCategories.map(cat => cat.id)];
      
      filteredProducts = filteredProducts.filter(product => 
        product.category.some((catId: number) => categoryIdsToInclude.includes(catId))
      );
    }

    // Apply filters
    const activeFilters = filters || { brands: [], categories: [], featured: false, inStock: false };
    
    if (activeFilters.priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= activeFilters.priceRange!.min && 
        product.price <= activeFilters.priceRange!.max
      );
    }

    if (activeFilters.brands && activeFilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        activeFilters.brands!.includes(product.brand)
      );
    }

    if (activeFilters.categories && activeFilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.some((catId: number) => activeFilters.categories!.includes(catId))
      );
    }

    if (activeFilters.featured) {
      filteredProducts = filteredProducts.filter(product => 
        product.featured === true
      );
    }

    if (activeFilters.inStock) {
      filteredProducts = filteredProducts.filter(product => 
        isProductInStock(product.stockLevel)
      );
    }

    // Sort products
    const activeSort = sortBy;
    filteredProducts.sort((a, b) => {
      const aValue = a[activeSort.field];
      const bValue = b[activeSort.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return activeSort.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return activeSort.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
      
      return 0;
    });

    // Apply limit
    if (limit) {
      filteredProducts = filteredProducts.slice(0, limit);
    }

    return filteredProducts;
  }, [products, categories, category, filters, sortBy, limit]);

  // Get brand name by ID
  const getBrandName = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    return brand?.name || 'Unknown Brand';
  };

  // Get total products count for category and its children
  const getTotalProductsInCategory = () => {
    if (!category) return products.length;
    
    const childCategories = categories.filter(cat => cat.parentCategory === category.id);
    const categoryIdsToInclude = [category.id, ...childCategories.map(cat => cat.id)];
    
    return products.filter(product => 
      product.category.some((catId: number) => categoryIdsToInclude.includes(catId))
    ).length;
  };

  return (
    <div className={`product-list container-fluid ${category?.name?.toLowerCase().replace(/\s+/g, '-') || 'all-products'}`}>
      <div className="row">
        <div className="col-12 product-list-container">
          {category && (
            <div className="mb-4">
              <p className="text">
                {categories.filter(cat => cat.parentCategory === category.id).length > 0 && (
                  <span className="badge bg-info ms-2">
                    Includes {categories.filter(cat => cat.parentCategory === category.id).length} subcategories
                  </span>
                )}
              </p>
              <p className="text">
                Showing {filteredAndSortedProducts.length} of {getTotalProductsInCategory()} products
              </p>
            </div>
          )}
          
          <div className="row">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4 product-card-container">
                <Link to={`/product/${product.slug}`}>
                  <div className="product-card card h-100 bg-dark rounded rounded-4">
                    <img 
                      src={getCurrentImage(product)} 
                      className={`card-img-top ${getImageAnimationClass(product.id)}`} 
                      alt={product.name} 
                      onMouseEnter={() => handleMouseEnter(product.id, product.productImages || [product.image])}
                      onMouseLeave={() => handleMouseLeave(product.id)}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-white">{product.name}</h5>
                      <div className="mt-auto">
                        <p className="card-text text-white">
                          <strong>${product.price.toLocaleString()}</strong>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-muted text-decoration-line-through ms-2">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </p>
                        <p className="card-text">
                          <small className="text-white">
                           {getBrandName(product.brand)}
                          </small>
                        </p>
                        <p className="card-text">
                          <small className={`badge bg-${isProductInStock(product.stockLevel) ? 'success' : 'danger'} text-white`}>
                            {isProductInStock(product.stockLevel) ? 
                              `Available (${getAvailableSizes(product.stockLevel).length} sizes)` : 
                              'Out of stock'
                            }
                          </small>
                        </p>
                        {product.featured && (
                          <span className="badge bg-warning text-white">FEATURED</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters or browse all products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 