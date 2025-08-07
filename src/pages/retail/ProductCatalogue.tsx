import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendedProductsCarousel from '../../components/retail/RecommendedProductsCarousel';
import ProductList from '../../components/retail/ProductList';
import ProductFilters from '../../components/retail/ProductFilters';
import { useProductData } from '../../hooks/useProductData';
import { FilterState, SortState } from '../../hooks/useProductFilters';

const ProductCatalogue: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const { categories } = useProductData();
    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        categories: [],
        featured: false,
        inStock: false
    });
    const [sortBy, setSortBy] = useState<SortState>({
        field: 'name',
        direction: 'asc'
    });

    // Get category info based on slug
    const getCategoryFromSlug = (slug?: string) => {
        if (!slug) return null;
        console.log('🔍 Looking for category with slug:', slug);
        console.log('📋 Available categories:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
        const category = categories.find(cat => cat.slug === slug);
        console.log('✅ Found category:', category);
        return category;
    };

    // Get top level categories (Mens, Womens)
    const getTopLevelCategories = () => {
        return categories.filter(cat => !cat.parentCategory || cat.parentCategory === 0);
    };

    // Determine what to display based on route and available categories
    const getDisplayConfig = () => {
        const category = getCategoryFromSlug(slug);
        
        if (category) {
            // Specific category found
            return {
                type: 'category',
                category,
                title: category.name,
                description: category.description
            };
        }

        // Check for top level categories if no specific category found
        const topLevelCategories = getTopLevelCategories();
        if (topLevelCategories.length > 0) {
            return {
                type: 'topLevel',
                categories: topLevelCategories,
                title: 'Browse Categories',
                description: 'Choose a category to explore our products'
            };
        }

        // Fallback to all products
        return {
            type: 'all',
            title: 'All Products',
            description: 'Browse our complete product catalogue'
        };
    };

    const displayConfig = getDisplayConfig();

    return (
        <div className="container-fluid page-template-plp">
            <div className="row">
                {/* Filters Sidebar */}
                <div className="col-9 mx-auto">
                    <div className="col-12 mx-auto" style={{ top: '20px' }}>
                        <ProductFilters
                            onFiltersChange={setFilters}
                            onSortChange={setSortBy}
                            currentFilters={filters}
                            currentSort={sortBy}
                        />
                    </div>
                {/* </div>

                Main Content 
                <div className="col-lg-9 col-md-8">
                */}
                    {/* Header */}
                    <div className="mb-4">
                        <h1>{displayConfig.title}</h1>
                        <p className="text-white">{displayConfig.description}</p>
                    </div>

                    {/* Product Display */}
                    {displayConfig.type === 'category' && (
                        <ProductList
                            categorySlug={slug}
                            filters={filters}
                            sortBy={sortBy}
                        />
                    )}

                    {displayConfig.type === 'topLevel' && displayConfig.categories && (
                        <div>
                            <div className="row">
                                {displayConfig.categories.map(category => (
                                    <div key={category.id} className="col-md-6 mb-4">
                                        <div className="card">
                                            <img 
                                                src={category.image} 
                                                className="card-img-top" 
                                                alt={category.name}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{category.name}</h5>
                                                <p className="card-text">{category.description}</p>
                                                <a 
                                                    href={`/retail/category/${category.slug}`}
                                                    className="btn btn-primary"
                                                >
                                                    Browse {category.name}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {displayConfig.type === 'all' && (
                        <ProductList
                            filters={filters}
                            sortBy={sortBy}
                        />
                    )}

                    {/* Recommended Products */}
                    <div className="mt-5">
                        <RecommendedProductsCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCatalogue;