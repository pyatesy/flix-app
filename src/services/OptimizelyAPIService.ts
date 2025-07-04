export interface APIToken {
  source: string;
  target: string;
}

export interface APIState {
  status: 'idle' | 'loading' | 'error' | 'success';
  error: string | null;
  currentOperation: string | null;
}

export interface Project {
  id: number;
  name: string;
  platform: string;
  status: string;
  created: string;
}

export interface Environment {
  id: number;
  name: string;
  key: string;
  sdk_key?: string;
}

export interface APIError extends Error {
  status?: number;
  endpoint?: string;
  tokenType?: 'source' | 'target';
}

class OptimizelyAPIService {
  private state: APIState = {
    status: 'idle',
    error: null,
    currentOperation: null
  };
  
  private sourceToken: string = '';
  private targetToken: string = '';
  private API_BASE_URL = 'https://api.optimizely.com/v2';
  private API_FLAGS_URL = 'https://api.optimizely.com/flags/v1/';
  
  // State change listeners
  private stateListeners: ((state: APIState) => void)[] = [];
  
  // Add state change listener
  addStateListener(listener: (state: APIState) => void) {
    this.stateListeners.push(listener);
  }
  
  // Remove state change listener
  removeStateListener(listener: (state: APIState) => void) {
    this.stateListeners = this.stateListeners.filter(l => l !== listener);
  }
  
  // Update state and notify listeners
  private updateState(updates: Partial<APIState>) {
    this.state = { ...this.state, ...updates };
    this.stateListeners.forEach(listener => listener(this.state));
  }
  
  // Validate tokens for operations that need both source and target
  validateTokens(sourceToken: string, targetToken: string): boolean {
    if (!sourceToken?.trim() || !targetToken?.trim()) {
      this.updateState({
        status: 'error',
        error: 'Both source and target API tokens are required',
        currentOperation: null
      });
      return false;
    }
    
    this.sourceToken = sourceToken.trim();
    this.targetToken = targetToken.trim();
    this.updateState({ status: 'idle', error: null, currentOperation: null });
    return true;
  }

  // Validate tokens for operations that only need target token
  validateTargetToken(targetToken: string): boolean {
    if (!targetToken?.trim()) {
      this.updateState({
        status: 'error',
        error: 'Target API token is required',
        currentOperation: null
      });
      return false;
    }
    
    this.targetToken = targetToken.trim();
    this.updateState({ status: 'idle', error: null, currentOperation: null });
    return true;
  }
  
  // Get current state
  getState(): APIState {
    return { ...this.state };
  }
  
  // Clear error state
  clearError() {
    this.updateState({ status: 'idle', error: null, currentOperation: null });
  }
  
