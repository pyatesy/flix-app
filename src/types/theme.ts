export interface ThemeConfig {
  colors: {
    theme: string;
    theme2: string;
    theme3: string;
    theme4: string;
    body: string;
    black: string;
    white: string;
    header: string;
    text: string;
    border: string;
    border2: string;
    bg: string;
    bg2: string;
    // Additional color variables
    primaryColor: string;
    primaryColorHover: string;
    secondaryColor: string;
    successColor: string;
    dangerColor: string;
    warningColor: string;
    infoColor: string;
    lightColor: string;
    darkColor: string;
  };
  typography?: {
    fontFamily: string;
    fontFamilyBase: string;
    fontSizeBase: string;
    lineHeightBase: number;
    fontSizeH1: string;
    fontSizeH2: string;
    fontSizeH3: string;
    fontSizeH4: string;
    fontSizeH5: string;
    fontSizeH6: string;
    fontSizeUp1: string;
    fontSizeUp2: string;
    fontSizeUp3: string;
    fontSizeUp4: string;
    fontSizeUp5: string;
    fontSizeUp6: string;
  };
  spacing?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius?: {
    default: string;
    lg: string;
    sm: string;
  };
  shadows?: {
    default: string;
    lg: string;
    bootstrap: string;
  };
  assets: {
    logoUrl?: string;
    breadcrumbBackgroundUrl?: string;
    title?: string;
    faviconUrl?: string;
  };
  overrides?: {
    genreExcludeRecentlyViewed?: string[]; // Optional array of genre names to exclude
    genreExcludeRecommends?: string[]; // Optional array of genre names to exclude
    genreExcludeHeroTrending?: string[]; // Optional array of genre names to exclude
  };
  menu?: {
    topLevelItems?: MenuItem[];
    categories?: MenuItem[];
  };
  fonts?: { /*for backward compatibility*/
    family?: string;
    familyBase?: string;
  };
}

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  children?: MenuItem[];
}

export interface OptimizelyThemeData {
  themeData: string; // JSON string containing ThemeConfig
  movieData?: string; // JSON string containing MovieData
  productData?: string; // JSON string containing ProductData
}

export interface MovieData {
  movies: any[]; // Movie array from movies.ts
  genres: any[]; // Genre array from movies.ts
  actors: any[]; // Actor array from movies.ts
}

export interface ProductData {
  products: any[]; // Product array from products.ts
  categories: any[]; // Category array from products.ts
  brands: any[]; // Brand array from products.ts
} 