import { TEMPLATE_SDK_KEYS } from '../config/optimizely';

export interface TemplateSdkKeys {
  streaming: string;
  retail: string;
  b2b: string;
}

export interface TemplateSdkState {
  keys: TemplateSdkKeys;
  activeTemplate: string;
}

// Template SDK key management utilities
export class TemplateSdkManager {
  private static readonly STORAGE_KEY = 'template_sdk_keys';
  private static readonly ACTIVE_TEMPLATE_KEY = 'active_template';

  // Get all template SDK keys from localStorage
  static getTemplateSdkKeys(): TemplateSdkKeys {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          streaming: parsed.streaming || TEMPLATE_SDK_KEYS.streaming,
          retail: parsed.retail || TEMPLATE_SDK_KEYS.retail,
          b2b: parsed.b2b || TEMPLATE_SDK_KEYS.b2b
        };
      }
    } catch (error) {
      console.warn('Failed to parse template SDK keys from localStorage:', error);
    }

    // Return defaults if nothing stored
    return {
      streaming: TEMPLATE_SDK_KEYS.streaming,
      retail: TEMPLATE_SDK_KEYS.retail,
      b2b: TEMPLATE_SDK_KEYS.b2b
    };
  }

  // Set template SDK key
  static setTemplateSdkKey(templateId: string, sdkKey: string): void {
    try {
      const keys = this.getTemplateSdkKeys();
      keys[templateId as keyof TemplateSdkKeys] = sdkKey;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(keys));
      
      // Also set the legacy key for backward compatibility
      if (templateId === 'streaming') {
        localStorage.setItem('optimizely_sdk_key', sdkKey);
      }
    } catch (error) {
      console.error('Failed to save template SDK key:', error);
    }
  }

  // Get specific template SDK key
  static getTemplateSdkKey(templateId: string): string {
    const keys = this.getTemplateSdkKeys();
    return keys[templateId as keyof TemplateSdkKeys] || TEMPLATE_SDK_KEYS.streaming;
  }

  // Set active template
  static setActiveTemplate(templateId: string): void {
    try {
      localStorage.setItem(this.ACTIVE_TEMPLATE_KEY, templateId);
    } catch (error) {
      console.error('Failed to save active template:', error);
    }
  }

  // Get active template
  static getActiveTemplate(): string {
    try {
      const active = localStorage.getItem(this.ACTIVE_TEMPLATE_KEY);
      if (active && ['streaming', 'retail', 'b2b'].includes(active)) {
        return active;
      }
    } catch (error) {
      console.warn('Failed to get active template from localStorage:', error);
    }
    
    return 'streaming'; // Default
  }

  // Get current template's SDK key
  static getCurrentTemplateSdkKey(): string {
    const activeTemplate = this.getActiveTemplate();
    return this.getTemplateSdkKey(activeTemplate);
  }

  // Validate SDK key format
  static isValidSdkKey(sdkKey: string): boolean {
    // Optimizely SDK keys are typically 32 characters long
    return typeof sdkKey === 'string' && sdkKey.length >= 20;
  }

  // Check if template has a valid SDK key
  static hasValidSdkKey(templateId: string): boolean {
    const sdkKey = this.getTemplateSdkKey(templateId);
    return this.isValidSdkKey(sdkKey);
  }

  // Get template SDK state
  static getTemplateSdkState(): TemplateSdkState {
    return {
      keys: this.getTemplateSdkKeys(),
      activeTemplate: this.getActiveTemplate()
    };
  }

  // Clear all template SDK keys (for testing/reset)
  static clearTemplateSdkKeys(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.ACTIVE_TEMPLATE_KEY);
      localStorage.removeItem('optimizely_sdk_key'); // Legacy key
    } catch (error) {
      console.error('Failed to clear template SDK keys:', error);
    }
  }

  // Migrate from legacy single SDK key to template-specific keys
  static migrateFromLegacy(): void {
    try {
      const legacyKey = localStorage.getItem('optimizely_sdk_key');
      if (legacyKey && !localStorage.getItem(this.STORAGE_KEY)) {
        // Migrate legacy key to streaming template
        this.setTemplateSdkKey('streaming', legacyKey);
        console.log('Migrated legacy SDK key to streaming template');
      }
    } catch (error) {
      console.error('Failed to migrate from legacy SDK key:', error);
    }
  }
}

// Initialize migration on module load
TemplateSdkManager.migrateFromLegacy(); 