import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTemplate } from '../contexts/TemplateContext';

const TemplateRouter: React.FC = () => {
  const { templateConfig } = useTemplate();
  
  return (
    <Routes>
      {templateConfig.routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default TemplateRouter; 