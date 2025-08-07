import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';

const ProductShowcase: React.FC = () => {
  const { products, categories } = useProductData();

  // Get random product images for Mens and Womens categories
  const categoryShowcase = useMemo(() => {
    // Find Mens and Womens categories
    const mensCategory = categories.find(cat => cat.slug === 'mens');
    const womensCategory = categories.find(cat => cat.slug === 'womens');

    // Create arrays of all relevant category IDs (based on actual product data)
    const mensCategoryIds = [4, 5, 6]; // Mens, Suits, Casual Wear
    const womensCategoryIds = [1, 2, 3, 7]; // Womens, Elegant Workwear, Evening Wear, Bridal Wear

    // Get products for each category group
    const mensProducts = products.filter(product => 
      product.category.some((catId: number) => mensCategoryIds.includes(catId))
    );
    const womensProducts = products.filter(product => 
      product.category.some((catId: number) => womensCategoryIds.includes(catId))
    );

    // Select random products (with fallback if no products found)
    const randomMensProduct = mensProducts.length > 0 
      ? mensProducts[Math.floor(Math.random() * mensProducts.length)]
      : null;
    const randomWomensProduct = womensProducts.length > 0 
      ? womensProducts[Math.floor(Math.random() * womensProducts.length)]
      : null;

    // Debug: Log product counts (remove in production)
    // console.log('🔍 ProductShowcase:', {
    //   mensProducts: mensProducts.length,
    //   womensProducts: womensProducts.length,
    //   selectedMensProduct: randomMensProduct?.name,
    //   selectedWomensProduct: randomWomensProduct?.name
    // });

    return {
      mens: {
        category: mensCategory || { id: 4, name: 'Mens', slug: 'mens' },
        product: randomMensProduct,
        image: randomMensProduct?.heroImage || randomMensProduct?.image || (mensCategory?.image || '/assets/img/categories/mens.jpg')
      },
      womens: {
        category: womensCategory || { id: 1, name: 'Womens', slug: 'womens' },
        product: randomWomensProduct,
        image: randomWomensProduct?.heroImage || randomWomensProduct?.image || (womensCategory?.image || '/assets/img/categories/womens.jpg')
      }
    };
  }, [products, categories]);

  return (
    <div className="container-fluid my-5" style={{ height: '800px' }}>
      <div className="row justify-content-center" style={{ height: '100%' }}>
        {/* Mens Category Showcase */}
        <div className="col-md-4 mb-4" style={{ height: '100%' }}>
          <div className="category-showcase" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/category/${categoryShowcase.mens.category.slug}`} style={{ height: '100%', flex: '1' }}>
              <div className="showcase-image-container" style={{ height: '100%' }}>
                <img 
                  src={categoryShowcase.mens.image} 
                  alt={`${categoryShowcase.mens.category.name} Collection`}
                  className="img-fluid rounded shadow-lg showcase-image"
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
                <div className="showcase-overlay">
                  <div className="showcase-content">
                  <h3 className="text-center mb-3 text-white">{categoryShowcase.mens.category.name}</h3>
                    <p className="text-white-50 mb-3">Discover our latest collection</p>
                    <span className="btn btn-primary">Shop Now</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Womens Category Showcase */}
        <div className="col-md-4 mb-4" style={{ height: '100%' }}>
          <div className="category-showcase" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/category/${categoryShowcase.womens.category.slug}`} style={{ height: '100%', flex: '1' }}>
              <div className="showcase-image-container" style={{ height: '100%' }}>
                <img 
                  src={categoryShowcase.womens.image} 
                  alt={`${categoryShowcase.womens.category.name} Collection`}
                  className="img-fluid rounded shadow-lg showcase-image"
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
                <div className="showcase-overlay">
                  <div className="showcase-content">
                  <h3 className="text-center mb-3 text-white">{categoryShowcase.womens.category.name}</h3>
                    <p className="text-white-50 mb-3">Discover our latest collection</p>
                    <span className="btn btn-primary btn-lg btn-block mt-auto text-center">Shop Now</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;