import React from 'react';
import { HeroCarousel, ProductShowcase, RecommendedProductsCarousel } from '../../components/retail';

const RetailHome: React.FC = () => {    

    
    return (
        <div className="retail-home">
            <HeroCarousel />
            <ProductShowcase />
            <RecommendedProductsCarousel />
        </div>
    );
};

export default RetailHome; 