import React from 'react';

const ProductShowcase : React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src="https://images2.cmp.optimizely.com/assets/black-dress.png/8709b218618d11f0bc4012dfa2e3f244" alt="Product A" />
        </div>
        <div className="col-md-6 mb-4">
          <img src="https://images2.cmp.optimizely.com/assets/black-dress.png/8709b218618d11f0bc4012dfa2e3f244" alt="Product B" />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;