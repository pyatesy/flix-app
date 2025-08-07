import React from 'react';
import ProductList from './ProductList';

const ProductListExamples: React.FC = () => {
  return (
    <div className="container">
      <h1>Product List Examples</h1>
      
      {/* Example 1: All products */}
      <section className="mb-5">
        <h2>All Products</h2>
        <ProductList />
      </section>

      {/* Example 2: Products by category ID */}
      <section className="mb-5">
        <h2>Men's Suits (Category ID: 5)</h2>
        <ProductList categoryId={5} />
      </section>

      {/* Example 3: Products by category slug */}
      <section className="mb-5">
        <h2>Women's Fashion (Category Slug: womens)</h2>
        <ProductList categorySlug="womens" />
      </section>

      {/* Example 4: Featured products only */}
      <section className="mb-5">
        <h2>Featured Products</h2>
        <ProductList 
          filters={{ featured: true }}
          sortBy={{ field: 'price', direction: 'desc' }}
        />
      </section>

      {/* Example 5: Products in stock, sorted by price */}
      <section className="mb-5">
        <h2>In Stock Products (Price: Low to High)</h2>
        <ProductList 
          filters={{ inStock: true }}
          sortBy={{ field: 'price', direction: 'asc' }}
        />
      </section>

      {/* Example 6: Limited results */}
      <section className="mb-5">
        <h2>Top 6 Products by Rating</h2>
        <ProductList 
          sortBy={{ field: 'rating', direction: 'desc' }}
          limit={6}
        />
      </section>

      {/* Example 7: Price range filter */}
      <section className="mb-5">
        <h2>Products under $3000</h2>
        <ProductList 
          filters={{ 
            priceRange: { min: 0, max: 3000 },
            inStock: true 
          }}
          sortBy={{ field: 'price', direction: 'asc' }}
        />
      </section>
    </div>
  );
};

export default ProductListExamples; 