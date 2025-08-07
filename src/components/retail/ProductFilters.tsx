import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';
import { useProductFilters, FilterState, SortState } from '../../hooks/useProductFilters';
import { Product } from '../../data/retail/products';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-4 border border-secondary rounded p-3">
      <div 
        className="d-flex justify-content-between align-items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <h6 className="mb-0 text-white">{title}</h6>
        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-white`}></i>
      </div>
      {isExpanded && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
};

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onSortChange: (sort: SortState) => void;
  currentFilters: FilterState;
  currentSort: SortState;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFiltersChange,
  onSortChange,
  currentFilters,
  currentSort
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const { categories, brands } = useProductData();
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const [localSort, setLocalSort] = useState<SortState>(currentSort);
  const [priceRange, setPriceRange] = useState({
    min: currentFilters.priceRange?.min || 0,
    max: currentFilters.priceRange?.max || 10000
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  // Update parent when local state changes
  useEffect(() => {
    onFiltersChange(localFilters);
  }, [localFilters, onFiltersChange]);

  useEffect(() => {
    onSortChange(localSort);
  }, [localSort, onSortChange]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSortChange = (field: keyof Product, direction: 'asc' | 'desc') => {
    setLocalSort({ field: field as keyof Product, direction });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
    
    // Update filters with new price range
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        min: type === 'min' ? value : priceRange.min,
        max: type === 'max' ? value : priceRange.max
      }
    }));
  };

  const handleBrandToggle = (brandId: number) => {
    setLocalFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(id => id !== brandId)
        : [...prev.brands, brandId]
    }));
  };

  const handleCategoryToggle = (categoryId: number) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const clearAllFilters = () => {
    setLocalFilters({
      brands: [],
      categories: [],
      featured: false,
      inStock: false
    });
    setPriceRange({ min: 0, max: 10000 });
  };

  // Get the current category from URL slug
  const getCurrentCategory = () => {
    if (!slug) return null;
    return categories.find(cat => cat.slug === slug);
  };

  // Get child categories of the current top-level category
  const getChildCategories = () => {
    const currentCategory = getCurrentCategory();
    
    if (!currentCategory) {
      // If no specific category in URL, show all top-level categories
      return categories.filter(cat => !cat.parentCategory || cat.parentCategory === 0);
    }

    // If current category is a top-level category, show its children
    if (!currentCategory.parentCategory || currentCategory.parentCategory === 0) {
      return categories.filter(cat => cat.parentCategory === currentCategory.id);
    }

    // If current category is a child category, show its siblings
    const parentCategory = categories.find(cat => cat.id === currentCategory.parentCategory);
    if (parentCategory) {
      return categories.filter(cat => cat.parentCategory === currentCategory.parentCategory);
    }

    return [];
  };

  const getTopLevelCategories = () => {
    return categories.filter(cat => !cat.parentCategory || cat.parentCategory === 0);
  };

  return (
    <div className="product-filters bg-dark text-white">
      {/* Filters Toggle Button */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm w-100"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <i className={`fas fa-${isFiltersVisible ? 'eye-slash' : 'eye'} me-2`}></i>
          {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isFiltersVisible && (
        <div className="row">
          {/* Sort Options */}
          <div className="col-md-6 col-lg-3 mb-3">
            <CollapsibleSection title="Sort By" defaultExpanded={true}>
              <div className="btn-group-vertical w-100" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${localSort.field === 'name' && localSort.direction === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleSortChange('name', 'asc')}
                >
                  Name A-Z
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${localSort.field === 'name' && localSort.direction === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleSortChange('name', 'desc')}
                >
                  Name Z-A
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${localSort.field === 'price' && localSort.direction === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleSortChange('price', 'asc')}
                >
                  Price: Low to High
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${localSort.field === 'price' && localSort.direction === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleSortChange('price', 'desc')}
                >
                  Price: High to Low
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${localSort.field === 'rating' && localSort.direction === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleSortChange('rating', 'desc')}
                >
                  Highest Rated
                </button>
              </div>
            </CollapsibleSection>
          </div>

          {/* Price Range */}
          <div className="col-md-6 col-lg-3 mb-3">
            <CollapsibleSection title="Price Range" defaultExpanded={false}>
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Min</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Max</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value) || 10000)}
                    min="0"
                  />
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Brands */}
          <div className="col-md-6 col-lg-3 mb-3">
            <CollapsibleSection title="Brands" defaultExpanded={false}>
              <div className="max-height-200 overflow-auto">
                {brands.map(brand => (
                  <div key={brand.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`brand-${brand.id}`}
                      checked={localFilters.brands.includes(brand.id)}
                      onChange={() => handleBrandToggle(brand.id)}
                    />
                    <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* Categories - Contextual based on URL */}
          <div className="col-md-6 col-lg-3 mb-3">
            <CollapsibleSection 
              title={
                getCurrentCategory() ? 
                  (getCurrentCategory()?.parentCategory === 0 || !getCurrentCategory()?.parentCategory ? 
                    `${getCurrentCategory()?.name} Subcategories` : 
                    'Related Categories'
                  ) : 
                  'Categories'
              } 
              defaultExpanded={false}
            >
              {getCurrentCategory() && (
                <small className="text-white d-block mb-2">
                  Filter by specific subcategories within {getCurrentCategory()?.name}
                </small>
              )}
              <div className="max-height-200 overflow-auto">
                {getChildCategories().map(category => (
                  <div key={category.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={localFilters.categories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                    />
                    <label className="form-check-label" htmlFor={`category-${category.id}`}>
                      {category.name}
                    </label>
                  </div>
                ))}
                    {getChildCategories().length === 0 && (
                    <div className="text-white small">
                    No subcategories available
                  </div>
                )}
              </div>
            </CollapsibleSection>
          </div>


          {/* Clear Filters */}
          <div className="col-12 mb-3">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters; 