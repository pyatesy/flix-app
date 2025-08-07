import React from 'react';
import { RouteConfig, TemplateConfig } from '../../types/template';
import { Home as StreamingHome, Movie, MovieDetails, Pricing, Login, NotFound } from '../../pages/streaming';
import { Home as RetailHome } from '../../pages/retail';
import { Home as B2BHome } from '../../pages/b2b';
import ProductDetailsPage from '../../pages/retail/ProductDetailsPage';
import ProductCatalog from '../../pages/retail/ProductCatalogue';
import ShoppingCart from '../../pages/retail/ShoppingCart';
import Checkout from '../../pages/retail/Checkout';
import Solutions from '../../pages/b2b/Solutions';
import CaseStudies from '../../pages/b2b/CaseStudies';
import Contact from '../../pages/b2b/Contact';
import Demo from '../../pages/b2b/Demo';
import { defaultThemeConfig } from '../../config/themeConfig';

// Define template constants
export const TEMPLATES = {
  STREAMING: 'streaming',
  RETAIL: 'retail', 
  B2B: 'b2b'
} as const;

export type TemplateId = typeof TEMPLATES[keyof typeof TEMPLATES];

// Template configurations
export const templateConfigs: Record<TemplateId, TemplateConfig> = {
  [TEMPLATES.STREAMING]: {
    id: TEMPLATES.STREAMING,
    name: 'Streaming Service',
    routes: [
      { path: '/', component: StreamingHome, template: TEMPLATES.STREAMING },
      { path: '/login', component: Login, template: TEMPLATES.STREAMING },
      { path: '/movie', component: Movie, template: TEMPLATES.STREAMING },
      { path: '/movies', component: Movie, template: TEMPLATES.STREAMING },
      { path: '/movie/:slug', component: MovieDetails, template: TEMPLATES.STREAMING },
      { path: '/pricing', component: Pricing, template: TEMPLATES.STREAMING },
      { path: '*', component: NotFound, template: TEMPLATES.STREAMING }
    ],
    featureFlags: ['theme_customization', 'subscription_tiers', 'offer_banner', 'dragon_recommendation_2', 'not_available'],
    themeConfig: {
      ...defaultThemeConfig,
      colors: {
        ...defaultThemeConfig.colors,
        theme: '#e50914', // Netflix red
        theme2: '#141414', // Dark gray
        theme3: '#000000', // Black
        theme4: '#ffffff', // White
        bg: '#141414',
        bg2: '#000000',
        header: '#000000',
        text: '#ffffff',
        primaryColor: '#e50914',
        primaryColorHover: '#cc0812',
        secondaryColor: '#6c757d',
        successColor: '#28a745',
        dangerColor: '#dc3545',
        warningColor: '#ffc107',
        infoColor: '#17a2b8',
        lightColor: '#f8f9fa',
        darkColor: '#343a40',
      }
    }
  },
  [TEMPLATES.RETAIL]: {
    id: TEMPLATES.RETAIL,
    name: 'Retail Company',
    routes: [
      { path: '/', component: RetailHome, template: TEMPLATES.RETAIL },
      { path: '/products', component: ProductCatalog, template: TEMPLATES.RETAIL },
      { path: '/category/:slug', component: ProductCatalog, template: TEMPLATES.RETAIL },
      { path: '/product/:slug', component: ProductDetailsPage, template: TEMPLATES.RETAIL },
      { path: '/cart', component: ShoppingCart, template: TEMPLATES.RETAIL },
      { path: '/checkout', component: Checkout, template: TEMPLATES.RETAIL },
      { path: '*', component: NotFound, template: TEMPLATES.RETAIL }
    ],
    featureFlags: ['theme_customization', 'product_recommendations', 'promotional_banner', 'inventory_status'],
    themeConfig: {
      ...defaultThemeConfig,
      colors: {
        ...defaultThemeConfig.colors,
        theme: '#FF6B35',
        theme2: '#F7931E',
        theme3: '#FFD23F',
        theme4: '#2C3E50',
        primaryColor: '#FF6B35',
        primaryColorHover: '#E55A2B',
        bg: '#f8f9fa',
        bg2: '#ffffff',
        header: '#ffffff',
        text: '#2C3E50',
        border: '#e9ecef',
        border2: '#dee2e6',
        secondaryColor: '#6c757d',
        successColor: '#28a745',
        dangerColor: '#dc3545',
        warningColor: '#ffc107',
        infoColor: '#17a2b8',
        lightColor: '#f8f9fa',
        darkColor: '#343a40',
      },
      assets: {
        logoUrl: 'assets/img/logo/retail.png'
      }
    }
  },
  [TEMPLATES.B2B]: {
    id: TEMPLATES.B2B,
    name: 'B2B Site',
    routes: [
      { path: '/', component: B2BHome, template: TEMPLATES.B2B },
      { path: '/solutions', component: Solutions, template: TEMPLATES.B2B },
      { path: '/case-studies', component: CaseStudies, template: TEMPLATES.B2B },
      { path: '/contact', component: Contact, template: TEMPLATES.B2B },
      { path: '/demo', component: Demo, template: TEMPLATES.B2B },
      { path: '*', component: NotFound, template: TEMPLATES.B2B }
    ],
    featureFlags: ['theme_customization', 'lead_generation', 'demo_scheduling', 'case_study_showcase'],
    themeConfig: {
      ...defaultThemeConfig,
      colors: {
        ...defaultThemeConfig.colors,
        theme: '#2C3E50',
        theme2: '#3498DB',
        theme3: '#E74C3C',
        theme4: '#1A1A1A',
        primaryColor: '#2C3E50',
        primaryColorHover: '#1a252f',
        bg: '#ffffff',
        bg2: '#f8f9fa',
        header: '#2C3E50',
        text: '#2C3E50',
        border: '#ecf0f1',
        border2: '#bdc3c7',
        secondaryColor: '#6c757d',
        successColor: '#28a745',
        dangerColor: '#dc3545',
        warningColor: '#ffc107',
        infoColor: '#17a2b8',
        lightColor: '#f8f9fa',
        darkColor: '#343a40',
      }
    }
  }
}; 