import React from 'react';
import PlaceholderPage from './PlaceholderPage';

// Retail placeholder components
export const RetailHome: React.FC = () => (
  <PlaceholderPage title="Retail Home" description="Welcome to our retail store" />
);

export const ProductCatalog: React.FC = () => (
  <PlaceholderPage title="Product Catalog" description="Browse our products" />
);

export const ProductDetails: React.FC = () => (
  <PlaceholderPage title="Product Details" description="Product information" />
);

export const ShoppingCart: React.FC = () => (
  <PlaceholderPage title="Shopping Cart" description="Your cart items" />
);

export const Checkout: React.FC = () => (
  <PlaceholderPage title="Checkout" description="Complete your purchase" />
);

// B2B placeholder components
export const B2BHome: React.FC = () => (
  <PlaceholderPage title="B2B Home" description="Enterprise solutions for your business" />
);

export const Solutions: React.FC = () => (
  <PlaceholderPage title="Solutions" description="Our enterprise solutions" />
);

export const CaseStudies: React.FC = () => (
  <PlaceholderPage title="Case Studies" description="Success stories from our clients" />
);

export const Contact: React.FC = () => (
  <PlaceholderPage title="Contact" description="Get in touch with our team" />
);

export const Demo: React.FC = () => (
  <PlaceholderPage title="Demo" description="Schedule a product demonstration" />
); 