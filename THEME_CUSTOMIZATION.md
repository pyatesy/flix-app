# Theme Customization System

This document explains how to use the theme customization system in the Flix app, which allows you to control colors, logos, background images, and movie data through Optimizely feature flags with a local fallback.

## Overview

The theme customization system consists of:

1. **Optimizely Feature Flag**: `theme_customization` with `themeData` and `movieData` variables
2. **Local Fallback**: Default configuration in `src/config/themeConfig.ts` and `src/data/movies.ts`
3. **Theme Provider**: Automatically applies theme configuration to CSS custom properties
4. **Movie Data Hook**: Provides movie data with Optimizely override capability
5. **Component Integration**: Components use theme assets and movie data through hooks

## Optimizely Configuration

### Feature Flag Setup

1. Create a feature flag named `theme_customization` in your Optimizely project
2. Add two variables:
   - `themeData` (string) - JSON configuration for theme colors and assets
   - `movieData` (string) - JSON configuration for movie data override

### Theme Data Variable (`themeData`)

The `themeData` variable should contain a JSON string with the following structure:

```json
{
  "colors": {
    "theme": "#FF6B35",
    "theme2": "#F7931E",
    "theme3": "#FFD23F",
    "theme4": "#2C3E50",
    "body": "#fff",
    "black": "#000",
    "white": "#eee",
    "header": "#1A1A2E",
    "text": "#7d7d7d",
    "border": "#E8E8E8",
    "border2": "#D4DCED",
    "bg": "#16213E",
    "bg2": "#0F3460"
  },
  "assets": {
    "logoUrl": "/assets/img/logo/white-logo.png",
    "breadcrumbBackgroundUrl": "/assets/img/breadcrumb-bg.jpg"
  },
  "fonts": {
    "family": "\"Barlow Condensed\", sans-serif"
  },
  "shadows": {
    "boxShadow": "0px 1px 14px 0px rgba(0, 0, 0, 0.13)"
  }
}
```

### Movie Data Variable (`movieData`)

The `movieData` variable should contain a JSON string with the following structure:

```json
{
  "movies": [
    {
      "id": 1,
      "title": "Custom Movie Title",
      "slug": "custom-movie-title",
      "image": "https://images.example.com/custom-movie.jpg",
      "largeImage": "https://images.example.com/custom-movie-large.jpg",
      "duration": "2h 15m",
      "quality": "4K",
      "genres": [1, 4],
      "rating": "4.8",
      "year": "2024",
      "number": "01",
      "recentlyViewed": "2024-01-15T00:00:00.000Z",
      "featured": true,
      "trending": true,
      "director": ["Custom Director"],
      "production": ["Custom Production"],
      "linkToVideo": "https://www.youtube.com/watch?v=example",
      "cast": [1, 2],
      "language": ["English", "Spanish"],
      "description": "This is a custom movie description."
    }
  ],
  "genres": [
    {
      "id": 1,
      "name": "Custom Action",
      "description": "Custom high-energy films",
      "icon": "fa-fire",
      "color": "#FF0000",
      "slug": "custom-action",
      "image": "https://images.example.com/custom-action.jpg"
    }
  ],
  "actors": [
    {
      "id": 1,
      "name": "Custom Actor Name",
      "image": "https://images.example.com/custom-actor.jpg"
    }
  ]
}
```

## Usage in Components

### Theme Colors and Assets

```tsx
import { useThemeConfig } from '../hooks/useThemeConfig';
import { useThemeAssets } from '../hooks/useThemeAssets';

const MyComponent = () => {
  const themeConfig = useThemeConfig();
  const { logoUrl, breadcrumbBackgroundUrl } = useThemeAssets();
  
  return (
    <div style={{ backgroundColor: 'var(--theme)' }}>
      <img src={logoUrl} alt="Logo" />
    </div>
  );
};
```

### Movie Data

```tsx
import { useMovieData } from '../hooks/useMovieData';

const MovieComponent = () => {
  const { movies, genres, actors } = useMovieData();
  
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};
```

## CSS Custom Properties

The theme colors are automatically available as CSS custom properties:

- `--theme` - Primary theme color
- `--theme2` - Secondary theme color
- `--theme3` - Tertiary theme color
- `--theme4` - Quaternary theme color
- `--body` - Body background color
- `--black` - Black color
- `--white` - White color
- `--header` - Header background color
- `--text` - Text color
- `--border` - Border color
- `--border2` - Secondary border color
- `--bg` - Background color
- `--bg2` - Secondary background color
- `--font-family` - Font family
- `--box-shadow` - Box shadow

## Fallback Behavior

1. **Theme Data**: If the `theme_customization` feature flag is disabled or `themeData` is invalid, the system falls back to the default configuration in `src/config/themeConfig.ts`
2. **Movie Data**: If the `theme_customization` feature flag is disabled or `movieData` is invalid, the system falls back to the default data in `src/data/movies.ts`

## Example Files

- `src/config/optimizelyThemeExample.json` - Example theme configuration
- `src/config/optimizelyMovieExample.json` - Example movie data configuration
- `src/config/themeConfig.ts` - Default theme configuration
- `src/data/movies.ts` - Default movie data

## Testing

To test the theme customization:

1. Enable the `theme_customization` feature flag in Optimizely
2. Set the `themeData` variable with your custom theme JSON
3. Set the `movieData` variable with your custom movie data JSON
4. The app will automatically apply the custom theme and movie data
5. Check the browser console for logs indicating which data source is being used

## Notes

- Date strings in movie data should be in ISO format (e.g., "2024-01-15T00:00:00.000Z")
- All image URLs should be absolute URLs
- The system validates the JSON structure before applying changes
- Invalid JSON will cause the system to fall back to default data

## Monitoring

The theme customization feature flag status is displayed in the SidePanel under "Active Feature Flags" when the flag is enabled.

## Troubleshooting

1. **Theme not applying**: Check that the `theme_customization` feature flag is enabled
2. **Invalid JSON**: Ensure the `themeData` variable contains valid JSON
3. **Missing properties**: Verify all required properties are present in the theme configuration
4. **Fallback not working**: Check the console for parsing errors

## File Structure

```
src/
├── components/
│   ├── ThemeProvider.tsx          # Applies theme to CSS custom properties
│   └── ...
├── config/
│   ├── themeConfig.ts             # Default theme configuration
│   └── optimizelyThemeExample.json # Example Optimizely configuration
├── hooks/
│   ├── useThemeConfig.ts          # Hook to get theme configuration
│   ├── useThemeAssets.ts          # Hook to get theme assets
│   └── ...
└── types/
    └── theme.ts                   # TypeScript interfaces
``` 