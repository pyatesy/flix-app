import React from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig';
import { useThemeAssets } from '../hooks/useThemeAssets';

const ThemeTest: React.FC = () => {
  const themeConfig = useThemeConfig();
  const { logoUrl, breadcrumbBackgroundUrl } = useThemeAssets();

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'var(--bg)', 
      color: 'var(--white)',
      margin: '20px',
      borderRadius: '8px',
      border: '1px solid var(--border)'
    }}>
      <h3>🎨 Theme Customization Test</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Current Theme Colors:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ backgroundColor: 'var(--theme)', padding: '10px', borderRadius: '4px' }}>
            <strong>Theme:</strong> {themeConfig.colors.theme}
          </div>
          <div style={{ backgroundColor: 'var(--theme2)', padding: '10px', borderRadius: '4px' }}>
            <strong>Theme2:</strong> {themeConfig.colors.theme2}
          </div>
          <div style={{ backgroundColor: 'var(--theme3)', padding: '10px', borderRadius: '4px' }}>
            <strong>Theme3:</strong> {themeConfig.colors.theme3}
          </div>
          <div style={{ backgroundColor: 'var(--theme4)', padding: '10px', borderRadius: '4px' }}>
            <strong>Theme4:</strong> {themeConfig.colors.theme4}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Theme Assets:</h4>
        <p><strong>Logo URL:</strong> {logoUrl}</p>
        <p><strong>Breadcrumb Background:</strong> {breadcrumbBackgroundUrl}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>CSS Custom Properties Test:</h4>
        <div style={{ 
          backgroundColor: 'var(--bg2)', 
          padding: '15px', 
          borderRadius: '4px',
          border: '2px solid var(--border2)'
        }}>
          <p style={{ color: 'var(--text)' }}>This text uses var(--text) color</p>
          <p style={{ color: 'var(--theme)' }}>This text uses var(--theme) color</p>
          <button style={{ 
            backgroundColor: 'var(--theme)', 
            color: 'var(--white)', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Button with theme colors
          </button>
        </div>
      </div>

      <div>
        <h4>Raw Theme Config:</h4>
        <pre style={{ 
          backgroundColor: 'var(--bg2)', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {JSON.stringify(themeConfig, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ThemeTest; 