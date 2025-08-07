import { useFeatureFlag } from './useFeatureFlag';
import { MenuItem } from '../utils/menuBuilder';
import { useProductData } from './useProductData';
import { buildMenuFromCategories, getAllCategoriesAsMenu } from '../utils/menuBuilder';

export interface MenuConfig {
  topLevelItems: MenuItem[];
  categories: MenuItem[];
}

export const useMenuConfig = (): MenuConfig => {
  const themeCustomization = useFeatureFlag('template_theme_customization');
  const { categories } = useProductData();
  
  // If theme customization is enabled, return custom menu configuration
  if (themeCustomization) {
    // This would typically come from Optimizely variables or a config file
    // For now, return default menu - this can be extended based on your needs
    return {
      topLevelItems: buildMenuFromCategories(categories),
      categories: getAllCategoriesAsMenu(categories)
    };
  }
  
  // Return default configuration from categories data
  return {
    topLevelItems: buildMenuFromCategories(categories),
    categories: getAllCategoriesAsMenu(categories)
  };
}; 