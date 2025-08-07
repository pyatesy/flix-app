import React from 'react';
import RecommendedProductsCarousel from '../../components/retail/RecommendedProductsCarousel';

const ShoppingCart : React.FC = () => {
    return (
        <div className="container-fluid page-template-cart">
            <h1>Your Basket</h1>
            <RecommendedProductsCarousel />
        </div>
    );
};

export default ShoppingCart;