import { Category } from '../data/retail/products';

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  children?: MenuItem[];
}

export const buildMenuFromCategories = (categories: Category[]): MenuItem[] => {
  // Get top-level categories (parentCategory: 0 or undefined)
  const topLevelCategories = categories.filter(cat => !cat.parentCategory || cat.parentCategory === 0);
  
  // Build menu structure
  const menuItems: MenuItem[] = topLevelCategories.map(topCat => {
    const children = categories.filter(cat => cat.parentCategory === topCat.id);
    
    return {
      id: topCat.id,
      name: topCat.name,
      slug: topCat.slug,
      children: children.length > 0 ? children.map(child => ({
        id: child.id,
        name: child.name,
        slug: child.slug
      })) : undefined
    };
  });
  
  return menuItems;
};

export const getAllCategoriesAsMenu = (categories: Category[]): MenuItem[] => {
  return buildMenuFromCategories(categories);
}; 