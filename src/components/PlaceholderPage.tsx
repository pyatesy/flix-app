import React from 'react';
import { useTemplate } from '../contexts/TemplateContext';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  const { activeTemplate } = useTemplate();
  
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '3rem',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            {description}
          </p>
        )}
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            <strong>Current Template:</strong> {activeTemplate}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>
            This page is coming soon for the {activeTemplate} template.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage; 