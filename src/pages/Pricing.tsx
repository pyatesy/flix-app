import React from 'react';
import { Link } from 'react-router-dom';
import { useDecision } from '@optimizely/react-sdk';
import { OptimizelyPricingData } from '../types/optimizely';
import { pricingData } from '../data/pricingData';
import { useUserId } from '../contexts/UserContext';
import { useThemeAssets } from '../hooks/useThemeAssets';

const Pricing: React.FC = () => {
  const { userId } = useUserId();
  const { breadcrumbBackgroundUrl } = useThemeAssets();
  
  // Get the feature flag decision and variables
  const [decision] = useDecision('subscription_tiers');

  // Get pricing data from Optimizely variables or fallback to default
  const optimizelyPricingData: OptimizelyPricingData = decision?.enabled && decision?.variables?.PricingData
    ? decision.variables.PricingData as OptimizelyPricingData
    : pricingData;


  const pricingMultiplier = decision?.variables?.pricingMultiplier as number || 1;

  // If the feature flag is disabled, return null
  if (!decision?.enabled) {
    return null;
  }

  // Get all unique features across all plans
  const allFeatures = Array.from(new Set(
    optimizelyPricingData.plans.flatMap(plan => plan.features)
  ));

  // Render the Free Trial button if enabled for the plan
  const renderFreeTrialButton = (plan: OptimizelyPricingData['plans'][0]) => {
    if (!plan.free_trial) return null;
    
    return (
      <Link to="/pricing" className="theme-btn style-2">
        Start {plan.free_trial_duration} day Free Trial
      </Link>
    );
  };

  return (
    <div className="pricing-page">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-wrapper bg-cover" style={{ backgroundImage: `url(${breadcrumbBackgroundUrl})` }}>
        <div className="container">
          <div className="page-heading">
            <div className="page-header-left">
              <h1 className="wow fadeInUp" data-wow-delay=".3s">Subscriptions</h1>
              <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-house"></i>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-slash-forward"></i>
                </li>
                <li>
                  Subscriptions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="pricing-section section-padding pb-0">
        <div className="container-fluid">
          <div className="section-title-area justify-content-center">
            <ul className="nav" role="tablist">
              <li className="nav-item">
                <a href="#monthly" data-bs-toggle="tab" className="nav-link active" aria-selected="true" role="tab">
                  Monthly
                </a>
              </li>
              <li className="nav-item">
                <a href="#yearly" data-bs-toggle="tab" className="nav-link" aria-selected="false" role="tab" tabIndex={-1}>
                  Yearly
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div id="monthly" className="tab-pane fade show active" role="tabpanel">
              <div className="row">
                {optimizelyPricingData.plans.map((plan, index) => (
                  <div key={plan.name} className="pricing-box-items wow fadeInUp" data-wow-delay={`.${3 + index * 2}s`}>
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                    <h2>${(plan.monthlyPrice * pricingMultiplier).toFixed(2)} <sub>/month</sub></h2>
                    <div className="pricing-button">
                      <Link to="/pricing" className="theme-btn">Choose Plan</Link>
                      {renderFreeTrialButton(plan)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="yearly" className="tab-pane fade" role="tabpanel">
              <div className="row">
                {optimizelyPricingData.plans.map((plan, index) => (
                  <div key={plan.name} className="pricing-box-items">
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                    <h2>${(plan.yearlyPrice * pricingMultiplier).toFixed(2)} <sub>/year</sub></h2>
                    <div className="pricing-button">
                      <Link to="/pricing" className="theme-btn">Choose Plan</Link>
                      {renderFreeTrialButton(plan)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section section-padding">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Compare Plans</h2>
            <p>Find the perfect plan for your streaming needs</p>
          </div>
          <div className="table-responsive">
            <table className="table comparison-table">
              <thead>
                <tr>
                  <th className="text-dark">Features</th>
                  {optimizelyPricingData.plans.map(plan => (
                    <th key={plan.name} className="text-center text-dark">
                      <h3 className="text-dark mb-2">{plan.name}</h3>
                      <div className="price">
                        <span className="monthly-price text-dark">${(plan.monthlyPrice * pricingMultiplier).toFixed(2)}/mo</span>
                        <span className="yearly-price d-none text-dark">${(plan.yearlyPrice * pricingMultiplier).toFixed(2)}/yr</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map(feature => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    {optimizelyPricingData.plans.map(plan => (
                      <td key={`${plan.name}-${feature}`} className="text-center">
                        {plan.features.includes(feature) ? (
                          <i className="fa-solid fa-check text-success"></i>
                        ) : (
                          <i className="fa-solid fa-times text-danger"></i>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td>Free Trial</td>
                  {optimizelyPricingData.plans.map(plan => (
                    <td key={`${plan.name}-trial`} className="text-center">
                      {plan.free_trial ? `${plan.free_trial_duration} days` : 'No trial'}
                    </td>
                  ))}
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  {optimizelyPricingData.plans.map(plan => (
                    <td key={`${plan.name}-action`} className="text-center">
                      <Link to="/pricing" className="theme-btn">Choose Plan</Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section fix section-padding pb-0">
        <div className="container-fluid">
          <div className="section-title-area">
            <div className="section-title">
              <h3>Frequently Asked Questions</h3>
              <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
            </div>
            <Link to="/pricing" className="theme-btn">Ask a Question</Link>
          </div>
          <div className="faq-items-2">
            <div className="accordion" id="accordionExample">
              {optimizelyPricingData.faq.map((item, index) => (
                <div key={index} className={`accordion-item ${index === optimizelyPricingData.faq.length - 1 ? 'mb-0' : ''}`}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} 
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`} 
                      aria-expanded={index === 0} 
                      aria-controls={`collapse${index}`}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span> {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`} 
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`} 
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 