  // Make API call with proper error handling
  private async makeApiCall(
    flags: boolean, 
    endpoint: string, 
    tokenType: 'source' | 'target', 
    options: RequestInit = {}
  ): Promise<any> {
    const token = tokenType === 'source' ? this.sourceToken : this.targetToken;
    const baseUrl = flags ? this.API_FLAGS_URL : this.API_BASE_URL;
    
    if (!token || !token.trim()) {
      const error = new Error(`API token is empty or invalid for ${tokenType} token`) as APIError;
      error.tokenType = tokenType;
      error.endpoint = endpoint;
      throw error;
    }
    
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`) as APIError;
        error.status = response.status;
        error.endpoint = endpoint;
        error.tokenType = tokenType;
        
        if (response.status === 401) {
          error.message = `Authentication failed (401): The ${tokenType} API token may be expired, invalid, or lack required permissions. Please check your API token and try again.`;
        }
        
        throw error;
      }

      return response.json();
    } catch (error) {
      // Re-throw as APIError if it's not already
      if (!(error as APIError).tokenType) {
        const apiError = error as APIError;
        apiError.tokenType = tokenType;
        apiError.endpoint = endpoint;
      }
      throw error;
    }
  }
  
  // Fetch projects with pagination (preserving existing logic)
  async fetchProjects(
    onProgress?: (message: string) => void
  ): Promise<Project[]> {
    if (!this.validateTargetToken(this.targetToken)) {
      throw new Error('Invalid target token');
    }
    
    this.updateState({
      status: 'loading',
      error: null,
      currentOperation: 'Fetching projects'
    });
    
    try {
      let allData: any[] = [];
      let page = 1;
      let hasMoreData = true;
      
      while (hasMoreData) {
        // Display loading message to user (preserving existing logic)
        let currentLoadingMessage = '';
        if (page === 1) {
          currentLoadingMessage = 'Calling API for first 100 projects...';
        } else if (page === 2) {
          currentLoadingMessage = 'Calling API for next 100 projects... (200 - 300)';
        } else if (page === 3) {
          currentLoadingMessage = 'Calling API for next 100 projects... (300 - 400)';
        } else {
          currentLoadingMessage = `Sheesh you have a lot of projects! Calling API page: ${page}...`;
        }
        
        onProgress?.(currentLoadingMessage);
        
        const data = await this.makeApiCall(
          false, 
          `/projects?per_page=100&page=${page}`, 
          'target' // Use target token for fetching projects
        );
        
        allData = [...allData, ...data];
        
        if (data.length < 100) {
          hasMoreData = false;
        } else {
          page++;
        }
      }
      
      // Preserve existing filtering and sorting logic
      const filteredData = allData
        .filter((project: any) => project.platform === 'custom' && project.status === 'active')
        .sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());
      
      this.updateState({
        status: 'success',
        error: null,
        currentOperation: null
      });
      
      return filteredData;
    } catch (error) {
      const apiError = error as APIError;
      this.updateState({
        status: 'error',
        error: apiError.message,
        currentOperation: null
      });
      throw apiError;
    }
  }
  
  // Fetch environments for a project
  async fetchEnvironments(projectId: number): Promise<Environment[]> {
    if (!this.validateTargetToken(this.targetToken)) {
      throw new Error('Invalid target token');
    }
    
    this.updateState({
      status: 'loading',
      error: null,
      currentOperation: `Fetching environments for project ${projectId}`
    });
    
    try {
      const data = await this.makeApiCall(
        true, 
        `/projects/${projectId}/environments`, 
        'target' // Use target token for environments
      );
      
      this.updateState({
        status: 'success',
        error: null,
        currentOperation: null
      });
      
      return data.items || [];
    } catch (error) {
      const apiError = error as APIError;
      this.updateState({
        status: 'error',
        error: apiError.message,
        currentOperation: null
      });
      throw apiError;
    }
  }
  
  // Check if a flag exists
  async checkFlagExists(flagKey: string, projectId: number): Promise<boolean> {
    try {
      await this.makeApiCall(
        true, 
        `/projects/${projectId}/flags/${flagKey}`, 
        'target'
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Check if variable definitions exist for a flag
  async checkVariableDefinitionsExist(flagKey: string, projectId: number): Promise<boolean> {
    try {
      const response = await this.makeApiCall(
        true, 
        `/projects/${projectId}/flags/${flagKey}/variable_definitions`, 
        'target'
      );
      return response.items && Array.isArray(response.items) && response.items.length > 0;
    } catch (error) {
      return false;
    }
  }
  
  // Check if ruleset exists for a flag
  async checkRulesetExists(flagKey: string, projectId: number, environmentKey: string): Promise<boolean> {
    try {
      const response = await this.makeApiCall(
        true, 
        `/projects/${projectId}/flags/${flagKey}/environments/${environmentKey}/ruleset`, 
        'target'
      );
      return response.rules && Object.keys(response.rules).length > 0;
    } catch (error) {
      return false;
    }
  }
  
  // Create attributes (source project to target project)
  async createAttributes(sourceProjectId: number, targetProjectId: number): Promise<any> {
    this.updateState({
      status: 'loading',
      error: null,
      currentOperation: 'Creating attributes'
    });
    
    try {
      // Step 1: Get source attributes from the source project
      const sourceAttributesResponse = await this.makeApiCall(
        false, 
        `/attributes?project_id=${sourceProjectId}`, 
        'source'
      );
      
      const sourceAttributes = sourceAttributesResponse || [];
      const sourceAttributeMap: {[key: string]: any} = {};
      sourceAttributes.forEach((attribute: any) => {
        sourceAttributeMap[attribute.key] = attribute;
      });
      
      // Step 2: Get target attributes from the selected project
      const targetAttributesResponse = await this.makeApiCall(
        false, 
        `/attributes?project_id=${targetProjectId}`, 
        'target'
      );
      
      const targetAttributes = targetAttributesResponse || [];
      const targetAttributeMap: {[key: string]: any} = {};
      targetAttributes.forEach((attribute: any) => {
        targetAttributeMap[attribute.key] = attribute;
      });
      
      // Step 3: Compare and create missing attributes
      const attributesToCreate = Object.values(sourceAttributeMap).filter((sourceAttr: any) => {
        return !targetAttributeMap[sourceAttr.key];
      });
      
      const createdAttributes: any[] = [];
      
      for (const sourceAttribute of attributesToCreate) {
        const attributeData = {
          key: sourceAttribute.key,
          name: sourceAttribute.name || sourceAttribute.key,
          description: sourceAttribute.description || `Auto-generated attribute for ${sourceAttribute.key}`,
          project_id: targetProjectId
        };
        
        try {
          const response = await this.makeApiCall(
            false, 
            '/attributes', 
            'target',
            {
              method: 'POST',
              body: JSON.stringify(attributeData)
            }
          );
          
          createdAttributes.push({
            id: response.id,
            key: response.key,
            message: 'Attribute created successfully'
          });
          
          targetAttributeMap[sourceAttribute.key] = response;
        } catch (error) {
          const apiError = error as APIError;
          throw new Error(`Failed to create attribute ${sourceAttribute.key}: ${apiError.message}`);
        }
      }
      
      // Step 4: Create mapping from source IDs to target IDs
      const newAttributeMappings: {[key: string]: string} = {};
      Object.values(sourceAttributeMap).forEach((sourceAttr: any) => {
        const targetAttr = targetAttributeMap[sourceAttr.key];
        if (targetAttr) {
          newAttributeMappings[sourceAttr.id] = targetAttr.id;
        }
      });
      
      this.updateState({
        status: 'success',
        error: null,
        currentOperation: null
      });
      
      return { 
        message: `Created ${createdAttributes.length} attributes`, 
        attributes: createdAttributes, 
        mappings: newAttributeMappings,
        sourceAttributes,
        targetAttributes
      };
    } catch (error) {
      const apiError = error as APIError;
      this.updateState({
        status: 'error',
        error: apiError.message,
        currentOperation: null
      });
      throw apiError;
    }
  }
  
  // Create audiences (source project to target project)
  async createAudiences(sourceProjectId: number, targetProjectId: number): Promise<any> {
    this.updateState({
      status: 'loading',
      error: null,
      currentOperation: 'Creating audiences'
    });
    
    try {
      // Step 1: Get source audiences from the source project
      const sourceAudiencesResponse = await this.makeApiCall(
        false, 
        `/audiences?project_id=${sourceProjectId}`, 
        'source'
      );
      
      const sourceAudiences = sourceAudiencesResponse || [];
      const sourceAudienceMap: {[key: string]: any} = {};
      sourceAudiences.forEach((audience: any) => {
        sourceAudienceMap[audience.name] = audience;
      });
      
      // Step 2: Get target audiences from the selected project
      const targetAudiencesResponse = await this.makeApiCall(
        false, 
        `/audiences?project_id=${targetProjectId}`, 
        'target'
      );
      
      const targetAudiences = targetAudiencesResponse || [];
      const targetAudienceMap: {[key: string]: any} = {};
      targetAudiences.forEach((audience: any) => {
        targetAudienceMap[audience.name] = audience;
      });
      
      // Step 3: Compare and create missing audiences
      const audiencesToCreate = Object.values(sourceAudienceMap).filter((sourceAudience: any) => {
        return !targetAudienceMap[sourceAudience.name];
      });
      
      const createdAudiences: any[] = [];
      
      for (const sourceAudience of audiencesToCreate) {
        // Skip audiences that use special Optimizely system attributes
        if (sourceAudience.conditions && sourceAudience.conditions.includes('$opt_dummy_attribute')) {
          continue;
        }
        
        // Fix the conditions format to use match_type instead of match
        let fixedConditions = sourceAudience.conditions;
        if (typeof fixedConditions === 'string') {
          try {
            const parsedConditions = JSON.parse(fixedConditions);
            fixedConditions = JSON.stringify(parsedConditions).replace(/"match":/g, '"match_type":');
          } catch (e) {
            fixedConditions = fixedConditions.replace(/"match":/g, '"match_type":');
          }
        }
        
        const audienceData = {
          name: sourceAudience.name,
          description: sourceAudience.description || sourceAudience.name,
          conditions: fixedConditions,
          project_id: targetProjectId,
          segmentation: false
        };
        
        try {
          const response = await this.makeApiCall(
            false, 
            '/audiences', 
            'target',
            {
              method: 'POST',
              body: JSON.stringify(audienceData)
            }
          );
          
          createdAudiences.push({
            id: response.id,
            name: response.name,
            message: 'Audience created successfully'
          });
          
          targetAudienceMap[sourceAudience.name] = response;
        } catch (error) {
          const apiError = error as APIError;
          throw new Error(`Failed to create audience ${sourceAudience.name}: ${apiError.message}`);
        }
      }
      
      // Step 4: Create mapping from source IDs to target IDs
      const newAudienceMappings: {[key: string]: string} = {};
      Object.values(sourceAudienceMap).forEach((sourceAudience: any) => {
        const targetAudience = targetAudienceMap[sourceAudience.name];
        if (targetAudience) {
          newAudienceMappings[sourceAudience.id] = targetAudience.id;
        }
      });
      
      this.updateState({
        status: 'success',
        error: null,
        currentOperation: null
      });
      
      return { 
        message: `Created ${createdAudiences.length} audiences`, 
        audiences: createdAudiences, 
        mappings: newAudienceMappings,
        sourceAudiences,
        targetAudiences
      };
    } catch (error) {
      const apiError = error as APIError;
      this.updateState({
        status: 'error',
        error: apiError.message,
        currentOperation: null
      });
      throw apiError;
    }
  }
}

// Export singleton instance
export const optimizelyAPIService = new OptimizelyAPIService(); 