import React from 'react';
import { useB2BData } from '../../hooks/useB2BData';
import { B2BHeroProps } from '../../types/b2b';

const B2BHero: React.FC<B2BHeroProps> = ({ 
  solution, 
  customTitle, 
  customDescription, 
  customImage 
}) => {
  const { solutions } = useB2BData();
  
  // Use provided solution or find the first featured solution
  const featuredSolution = solution || solutions.find(s => s.featured) || solutions[0];
  
  const title = customTitle || featuredSolution?.name || 'Enterprise Solutions';
  const description = customDescription || featuredSolution?.description || 'Powerful business solutions for modern enterprises';
  const image = customImage || featuredSolution?.image || '/assets/img/hero/01.jpg';
  const features = featuredSolution?.features || [];

  return (
    <section className="b2b-hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-description">{description}</p>
            
            {features.length > 0 && (
              <div className="hero-features">
                <ul className="features-list">
                  {features.slice(0, 4).map((feature: string, index: number) => (
                    <li key={index} className="feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg">
                Get Started
              </button>
              <button className="btn btn-outline-secondary btn-lg">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hero-image">
            <img 
              src={image} 
              alt={title}
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BHero;