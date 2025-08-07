import React from 'react';
import { B2BBenefitsProps, B2BBenefit } from '../../types/b2b';

const defaultBenefits: B2BBenefit[] = [
  {
    id: 1,
    title: "Scalable Solutions",
    description: "Enterprise-grade solutions that grow with your business needs, supporting millions of users and transactions.",
    icon: "fas fa-expand-arrows-alt",
    highlighted: true
  },
  {
    id: 2,
    title: "Advanced Security",
    description: "Bank-level security with end-to-end encryption, compliance certifications, and 24/7 monitoring.",
    icon: "fas fa-shield-alt",
    highlighted: true
  },
  {
    id: 3,
    title: "Expert Support",
    description: "Dedicated account management and technical support with guaranteed response times and SLA commitments.",
    icon: "fas fa-headset",
    highlighted: true
  }
];

const B2BBenefits: React.FC<B2BBenefitsProps> = ({ benefits = defaultBenefits }) => {
  return (
    <section className="b2b-benefits">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <p className="section-subtitle">
            Discover the key advantages that make our solutions the preferred choice for enterprise clients
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.slice(0, 3).map((benefit) => (
            <div 
              key={benefit.id} 
              className={`benefit-card ${benefit.highlighted ? 'highlighted' : ''}`}
            >
              <div className="benefit-icon">
                <i className={benefit.icon}></i>
              </div>
              
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
              
              <div className="benefit-action">
                <button className="btn btn-outline-primary">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="benefits-cta text-center">
          <p className="cta-text">Ready to transform your business?</p>
          <button className="btn btn-primary btn-lg">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default B2BBenefits;