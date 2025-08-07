import { ComponentType } from 'react';
import { ThemeConfig, MenuItem } from './theme';

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  template: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  routes: RouteConfig[];
  featureFlags: string[];
  themeConfig: ThemeConfig;
}

export interface TemplateContextType {
  activeTemplate: string;
  templateConfig: TemplateConfig;
  setTemplate: (templateId: string) => void;
  isTemplateActive: (templateId: string) => boolean;
  templateVersion: number;
} 