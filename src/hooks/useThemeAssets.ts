import { useThemeConfig } from './useThemeConfig';

export const useThemeAssets = () => {
  const themeConfig = useThemeConfig();
  
  return {
    logoUrl: themeConfig.assets.logoUrl,
    breadcrumbBackgroundUrl: themeConfig.assets.breadcrumbBackgroundUrl,
  };
}; 