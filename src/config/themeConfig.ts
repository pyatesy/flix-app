import { ThemeConfig } from '../types/theme';

export const defaultThemeConfig: ThemeConfig = {
  colors: {
    theme: '#00D5F6',
    theme2: '#d39a09',
    theme3: '#00D5F6',
    theme4: '#000',
    body: '#fff',
    black: '#000',
    white: '#eee',
    header: '#0D1224',
    text: '#7d7d7d',
    border: '#D4DCFF',
    border2: '#D4DCED',
    bg: '#222',
    bg2: '#1A1A1A',
  },
  assets: {
    logoUrl: '/assets/img/logo/white-logo.png',
    breadcrumbBackgroundUrl: '/assets/img/breadcrumb-bg.jpg',
  },
  fonts: {
    family: '"Barlow Condensed", sans-serif',
  },
  shadows: {
    boxShadow: '0px 1px 14px 0px rgba(0, 0, 0, 0.13)',
  }
}; 