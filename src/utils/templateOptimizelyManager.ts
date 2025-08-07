import { createInstance } from '@optimizely/react-sdk';
import { TemplateSdkManager } from './templateSdkManager';

export interface TemplateOptimizelyClient {
  client: any; // Using any for now to avoid import issues
  templateId: string;
  sdkKey: string;
  isReady: boolean;
}

export class TemplateOptimizelyManager {
  private static clients: Map<string, TemplateOptimizelyClient> = new Map();
  private static defaultClient: any | null = null;

  // Create or get a template-specific Optimizely client
  static getTemplateClient(templateId: string): TemplateOptimizelyClient {
    // Check if client already exists
    if (this.clients.has(templateId)) {
      const existingClient = this.clients.get(templateId)!;
      
      // Check if SDK key has changed
      const currentSdkKey = TemplateSdkManager.getTemplateSdkKey(templateId);
      if (existingClient.sdkKey !== currentSdkKey) {
        // SDK key changed, recreate client
        this.removeTemplateClient(templateId);
      } else {
        return existingClient;
      }
    }

    // Create new client
    const sdkKey = TemplateSdkManager.getTemplateSdkKey(templateId);
    const client = createInstance({
      sdkKey,
      datafileOptions: {
        autoUpdate: true,
        updateInterval: 6000, // 1 minute
      },
    });

    const templateClient: TemplateOptimizelyClient = {
      client,
      templateId,
      sdkKey,
      isReady: false
    };

    // Store the client
    this.clients.set(templateId, templateClient);

    // Set up ready state tracking
    client.onReady().then(() => {
      if (this.clients.has(templateId)) {
        const clientData = this.clients.get(templateId)!;
        clientData.isReady = true;
        this.clients.set(templateId, clientData);
      }
    });

    return templateClient;
  }

  // Get the default client (for backward compatibility)
  static getDefaultClient(): any {
    if (!this.defaultClient) {
      const activeTemplate = TemplateSdkManager.getActiveTemplate();
      const templateClient = this.getTemplateClient(activeTemplate);
      this.defaultClient = templateClient.client;
    }
    return this.defaultClient;
  }

  // Get client for active template
  static getActiveTemplateClient(): TemplateOptimizelyClient {
    const activeTemplate = TemplateSdkManager.getActiveTemplate();
    return this.getTemplateClient(activeTemplate);
  }

  // Remove a template client (for cleanup)
  static removeTemplateClient(templateId: string): void {
    const client = this.clients.get(templateId);
    if (client) {
      // Note: Optimizely doesn't have a direct cleanup method
      // The client will be garbage collected when no longer referenced
      this.clients.delete(templateId);
    }
  }

  // Get all template clients
  static getAllTemplateClients(): Map<string, TemplateOptimizelyClient> {
    return new Map(this.clients);
  }

  // Check if a template client is ready
  static isTemplateClientReady(templateId: string): boolean {
    const client = this.clients.get(templateId);
    return client?.isReady || false;
  }

  // Get template client status
  static getTemplateClientStatus(templateId: string): {
    exists: boolean;
    isReady: boolean;
    sdkKey: string;
  } {
    const client = this.clients.get(templateId);
    if (!client) {
      return {
        exists: false,
        isReady: false,
        sdkKey: TemplateSdkManager.getTemplateSdkKey(templateId)
      };
    }

    return {
      exists: true,
      isReady: client.isReady,
      sdkKey: client.sdkKey
    };
  }

  // Clear all clients (for testing/reset)
  static clearAllClients(): void {
    this.clients.clear();
    this.defaultClient = null;
  }

  // Update default client when active template changes
  static updateDefaultClient(): void {
    const activeTemplate = TemplateSdkManager.getActiveTemplate();
    const templateClient = this.getTemplateClient(activeTemplate);
    this.defaultClient = templateClient.client;
  }

  // Get client info for debugging
  static getClientInfo(): {
    activeTemplate: string;
    clients: Array<{
      templateId: string;
      isReady: boolean;
      sdkKey: string;
    }>;
  } {
    const activeTemplate = TemplateSdkManager.getActiveTemplate();
    const clients = Array.from(this.clients.entries()).map(([templateId, client]) => ({
      templateId,
      isReady: client.isReady,
      sdkKey: client.sdkKey
    }));

    return {
      activeTemplate,
      clients
    };
  }
} 