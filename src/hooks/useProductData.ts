import { useDecision } from '@optimizely/react-sdk';
import { products, categories, brands, Product, Category, ProductBrand } from '../data/retail/products';
import { ProductData } from '../types/theme';

export const useProductData = (): ProductData => {
  const [decision] = useDecision('theme_customization');

  // If feature flag is enabled and has productData variable
  if (decision?.enabled && decision?.variables?.productData) {
    try {
      const optimizelyProductData = decision.variables.productData as any;
   
      // Validate the parsed config has required properties
      if (optimizelyProductData.products && optimizelyProductData.categories && optimizelyProductData.brands) {
        console.log('🛍️ Using Optimizely product data override');
        return {
          products: optimizelyProductData.products,
          categories: optimizelyProductData.categories,
          brands: optimizelyProductData.brands,
        };
      }
    } catch (error) {
      console.warn('❌ Failed to parse Optimizely product data, using fallback:', error);
    }
  }

  // Fallback to default product data
  console.log('🛍️ Using default product data');
  return {
    products: products,
    categories: categories,
    brands: brands,
  };
}; 