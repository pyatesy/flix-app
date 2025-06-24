import React, { useEffect, useState } from 'react';
import { useDecision } from '@optimizely/react-sdk';

interface BannerConfig {
  config: {
    title: string;
    background: string;
    'cta-link': string;
    'cta-title': string;
    'cta-background': string;
    'banner-element-positon': string;
    'banner-insert-option': 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
  };
}

const OfferBanner: React.FC = () => {
  const [decision] = useDecision('offer_banner');
  const [isInserted, setIsInserted] = useState(false);

  useEffect(() => {
    if (!decision?.enabled || !decision?.variables?.banner_config || isInserted) {
      return;
    }

    try {
      const bannerConfig: BannerConfig = decision.variables.banner_config as BannerConfig;
      const { config } = bannerConfig;

      // Find the target element
      const targetElement = document.querySelector(config['banner-element-positon']);
      if (!targetElement) {
        console.warn(`Target element "${config['banner-element-positon']}" not found for banner insertion`);
        return;
      }

      // Create banner element
      const bannerElement = document.createElement('div');
      bannerElement.className = 'offer-banner';
      bannerElement.style.cssText = `
        background: ${config.background};
        color: white;
        padding: 15px 20px;
        margin: 10px 0;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        position: relative;
      `;

      // Create banner content
      const titleElement = document.createElement('div');
      titleElement.textContent = config.title;
      titleElement.style.cssText = `
        font-weight: bold;
        font-size: 16px;
        flex: 1;
      `;

      // Create CTA button if link is provided
      if (config['cta-link'] && config['cta-title']) {
        const ctaButton = document.createElement('a');
        ctaButton.href = config['cta-link'];
        ctaButton.textContent = config['cta-title'];
        ctaButton.style.cssText = `
          background: ${config['cta-background']};
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          margin-left: 15px;
          transition: opacity 0.2s;
        `;
        
        ctaButton.addEventListener('mouseenter', () => {
          ctaButton.style.opacity = '0.8';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
          ctaButton.style.opacity = '1';
        });

        bannerElement.appendChild(titleElement);
        bannerElement.appendChild(ctaButton);
      } else {
        bannerElement.appendChild(titleElement);
      }

      // Insert banner based on insert option
      switch (config['banner-insert-option']) {
        case 'beforebegin':
          targetElement.parentNode?.insertBefore(bannerElement, targetElement);
          break;
        case 'afterbegin':
          targetElement.insertBefore(bannerElement, targetElement.firstChild);
          break;
        case 'beforeend':
          targetElement.appendChild(bannerElement);
          break;
        case 'afterend':
          targetElement.parentNode?.insertBefore(bannerElement, targetElement.nextSibling);
          break;
        default:
          targetElement.parentNode?.insertBefore(bannerElement, targetElement.nextSibling);
      }

      setIsInserted(true);
      console.log('Offer banner inserted successfully');

    } catch (error) {
      console.error('Error inserting offer banner:', error);
    }
  }, [decision, isInserted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const banner = document.querySelector('.offer-banner');
      if (banner) {
        banner.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything in React tree
};

export default OfferBanner; 