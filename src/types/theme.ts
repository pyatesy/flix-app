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
  };
  assets: {
    logoUrl: string;
    breadcrumbBackgroundUrl: string;
    title?: string;
    faviconUrl?: string;
  };
  fonts: {
    family: string;
  };
  shadows: {
    boxShadow: string;
  };
}

export interface OptimizelyThemeData {
  themeData: string; // JSON string containing ThemeConfig
  movieData?: string; // JSON string containing MovieData
}

export interface MovieData {
  movies: any[]; // Movie array from movies.ts
  genres: any[]; // Genre array from movies.ts
  actors: any[]; // Actor array from movies.ts
} 