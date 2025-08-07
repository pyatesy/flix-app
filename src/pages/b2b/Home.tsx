import React from 'react';
import B2BHero from '../../components/b2b/B2BHero';
import B2BBenefits from '../../components/b2b/B2BBenefits';

const B2BHome: React.FC = () => {
  return (
    <div className="b2b-home">
      <B2BHero />
      <B2BBenefits />
    </div>
  );
};

export default B2BHome; 