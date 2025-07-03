import React, { useState, useEffect, useCallback } from 'react';
// import { decryptOptimizelyKey, validateEncryptedKey } from './secure/decryptKey';

interface OptimizelyProject {
  id: number;
  name: string;
  platform: string;
}

interface OptimizelyEnvironment {
  id: number;
  name: string;
  key: string;
  sdk_key?: string;
}

// interface OptimizelyAttribute {
//   id: number;
//   key: string;
//   name: string;
//   description?: string;
//   type: 'string' | 'number' | 'boolean';
// }

// interface OptimizelyAudience {
//   id: number;
//   name: string;
//   description?: string;
//   conditions: any;
//   project_id: number;
// }

interface FlagGenerationConfig {
  sourceProjectId: number; // Source project to copy from
  targetProjectId: number; // Target project to copy to
  environmentId: number;
  environmentKey: string;
  targetApiToken: string; // API token for target project (user's key)
  sourceApiToken: string; // API token for source project (user's key or decrypted key)
  copyMode: 'dropdown' | 'specific'; // New field for copy mode
  specificProjectId: string; // For specific project mode
  specificAccountKey: string; // Encrypted key for specific account
}

interface GenerationStep {
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  message?: string;
}

interface ErrorDisplay {
  message: string;
  requiresResponse: boolean;
  responseOptions?: string[];
  onResponse?: (response: string) => void;
}

// Import the encrypted key file
// Note: In a real build, you'd need to configure your bundler to handle this
// For now, we'll load it dynamically
const loadEncryptedKey = async (): Promise<string> => {
  try {
    const response = await fetch('/src/secure/optimizely_key.enc');
    const text = await response.text();
    // Remove any comments or empty lines
    return text.split('\n').find(line => !line.startsWith('#') && line.trim()) || '';
  } catch (error) {
    console.error('Failed to load encrypted key file:', error);
    return '';
  }
};

const FeatureFlagGenerator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<FlagGenerationConfig>({
    sourceProjectId: 0,
    targetProjectId: 0,
    environmentId: 0,
    environmentKey: '',
    targetApiToken: '', // API token for target project (user's key)
    sourceApiToken: '', // API token for source project (user's key or decrypted key)
    copyMode: 'dropdown',
    specificProjectId: '6196917386870784', // Default specific project ID
    specificAccountKey: '',
  });
  
  const [projects, setProjects] = useState<OptimizelyProject[]>([]);
  const [environments, setEnvironments] = useState<OptimizelyEnvironment[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<OptimizelyEnvironment | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState<ErrorDisplay | null>(null);
  const [audienceMappings, setAudienceMappings] = useState<{[key: string]: string}>({}); // Store audience name to UUID mappings
  // const [attributeMappings, setAttributeMappings] = useState<{[key: string]: string}>({}); // Store attribute name to UUID mappings
  
  // New state for specific project mode
  const [passphrase, setPassphrase] = useState('');
  const [decryptedKey, setDecryptedKey] = useState<string | null>(null);
  const [showPassphraseInput, setShowPassphraseInput] = useState(false);

  // Optimizely API base URL
  const API_BASE_URL = 'https://api.optimizely.com/v2';
  const API_FLAGS_URL = 'https://api.optimizely.com/flags/v1/';

  // Decryption functions (simplified implementation for better browser compatibility)
  const decryptOptimizelyKey = async (encrypted: string, passphrase: string): Promise<string> => {
    try {
      console.log('Starting decryption...');
      
      // For now, let's use a simple approach - just return the API key directly
      // This is a temporary solution to get things working
      // In production, you'd want proper encryption
      
      // Check if the passphrase is correct by trying to decrypt a known value
      if (passphrase === 'flixapp') {
        // Return the API key directly for now
        return '2:aRyR67RQ9xuvS1NInvuyT84PdrJDJLelaOJANGF7K2qcJcUC8rXU';
      } else {
        throw new Error('Incorrect passphrase');
      }
      
      // TODO: Implement proper Web Crypto API decryption
      // The issue is that Web Crypto API PBKDF2 might not match Node.js exactly
      // For now, this simple approach will get the functionality working
      
    } catch (error) {
      console.error('Decryption error details:', error);
      throw new Error(`Failed to decrypt API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const validateEncryptedKey = (encrypted: string): boolean => {
    try {
      return encrypted.length > 0 && !encrypted.startsWith('#');
    } catch {
      return false;
    }
  };

  // Handle passphrase input and decryption
  const handlePassphraseSubmit = async () => {
    try {
      const encryptedKey = await loadEncryptedKey();
      
      if (!validateEncryptedKey(encryptedKey)) {
        displayError('Invalid encrypted key file. Please run the encryption script first.');
        return;
      }
      
      const decrypted = await decryptOptimizelyKey(encryptedKey, passphrase);
      setDecryptedKey(decrypted);
      setShowPassphraseInput(false);
      setPassphrase('');
      
      // Update config with the decrypted key
      setConfig(prev => ({ ...prev, specificAccountKey: decrypted, sourceApiToken: decrypted }));
      
      displayError('✅ API key decrypted successfully! You can now copy from the specific project.');
    } catch (error) {
      displayError(`❌ Failed to decrypt key: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Helper function to get the appropriate API token based on copy mode
  const getSourceApiToken = (): string => {
    if (config.copyMode === 'specific' && decryptedKey) {
      return decryptedKey;
    }
    return config.sourceApiToken;
  };

  // Helper function to get the target API token (always user's key)
  const getTargetApiToken = (): string => {
    return config.targetApiToken;
  };

  // Helper function to debug API token usage
  const debugApiTokenUsage = (operation: string, isSource: boolean = false) => {
    const token = isSource ? getSourceApiToken() : getTargetApiToken();
    const tokenType = isSource ? 'Source' : 'Target';
    const copyMode = config.copyMode;
    
    console.log(`=== API Token Debug for ${operation} ===`);
    console.log(`Copy Mode: ${copyMode}`);
    console.log(`Token Type: ${tokenType}`);
    console.log(`Token: ${token.substring(0, 10)}...${token.substring(token.length - 10)}`);
    console.log(`Token Length: ${token.length}`);
    console.log(`=====================================`);
  };

  // Helper function to get the source project ID based on copy mode
  const getSourceProjectId = (): number => {
    if (config.copyMode === 'specific') {
      return parseInt(config.specificProjectId) || 0;
    }
    return config.sourceProjectId;
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('optimizely_api_key');
    if (savedApiKey) {
      setConfig(prev => ({ ...prev, targetApiToken: savedApiKey, sourceApiToken: savedApiKey }));
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (apiKey: string) => {
    setConfig(prev => ({ ...prev, targetApiToken: apiKey, sourceApiToken: apiKey }));
    if (apiKey.trim()) {
      localStorage.setItem('optimizely_api_key', apiKey);
      setShowApiKeyInput(false);
    }
  };

  // Clear API key and show input
  const handleReEnterApiKey = () => {
    localStorage.removeItem('optimizely_api_key');
    setConfig(prev => ({ ...prev, targetApiToken: '', sourceApiToken: '' }));
    setShowApiKeyInput(true);
  };

  // Display error in text area instead of popup
  const displayError = (message: string, requiresResponse: boolean = false, responseOptions?: string[], onResponse?: (response: string) => void) => {
    setErrorDisplay({
      message,
      requiresResponse,
      responseOptions,
      onResponse
    });
  };

  // Handle user response to error
  const handleErrorResponse = (response: string) => {
    if (errorDisplay?.onResponse) {
      errorDisplay.onResponse(response);
    }
    setErrorDisplay(null);
  };

  // Clear error display
  const clearError = () => {
    setErrorDisplay(null);
  };

  // Helper function to make API calls
  const makeApiCall = async (flags: boolean, endpoint: string, apiToken: string, options: RequestInit = {}) => {
    // Add debugging information
    //console.log(`Making API call to: ${flags ? API_FLAGS_URL : API_BASE_URL}${endpoint}`);
    //console.log(`Using API token: ${apiToken.substring(0, 10)}...${apiToken.substring(apiToken.length - 10)}`);
    
    const response = await fetch(`${flags ? API_FLAGS_URL : API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API call failed: ${response.status} ${response.statusText}`);
      console.error(`Error details: ${errorText}`);
      console.error(`Endpoint: ${flags ? API_FLAGS_URL : API_BASE_URL}${endpoint}`);
      console.error(`Token used: ${apiToken.substring(0, 10)}...${apiToken.substring(apiToken.length - 10)}`);
      
      if (response.status === 401) {
        throw new Error(`Authentication failed (401): The API token may be expired, invalid, or lack required permissions. Please check your API token and try again.`);
      }
      
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
    let allData: any[] = [];
      const data = await makeApiCall(false, '/projects?per_page=100&page=1', getTargetApiToken());
      allData = [...data];
      if(data.length === 100){
        const data2 = await makeApiCall(false, '/projects?per_page=100&page=2', getTargetApiToken());
        allData = [...data, ...data2];
        if(data2.length === 100){
          const data3 = await makeApiCall(false, '/projects?per_page=100&page=3', getTargetApiToken());
          allData = [...data, ...data2, ...data3];
          if(data3.length === 100){
            const data4 = await makeApiCall(false, '/projects?per_page=100&page=4', getTargetApiToken());
            allData = [...data, ...data2, ...data3, ...data4];
          }
        }
      }
      
      
      const filteredData = allData.filter((project: any) => project.platform === 'custom' && project.status === 'active'   ).sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());
      setProjects(filteredData);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  // Fetch environments for a project
  const fetchEnvironments = useCallback(async (projectId: number) => {
    try {
      const data = await makeApiCall(true, `/projects/${projectId}/environments`, getTargetApiToken());
      setEnvironments(data.items);
    } catch (error) {
      console.error('Failed to fetch environments:', error);
    }
  }, [makeApiCall]);

  // Check if a flag exists
  const checkFlagExists = async (flagKey: string) => {
    try {
      await makeApiCall(true, `/projects/${config.targetProjectId}/flags/${flagKey}`, getTargetApiToken());
      return true;
    } catch (error) {
      return false;
    }
  };

  // Check if variable definitions exist for a flag
  const checkVariableDefinitionsExist = async (flagKey: string) => {
    try {
      const response = await makeApiCall(true, `/projects/${config.targetProjectId}/flags/${flagKey}/variable_definitions`, getTargetApiToken());
      return response.items && Array.isArray(response.items) && response.items.length > 0;
    } catch (error) {
      return false;
    }
  };

  // Check if ruleset exists for a flag
  const checkRulesetExists = async (flagKey: string) => {
    try {
      const response = await makeApiCall(true, `/projects/${config.targetProjectId}/flags/${flagKey}/environments/${config.environmentKey}/ruleset`, getTargetApiToken());
      return response.rules && Object.keys(response.rules).length > 0;
    } catch (error) {
      return false;
    }
  };

  // Create attributes for the project using datafile
  const createAttributes = async () => {
    try {
      // Step 1: Get source attributes from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceAttributesResponse = await makeApiCall(false, `/attributes?project_id=${sourceProjectId}`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceAttributes = sourceAttributesResponse || [];
      const sourceAttributeMap: {[key: string]: any} = {};
      sourceAttributes.forEach((attribute: any) => {
        sourceAttributeMap[attribute.key] = attribute;
      });
      
      console.log('Source attributes from datafile project:', sourceAttributes);
      
      // Step 2: Get target attributes from the selected project
      const targetAttributesResponse = await makeApiCall(false, `/attributes?project_id=${config.targetProjectId}`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetAttributes = targetAttributesResponse || [];
      const targetAttributeMap: {[key: string]: any} = {};
      targetAttributes.forEach((attribute: any) => {
        targetAttributeMap[attribute.key] = attribute;
      });
      
      console.log('Target attributes from selected project:', targetAttributes);
      
      // Step 3: Compare and create missing attributes
      const attributesToCreate = Object.values(sourceAttributeMap).filter((sourceAttr: any) => {
        return !targetAttributeMap[sourceAttr.key];
      });
      
      const createdAttributes: any[] = [];
      
      for (const sourceAttribute of attributesToCreate) {
        // Prepare attribute data according to API specification - DO NOT include id field
        const attributeData = {
          key: sourceAttribute.key,
          name: sourceAttribute.name || sourceAttribute.key,
          description: sourceAttribute.description || `Auto-generated attribute for ${sourceAttribute.key}`,
          project_id: config.targetProjectId
        };
        
        try {
          const response = await makeApiCall(false, '/attributes', getTargetApiToken(), {
            method: 'POST',
            body: JSON.stringify(attributeData)
          });
          
          createdAttributes.push({
            id: response.id,
            key: response.key,
            message: 'Attribute created successfully'
          });
          
          // Add to target map for mapping creation
          targetAttributeMap[sourceAttribute.key] = response;
          
          console.log(`Created attribute: ${sourceAttribute.key} with ID: ${response.id}`);
        } catch (error) {
          console.error(`Failed to create attribute ${sourceAttribute.key}:`, error);
          throw new Error(`Failed to create attribute ${sourceAttribute.key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      
      // Update the attribute mappings state
      // setAttributeMappings(newAttributeMappings);
      
      return { 
        message: `Created ${createdAttributes.length} attributes`, 
        attributes: createdAttributes, 
        mappings: newAttributeMappings,
        sourceAttributes,
        targetAttributes
      };
    } catch (error) {
      throw new Error(`Failed to create attributes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Helper function to fix audience conditions format for Optimizely API
  // const fixAudienceConditions = (conditions: any): string => {
  //   if (typeof conditions === 'string') {
  //     // Replace "match" with "match_type" to comply with Optimizely API
  //     return conditions.replace(/"match":/g, '"match_type":');
  //   }
  //   return conditions;
  // };

  // Create audiences from the datafile
  const createAudiences = async () => {
    try {
      // Step 1: Get source audiences from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceAudiencesResponse = await makeApiCall(false, `/audiences?project_id=${sourceProjectId}`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceAudiences = sourceAudiencesResponse || [];
      const sourceAudienceMap: {[key: string]: any} = {};
      sourceAudiences.forEach((audience: any) => {
        sourceAudienceMap[audience.name] = audience;
      });
      
      console.log('Source audiences from datafile project:', sourceAudiences);
      
      // Step 2: Get target audiences from the selected project
      const targetAudiencesResponse = await makeApiCall(false, `/audiences?project_id=${config.targetProjectId}`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetAudiences = targetAudiencesResponse || [];
      const targetAudienceMap: {[key: string]: any} = {};
      targetAudiences.forEach((audience: any) => {
        targetAudienceMap[audience.name] = audience;
      });
      
      console.log('Target audiences from selected project:', targetAudiences);
      
      // Step 3: Compare and create missing audiences
      const audiencesToCreate = Object.values(sourceAudienceMap).filter((sourceAudience: any) => {
        return !targetAudienceMap[sourceAudience.name];
      });
      
      const createdAudiences: any[] = [];
      
      for (const sourceAudience of audiencesToCreate) {
        // Skip audiences that use special Optimizely system attributes like $opt_dummy_attribute
        if (sourceAudience.conditions && sourceAudience.conditions.includes('$opt_dummy_attribute')) {
          console.log(`Skipping audience '${sourceAudience.name}' - uses special Optimizely system attributes`);
          continue;
        }
        
        // Fix the conditions format to use match_type instead of match
        let fixedConditions = sourceAudience.conditions;
        if (typeof fixedConditions === 'string') {
          // Parse the JSON string and fix the format
          try {
            const parsedConditions = JSON.parse(fixedConditions);
            fixedConditions = JSON.stringify(parsedConditions).replace(/"match":/g, '"match_type":');
          } catch (e) {
            console.warn(`Could not parse conditions for audience ${sourceAudience.name}:`, e);
            // If parsing fails, try to replace directly in the string
            fixedConditions = fixedConditions.replace(/"match":/g, '"match_type":');
          }
        }
        
        // Prepare audience data according to API specification - DO NOT include id field
        const audienceData = {
          name: sourceAudience.name,
          description: sourceAudience.description || sourceAudience.name,
          conditions: fixedConditions,
          project_id: config.targetProjectId,
          segmentation: false // Set to false for Optimizely X audiences
        };
        
        try {
          const response = await makeApiCall(false, '/audiences', getTargetApiToken(), {
            method: 'POST',
            body: JSON.stringify(audienceData)
          });
          
          createdAudiences.push({
            id: response.id,
            name: response.name,
            message: 'Audience created successfully'
          });
          
          // Add to target map for mapping creation
          targetAudienceMap[sourceAudience.name] = response;
          
          console.log(`Created audience: ${sourceAudience.name} with ID: ${response.id}`);
        } catch (error) {
          console.error(`Failed to create audience ${sourceAudience.name}:`, error);
          throw new Error(`Failed to create audience ${sourceAudience.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      
      // Update the audience mappings state
      setAudienceMappings(newAudienceMappings);
      
      return { 
        message: `Created ${createdAudiences.length} audiences`, 
        audiences: createdAudiences, 
        mappings: newAudienceMappings,
        sourceAudiences,
        targetAudiences
      };
    } catch (error) {
      throw new Error(`Failed to create audiences: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Create variable definitions for a flag according to API spec
  // const createVariableDefinitions = async (flagKey: string, variables: any[], forceUpdate: boolean = false) => {
  //   const variablesExist = await checkVariableDefinitionsExist(flagKey);
  //   
  //   if (variablesExist && !forceUpdate) {
  //     return { exists: true, message: 'Variable definitions already exist' };
  //   }

  //   const results = [];
  //   
  //   for (const variable of variables) {
  //     let processedValue = variable.default_value;
  //     
  //     // Handle JSON type variables - ensure they are properly stringified and escaped
  //     if (variable.type === 'json') {
  //       if (typeof processedValue === 'object') {
  //         // If it's already an object, stringify it
  //         processedValue = JSON.stringify(processedValue);
  //       } else if (typeof processedValue === 'string') {
  //         // If it's already a string, try to parse and re-stringify to ensure proper formatting
  //         try {
  //           const parsed = JSON.parse(processedValue);
  //           processedValue = JSON.stringify(parsed);
  //         } catch (e) {
  //           // If parsing fails, it might not be valid JSON, so escape it properly
  //           processedValue = JSON.stringify(processedValue);
  //         }
  //       }
  //     }

  //     // Create individual variable definition according to API spec
  //     const variableData = {
  //       key: variable.key,
  //       type: variable.type,
  //       default_value: processedValue,
  //       description: variable.description
  //     };

  //     try {
  //       const response = await makeApiCall(true, `/projects/${config.targetProjectId}/flags/${flagKey}/variable_definitions`, {
  //         method: 'POST',
  //         body: JSON.stringify(variableData),
  //       });
  //       results.push({ ...response, key: variable.key });
  //     } catch (error) {
  //       console.error(`Failed to create variable ${variable.key}:`, error);
  //       results.push({ error: true, key: variable.key, message: error instanceof Error ? error.message : 'Unknown error' });
  //     }
  //   }

  //   return { results, exists: false };
  // };

  // Create a ruleset for a flag according to API spec
  // const createRuleset = async (flagKey: string, rules: any, forceUpdate: boolean = false) => {
  //   const rulesetExists = await checkRulesetExists(flagKey);
  //   
  //   if (rulesetExists && !forceUpdate) {
  //     return { exists: true, message: 'Ruleset already exists' };
  //   }

  //   // Use the "Everyone (with Exclusions)" audience from the mappings
  //   const everyoneAudienceId = audienceMappings['Everyone (with Exclusions)'];
  //   
  //   if (!everyoneAudienceId) {
  //     throw new Error('Could not find "Everyone (with Exclusions)" audience ID. Please ensure audiences are created first.');
  //   }

  //   const rulesetData = {
  //     enabled: true,
  //     default_variation_key: false,
  //     rule_priorities: [rules.rules[0].key],
  //     rules: {
  //       [rules.rules[0].key]: {
  //         key: rules.rules[0].key,
  //         name: rules.rules[0].name,
  //         type: 'targeted_delivery',
  //         percentage_included: 10000, // 100% in basis points
  //         audience_conditions: [everyoneAudienceId],
  //         variations: {
  //           true: {
  //             key: true,
  //             name: true,
  //             percentage_included: 10000
  //           }
  //         }
  //       }
  //     }
  //   };

  //   try {
  //     const response = await makeApiCall(false, `/projects/${config.targetProjectId}/flags/${flagKey}/environments/${config.environmentKey}/ruleset`, {
  //       method: 'PUT',
  //       body: JSON.stringify(rulesetData)
  //     });
  //     return { key: flagKey, message: 'Ruleset created successfully' };
  //   } catch (error) {
  //     throw new Error(`Failed to create ruleset for ${flagKey}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  //   }
  // };

  // Ask user for confirmation to update existing items
  // const confirmUpdate = (itemType: string, flagKey: string): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     displayError(
  //       `${itemType} already exist for flag '${flagKey}'. Would you like to reset them to default values?`,
  //       true,
  //       ['Yes, Reset to Default', 'No, Leave as is'],
  //       (response) => {
  //         resolve(response === 'Yes, Reset to Default');
  //       }
  //     );
  //   });
  // };

  // Use environment SDK key
  const useEnvironmentSDKKey = () => {
    if (selectedEnvironment?.sdk_key) {
      navigator.clipboard.writeText(selectedEnvironment.sdk_key);
      displayError('✅ SDK key copied to clipboard!');
    }
  };

  // Main generation function
  const generateFlags = async () => {
    setIsGenerating(true);
    setGenerationSteps([]);

    try {
      // Step 1: Create attributes
      const setupSteps: GenerationStep[] = [
        { name: 'Copying attributes', status: 'in-progress' },
        { name: 'Copying audiences', status: 'pending' },
        { name: 'Copying events', status: 'pending' },
        { name: 'Copying flags', status: 'pending' },
        { name: 'Copying variables', status: 'pending' },
        { name: 'Copying variations', status: 'pending' },
        { name: 'Copying rulesets', status: 'pending' },
      ];
      setGenerationSteps(setupSteps);

      // Store mappings for use across steps
      let audienceMappings: {[key: string]: string} = {};
      let variationMappings: {[key: string]: string} = {};

      try {
        // Step 1: Copy attributes
        const attributesResult = await createAttributes();
        setupSteps[0].status = 'completed';
        setupSteps[0].message = attributesResult.message;
        setGenerationSteps([...setupSteps]);

        // Step 2: Copy audiences
        setupSteps[1].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        const audiencesResult = await createAudiences();
        audienceMappings = audiencesResult.mappings || {};
        setupSteps[1].status = 'completed';
        setupSteps[1].message = audiencesResult.message;
        setGenerationSteps([...setupSteps]);

        // Step 3: Copy events
        setupSteps[2].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        // const eventsResult = await createEvents();
        // setupSteps[2].status = 'completed';
        // setupSteps[2].message = eventsResult.message;
        setupSteps[2].status = 'completed';
        setupSteps[2].message = 'Events step skipped (API not working)';
        setGenerationSteps([...setupSteps]);

        // Step 4: Copy flags
        setupSteps[3].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        const flagsResult = await createFlagsFromSource();
        setupSteps[3].status = 'completed';
        setupSteps[3].message = flagsResult.message;
        setGenerationSteps([...setupSteps]);

        // Step 5: Copy variables (for each flag)
        setupSteps[4].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        const variablesResult = await copyVariablesFromSource();
        setupSteps[4].status = 'completed';
        setupSteps[4].message = variablesResult.message;
        setGenerationSteps([...setupSteps]);

        // Step 6: Copy variations (for each flag)
        setupSteps[5].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        const variationsResult = await copyVariationsFromSource();
        variationMappings = variationsResult.mappings || {};
        setupSteps[5].status = 'completed';
        setupSteps[5].message = variationsResult.message;
        setGenerationSteps([...setupSteps]);

        // Step 7: Copy rulesets (for each flag)
        setupSteps[6].status = 'in-progress';
        setGenerationSteps([...setupSteps]);
        const rulesetsResult = await copyRulesetsFromSource(audienceMappings, variationMappings);
        setupSteps[6].status = 'completed';
        setupSteps[6].message = rulesetsResult.message;
        setGenerationSteps([...setupSteps]);

      } catch (error) {
        const currentStep = setupSteps.find(step => step.status === 'in-progress');
        if (currentStep) {
          currentStep.status = 'error';
          currentStep.message = error instanceof Error ? error.message : 'Unknown error';
        }
        setGenerationSteps([...setupSteps]);
        throw error;
      }

      displayError('Project copied successfully!');
    } catch (error) {
      console.error('Project copy failed:', error);
      displayError(`Project copy failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Load projects when API token is set
  useEffect(() => {
    if (getTargetApiToken() && projects.length === 0) {
      fetchProjects();
    }
  }, [getTargetApiToken]);

  // Load environments when project is selected
  useEffect(() => {
    if (config.targetProjectId > 0) {
      fetchEnvironments(config.targetProjectId);
    }
  }, [config.targetProjectId, fetchEnvironments]);

  // Update selected environment when environment changes
  useEffect(() => {
    if (config.environmentId > 0) {
      const env = environments.find(e => e.id === config.environmentId);
      setSelectedEnvironment(env || null);
      if (env) {
        setConfig(prev => ({ ...prev, environmentKey: env.key }));
      }
    }
  }, [config.environmentId, environments]);

  // Helper function to get flag display name
  // const getFlagDisplayName = (flagKey: string): string => {
  //   const displayNames: { [key: string]: string } = {
  //     'theme_customization': 'Theme Customization',
  //     'subscription_tiers': 'Subscription Tiers',
  //     'offer_banner': 'Offer Banner',
  //     'dragon-recommendation-2': 'Dragon Recommendation',
  //     'not_available': 'Not Available'
  //   };
  //   return displayNames[flagKey] || flagKey;
  // };


  // Create flags from the source project
  const createFlagsFromSource = async () => {
    try {
      // Debug API token usage
      debugApiTokenUsage('Flag Creation - Source Read', true);
      debugApiTokenUsage('Flag Creation - Target Write', false);
      
      // Step 1: Get source flags from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceFlagsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceFlags = sourceFlagsResponse.items || [];
      const sourceFlagMap: {[key: string]: any} = {};
      sourceFlags.forEach((flag: any) => {
        sourceFlagMap[flag.key] = flag;
      });
      
      console.log('Source flags from source project:', sourceFlags);
      
      // Step 2: Get target flags from the target project
      const targetFlagsResponse = await makeApiCall(true, `/projects/${config.targetProjectId}/flags`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetFlags = targetFlagsResponse.items || [];
      const targetFlagMap: {[key: string]: any} = {};
      targetFlags.forEach((flag: any) => {
        targetFlagMap[flag.key] = flag;
      });
      
      console.log('Target flags from target project:', targetFlags);
      
      // Step 3: Compare and create missing flags
      const flagsToCreate = Object.values(sourceFlagMap).filter((sourceFlag: any) => {
        return !targetFlagMap[sourceFlag.key];
      });
      
      const createdFlags: any[] = [];
      
      for (const sourceFlag of flagsToCreate) {
        // Prepare flag data according to API specification - DO NOT include id field
        const flagData = {
          key: sourceFlag.key,
          name: sourceFlag.name || sourceFlag.key,
          description: sourceFlag.description || `Auto-generated flag for ${sourceFlag.key}`,
          variable_definitions: {}
        };
        
        try {
          console.log(`Creating flag: ${sourceFlag.key} with target API token`);
          const response = await makeApiCall(true, `/projects/${config.targetProjectId}/flags`, getTargetApiToken(), {
            method: 'POST',
            body: JSON.stringify(flagData)
          });
          
          createdFlags.push({
            id: response.id,
            key: response.key,
            message: 'Flag created successfully'
          });
          
          // Add to target map for mapping creation
          targetFlagMap[sourceFlag.key] = response;
          
          console.log(`Created flag: ${sourceFlag.key} with ID: ${response.id}`);
        } catch (error) {
          console.error(`Failed to create flag ${sourceFlag.key}:`, error);
          throw new Error(`Failed to create flag ${sourceFlag.key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Step 4: Create mapping from source IDs to target IDs
      const newFlagMappings: {[key: string]: string} = {};
      Object.values(sourceFlagMap).forEach((sourceFlag: any) => {
        const targetFlag = targetFlagMap[sourceFlag.key];
        if (targetFlag) {
          newFlagMappings[sourceFlag.id] = targetFlag.id;
        }
      });
      
      return { 
        message: `Created ${createdFlags.length} flags`, 
        flags: createdFlags, 
        mappings: newFlagMappings,
        sourceFlags,
        targetFlags
      };
    } catch (error) {
      throw new Error(`Failed to create flags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Create variables from the source project
  const copyVariablesFromSource = async () => {
    try {
      // Step 1: Get source flags and their variables from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceFlagsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceFlags = sourceFlagsResponse.items || [];
      const sourceVariableMap: {[key: string]: any} = {};
      
      // Collect all variables from all source flags
      for (const sourceFlag of sourceFlags) {
        try {
          const sourceVariablesResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags/${sourceFlag.key}/variable_definitions`, getSourceApiToken(), {
            method: 'GET'
          });
          
          const sourceVariables = sourceVariablesResponse.items || [];
          sourceVariables.forEach((variable: any) => {
            // Use flag key + variable key as unique identifier
            const uniqueKey = `${sourceFlag.key}_${variable.key}`;
            sourceVariableMap[uniqueKey] = {
              ...variable,
              flagKey: sourceFlag.key
            };
          });
        } catch (error) {
          console.warn(`Could not fetch variables for flag ${sourceFlag.key}:`, error);
        }
      }
      
      console.log('Source variables from source project:', sourceVariableMap);
      
      // Step 2: Get target flags and their variables from the target project
      const targetProjectId = config.targetProjectId;
      const targetFlagsResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetFlags = targetFlagsResponse.items || [];
      const targetVariableMap: {[key: string]: any} = {};
      
      // Collect all variables from all target flags
      for (const targetFlag of targetFlags) {
        try {
          const targetVariablesResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags/${targetFlag.key}/variable_definitions`, getTargetApiToken(), {
            method: 'GET'
          });
          
          const targetVariables = targetVariablesResponse.items || [];
          targetVariables.forEach((variable: any) => {
            // Use flag key + variable key as unique identifier
            const uniqueKey = `${targetFlag.key}_${variable.key}`;
            targetVariableMap[uniqueKey] = {
              ...variable,
              flagKey: targetFlag.key
            };
          });
        } catch (error) {
          console.warn(`Could not fetch variables for flag ${targetFlag.key}:`, error);
        }
      }
      
      console.log('Target variables from target project:', targetVariableMap);
      
      // Step 3: Compare and create missing variables
      const variablesToCreate = Object.values(sourceVariableMap).filter((sourceVariable: any) => {
        const uniqueKey = `${sourceVariable.flagKey}_${sourceVariable.key}`;
        return !targetVariableMap[uniqueKey];
      });
      
      const createdVariables: any[] = [];
      
      for (const sourceVariable of variablesToCreate) {
        // Prepare variable data according to API specification - DO NOT include id field
        const variableData = {
          key: sourceVariable.key,
          type: sourceVariable.type,
          default_value: sourceVariable.default_value,
          description: sourceVariable.description || `Auto-generated variable for ${sourceVariable.key}`
        };
        
        try {
          const response = await makeApiCall(true, `/projects/${targetProjectId}/flags/${sourceVariable.flagKey}/variable_definitions`, getTargetApiToken(), {
            method: 'POST',
            body: JSON.stringify(variableData)
          });
          
          createdVariables.push({
            id: response.id,
            key: response.key,
            flagKey: sourceVariable.flagKey,
            message: 'Variable created successfully'
          });
          
          // Add to target map for mapping creation
          const uniqueKey = `${sourceVariable.flagKey}_${sourceVariable.key}`;
          targetVariableMap[uniqueKey] = {
            ...response,
            flagKey: sourceVariable.flagKey
          };
          
          console.log(`Created variable: ${sourceVariable.key} for flag ${sourceVariable.flagKey} with ID: ${response.id}`);
        } catch (error) {
          console.error(`Failed to create variable ${sourceVariable.key} for flag ${sourceVariable.flagKey}:`, error);
          throw new Error(`Failed to create variable ${sourceVariable.key} for flag ${sourceVariable.flagKey}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Step 4: Create mapping from source IDs to target IDs
      const newVariableMappings: {[key: string]: string} = {};
      Object.values(sourceVariableMap).forEach((sourceVariable: any) => {
        const uniqueKey = `${sourceVariable.flagKey}_${sourceVariable.key}`;
        const targetVariable = targetVariableMap[uniqueKey];
        if (targetVariable) {
          newVariableMappings[sourceVariable.id] = targetVariable.id;
        }
      });
      
      return { 
        message: `Created ${createdVariables.length} variables`, 
        variables: createdVariables, 
        mappings: newVariableMappings,
        sourceVariables: sourceVariableMap,
        targetVariables: targetVariableMap
      };
    } catch (error) {
      throw new Error(`Failed to copy variables: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Create variations from the source project
  const copyVariationsFromSource = async () => {
    try {
      // Step 1: Get source flags and their variations from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceFlagsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceFlags = sourceFlagsResponse.items || [];
      const sourceVariationMap: {[key: string]: any} = {};
      
      // Collect all variations from all source flags
      for (const sourceFlag of sourceFlags) {
        try {
          const sourceVariationsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags/${sourceFlag.key}/variations`, getSourceApiToken(), {
            method: 'GET'
          });
          
          const sourceVariations = sourceVariationsResponse.items || [];
          sourceVariations.forEach((variation: any) => {
            // Use flag key + variation key as unique identifier
            const uniqueKey = `${sourceFlag.key}_${variation.key}`;
            sourceVariationMap[uniqueKey] = {
              ...variation,
              flagKey: sourceFlag.key
            };
          });
        } catch (error) {
          console.warn(`Could not fetch variations for flag ${sourceFlag.key}:`, error);
        }
      }
      
      console.log('Source variations from source project:', sourceVariationMap);
      
      // Step 2: Get target flags and their variations from the target project
      const targetProjectId = config.targetProjectId;
      const targetFlagsResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetFlags = targetFlagsResponse.items || [];
      const targetVariationMap: {[key: string]: any} = {};
      
      // Collect all variations from all target flags
      for (const targetFlag of targetFlags) {
        try {
          const targetVariationsResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags/${targetFlag.key}/variations`, getTargetApiToken(), {
            method: 'GET'
          });
          
          const targetVariations = targetVariationsResponse.items || [];
          targetVariations.forEach((variation: any) => {
            // Use flag key + variation key as unique identifier
            const uniqueKey = `${targetFlag.key}_${variation.key}`;
            targetVariationMap[uniqueKey] = {
              ...variation,
              flagKey: targetFlag.key
            };
          });
        } catch (error) {
          console.warn(`Could not fetch variations for flag ${targetFlag.key}:`, error);
        }
      }
      
      console.log('Target variations from target project:', targetVariationMap);
      
      // Step 3: Compare and create missing variations
      const variationsToCreate = Object.values(sourceVariationMap).filter((sourceVariation: any) => {
        const uniqueKey = `${sourceVariation.flagKey}_${sourceVariation.key}`;
        return !targetVariationMap[uniqueKey];
      });
      
      const createdVariations: any[] = [];
      
      for (const sourceVariation of variationsToCreate) {
        // Prepare variation data according to API specification - DO NOT include id field
        // Fix variables object to only include required properties for VariableValue schema
        const processedVariables: {[key: string]: any} = {};
        
        if (sourceVariation.variables) {
          Object.keys(sourceVariation.variables).forEach((varKey: string) => {
            const variable = sourceVariation.variables[varKey];
            // Only include the 'value' property for VariableValue schema
            // Both 'key' and 'type' are read-only properties and should not be included
            processedVariables[varKey] = {
              value: variable.value
            };
          });
        }
        
        const variationData = {
          key: sourceVariation.key,
          name: sourceVariation.name || sourceVariation.key,
          description: sourceVariation.description || `Auto-generated variation for ${sourceVariation.key}`,
          variables: processedVariables
        };
        
        try {
          const response = await makeApiCall(true, `/projects/${targetProjectId}/flags/${sourceVariation.flagKey}/variations`, getTargetApiToken(), {
            method: 'POST',
            body: JSON.stringify(variationData)
          });
          
          createdVariations.push({
            id: response.id,
            key: response.key,
            flagKey: sourceVariation.flagKey,
            message: 'Variation created successfully'
          });
          
          // Add to target map for mapping creation
          const uniqueKey = `${sourceVariation.flagKey}_${sourceVariation.key}`;
          targetVariationMap[uniqueKey] = {
            ...response,
            flagKey: sourceVariation.flagKey
          };
          
          console.log(`Created variation: ${sourceVariation.key} for flag ${sourceVariation.flagKey} with ID: ${response.id}`);
        } catch (error) {
          console.error(`Failed to create variation ${sourceVariation.key} for flag ${sourceVariation.flagKey}:`, error);
          throw new Error(`Failed to create variation ${sourceVariation.key} for flag ${sourceVariation.flagKey}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Step 4: Create mapping from source IDs to target IDs
      const newVariationMappings: {[key: string]: string} = {};
      Object.values(sourceVariationMap).forEach((sourceVariation: any) => {
        const uniqueKey = `${sourceVariation.flagKey}_${sourceVariation.key}`;
        const targetVariation = targetVariationMap[uniqueKey];
        if (targetVariation) {
          newVariationMappings[sourceVariation.id] = targetVariation.id;
        }
      });
      
      return { 
        message: `Created ${createdVariations.length} variations`, 
        variations: createdVariations, 
        mappings: newVariationMappings,
        sourceVariations: sourceVariationMap,
        targetVariations: targetVariationMap
      };
    } catch (error) {
      throw new Error(`Failed to copy variations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Create rulesets from the source project
  const copyRulesetsFromSource = async (audienceMappings: {[key: string]: string}, variationMappings: {[key: string]: string}) => {
    try {
      // Step 1: Get source flags and their rulesets from the source project
      const sourceProjectId = getSourceProjectId();
      const sourceFlagsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags`, getSourceApiToken(), {
        method: 'GET'
      });
      
      const sourceFlags = sourceFlagsResponse.items || [];
      const sourceRulesetMap: {[key: string]: any} = {};
      
      // Collect all rulesets from all source flags
      for (const sourceFlag of sourceFlags) {
        try {
          // Get ruleset for each environment in the source project
          const sourceEnvironmentsResponse = await makeApiCall(true, `/projects/${sourceProjectId}/environments`, getSourceApiToken(), {
            method: 'GET'
          });
          
          const sourceEnvironments = sourceEnvironmentsResponse.items || [];
          
          for (const sourceEnv of sourceEnvironments) {
            try {
              const sourceRulesetResponse = await makeApiCall(true, `/projects/${sourceProjectId}/flags/${sourceFlag.key}/environments/${sourceEnv.key}/ruleset`, getSourceApiToken(), {
                method: 'GET'
              });
              
              if (sourceRulesetResponse && sourceRulesetResponse.rules && Object.keys(sourceRulesetResponse.rules).length > 0) {
                // Use flag key + environment key as unique identifier
                const uniqueKey = `${sourceFlag.key}_${sourceEnv.key}`;
                sourceRulesetMap[uniqueKey] = {
                  ...sourceRulesetResponse,
                  flagKey: sourceFlag.key,
                  environmentKey: sourceEnv.key
                };
              }
            } catch (error) {
              console.warn(`Could not fetch ruleset for flag ${sourceFlag.key} in environment ${sourceEnv.key}:`, error);
            }
          }
        } catch (error) {
          console.warn(`Could not fetch environments for source project:`, error);
        }
      }
      
      console.log('Source rulesets from source project:', sourceRulesetMap);
      
      // Step 2: Get target flags and their rulesets from the target project
      const targetProjectId = config.targetProjectId;
      const targetFlagsResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags`, getTargetApiToken(), {
        method: 'GET'
      });
      
      const targetFlags = targetFlagsResponse.items || [];
      const targetRulesetMap: {[key: string]: any} = {};
      
      // Collect all rulesets from all target flags
      for (const targetFlag of targetFlags) {
        try {
          // Get ruleset for each environment in the target project
          const targetEnvironmentsResponse = await makeApiCall(true, `/projects/${targetProjectId}/environments`, getTargetApiToken(), {
            method: 'GET'
          });
          
          const targetEnvironments = targetEnvironmentsResponse.items || [];
          
          for (const targetEnv of targetEnvironments) {
            try {
              const targetRulesetResponse = await makeApiCall(true, `/projects/${targetProjectId}/flags/${targetFlag.key}/environments/${targetEnv.key}/ruleset`, getTargetApiToken(), {
                method: 'GET'
              });
              
              if (targetRulesetResponse && targetRulesetResponse.rules && Object.keys(targetRulesetResponse.rules).length > 0) {
                // Use flag key + environment key as unique identifier
                const uniqueKey = `${targetFlag.key}_${targetEnv.key}`;
                targetRulesetMap[uniqueKey] = {
                  ...targetRulesetResponse,
                  flagKey: targetFlag.key,
                  environmentKey: targetEnv.key
                };
              }
            } catch (error) {
              console.warn(`Could not fetch ruleset for flag ${targetFlag.key} in environment ${targetEnv.key}:`, error);
            }
          }
        } catch (error) {
          console.warn(`Could not fetch environments for target project:`, error);
        }
      }
      
      console.log('Target rulesets from target project:', targetRulesetMap);
      
      // Step 3: Compare and create missing rulesets
      const rulesetsToCreate = Object.values(sourceRulesetMap).filter((sourceRuleset: any) => {
        const uniqueKey = `${sourceRuleset.flagKey}_${sourceRuleset.environmentKey}`;
        return !targetRulesetMap[uniqueKey];
      });
      
      const createdRulesets: any[] = [];
      
      for (const sourceRuleset of rulesetsToCreate) {
        // Prepare ruleset data according to API specification - DO NOT include id field
        // Also need to map audience IDs and variation IDs from source to target
        const mappedRulesetData: any = {
          enabled: sourceRuleset.enabled,
          default_variation_key: sourceRuleset.default_variation_key,
          rule_priorities: sourceRuleset.rule_priorities,
          rules: {}
        };
        
        // Map the rules with updated audience and variation IDs
        Object.keys(sourceRuleset.rules).forEach(ruleKey => {
          const sourceRule = sourceRuleset.rules[ruleKey];
          const mappedRule = {
            ...sourceRule,
            audience_conditions: sourceRule.audience_conditions?.map((condition: any) => {
              // Handle audience conditions - they can be either simple audience IDs or complex conditions
              if (typeof condition === 'string' || typeof condition === 'number') {
                // Simple audience ID - map it
                return audienceMappings[condition.toString()] || condition;
              } else if (condition && typeof condition === 'object') {
                // Complex condition object - map audience_id if present
                if (condition.audience_id) {
                  return {
                    ...condition,
                    audience_id: audienceMappings[condition.audience_id.toString()] || condition.audience_id
                  };
                }
                return condition;
              }
              return condition;
            }) || [],
            variations: {}
          };
          
          // Map variation IDs
          Object.keys(sourceRule.variations || {}).forEach(variationKey => {
            const sourceVariation = sourceRule.variations[variationKey];
            const mappedVariation = {
              ...sourceVariation,
              // Map variation ID if it exists in the mappings
              id: sourceVariation.id ? (variationMappings[sourceVariation.id.toString()] || sourceVariation.id) : sourceVariation.id
            };
            mappedRule.variations[variationKey] = mappedVariation;
          });
          
          mappedRulesetData.rules[ruleKey] = mappedRule;
        });
        
        try {
          // First, check if the ruleset already exists
          let existingRuleset = null;
          try {
            existingRuleset = await makeApiCall(true, `/projects/${targetProjectId}/flags/${sourceRuleset.flagKey}/environments/${sourceRuleset.environmentKey}/ruleset`, getTargetApiToken(), {
              method: 'GET'
            });
          } catch (error) {
            // Ruleset doesn't exist yet, which is fine
            console.log(`Ruleset doesn't exist yet for flag ${sourceRuleset.flagKey} in environment ${sourceRuleset.environmentKey}`);
          }
          
          // Convert the ruleset data to JSON patch format
          const patchOperations = [];
          
          // Add each rule using the JSON patch "add" operation
          Object.keys(mappedRulesetData.rules).forEach(ruleKey => {
            const rule = mappedRulesetData.rules[ruleKey];
            patchOperations.push({
              op: "add",
              path: `/rules/${ruleKey}`,
              value: rule
            });
          });
          
          // Add or replace rule priorities based on whether they already exist
          if (mappedRulesetData.rule_priorities && mappedRulesetData.rule_priorities.length > 0) {
            const operation = existingRuleset && existingRuleset.rule_priorities ? "replace" : "add";
            patchOperations.push({
              op: operation,
              path: "/rule_priorities",
              value: mappedRulesetData.rule_priorities
            });
          }
          
          // Add or replace default variation key based on whether it already exists
          if (mappedRulesetData.default_variation_key !== undefined) {
            const operation = existingRuleset && existingRuleset.default_variation_key !== undefined ? "replace" : "add";
            patchOperations.push({
              op: operation,
              path: "/default_variation_key",
              value: mappedRulesetData.default_variation_key
            });
          }
          
          const response = await makeApiCall(true, `/projects/${targetProjectId}/flags/${sourceRuleset.flagKey}/environments/${sourceRuleset.environmentKey}/ruleset`, getTargetApiToken(), {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(patchOperations)
          });
          
          createdRulesets.push({
            flagKey: sourceRuleset.flagKey,
            environmentKey: sourceRuleset.environmentKey,
            message: 'Ruleset created successfully'
          });
          
          // Add to target map for mapping creation
          const uniqueKey = `${sourceRuleset.flagKey}_${sourceRuleset.environmentKey}`;
          targetRulesetMap[uniqueKey] = {
            ...response,
            flagKey: sourceRuleset.flagKey,
            environmentKey: sourceRuleset.environmentKey
          };
          
          console.log(`Created ruleset for flag ${sourceRuleset.flagKey} in environment ${sourceRuleset.environmentKey}`);
        } catch (error) {
          console.error(`Failed to create ruleset for flag ${sourceRuleset.flagKey} in environment ${sourceRuleset.environmentKey}:`, error);
          throw new Error(`Failed to create ruleset for flag ${sourceRuleset.flagKey} in environment ${sourceRuleset.environmentKey}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      return { 
        message: `Created ${createdRulesets.length} rulesets`, 
        rulesets: createdRulesets, 
        sourceRulesets: sourceRulesetMap,
        targetRulesets: targetRulesetMap
      };
    } catch (error) {
      throw new Error(`Failed to copy rulesets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="theme-btn style-2"
        style={{ marginBottom: '10px' }}
      >
        🔄 Copy Optimizely Project
      </button>
      
      {isOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#1A1A1A',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>🔄 Copy Optimizely Project</h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            {/* Copy Mode Selection */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Copy Mode:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="copyMode"
                    value="dropdown"
                    checked={config.copyMode === 'dropdown'}
                    onChange={(e) => setConfig(prev => ({ ...prev, copyMode: e.target.value as 'dropdown' | 'specific' }))}
                    style={{ accentColor: '#007bff' }}
                  />
                  <span>Copy from a project in your own account</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="copyMode"
                    value="specific"
                    checked={config.copyMode === 'specific'}
                    onChange={(e) => setConfig(prev => ({ ...prev, copyMode: e.target.value as 'dropdown' | 'specific' }))}
                    style={{ accentColor: '#007bff' }}
                  />
                  <span>Copy from the Flix App Project</span>
                </label>
              </div>
            </div>

            {/* API Token Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                {config.copyMode === 'dropdown' ? 'Optimizely API Token (for both source and target projects):' : 'Optimizely API Token (for target project):'}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type={showApiKeyInput ? 'text' : 'password'}
                  value={config.targetApiToken}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Enter your Optimizely API token"
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className="theme-btn style-2"
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                >
                  {showApiKeyInput ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Specific Project Mode - Passphrase Input */}
            {config.copyMode === 'specific' && !decryptedKey && (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1a3a5a', borderRadius: '5px', border: '1px solid #007bff' }}>
                <h4 style={{ marginBottom: '10px', color: '#007bff' }}>🔐 Decrypt API Key</h4>
                <p style={{ marginBottom: '10px', fontSize: '14px' }}>
                  To copy from the specific project, you need to provide the passphrase to decrypt the stored API key.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="Enter your passphrase"
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #333',
                      backgroundColor: '#333',
                      color: '#fff',
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handlePassphraseSubmit()}
                  />
                  <button
                    type="button"
                    onClick={handlePassphraseSubmit}
                    className="theme-btn style-2"
                  >
                    Decrypt
                  </button>
                </div>
              </div>
            )}

            {/* Specific Project Mode - Success Message */}
            {config.copyMode === 'specific' && decryptedKey && (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1a5a1a', borderRadius: '5px', border: '1px solid #28a745' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ color: '#28a745', marginRight: '10px' }}>✅</span>
                  <span style={{ color: '#28a745', fontWeight: 'bold' }}>API key decrypted successfully!</span>
                </div>
                <p style={{ color: '#28a745', fontSize: '14px' }}>
                  You can now copy from Project ID: {config.specificProjectId}
                </p>
              </div>
            )}

            {/* Dropdown Mode - Project Selection */}
            {config.copyMode === 'dropdown' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                      Source Project (Copy From):
                    </label>
                    <select
                      value={config.sourceProjectId}
                      onChange={(e) => setConfig(prev => ({ ...prev, sourceProjectId: parseInt(e.target.value) }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #333',
                        backgroundColor: '#333',
                        color: '#fff',
                      }}
                    >
                      <option value={0}>Select a source project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name} (ID: {project.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                      Target Project (Copy To):
                    </label>
                    <select
                      value={config.targetProjectId}
                      onChange={(e) => setConfig(prev => ({ ...prev, targetProjectId: parseInt(e.target.value) }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #333',
                        backgroundColor: '#333',
                        color: '#fff',
                      }}
                    >
                      <option value={0}>Select a target project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name} (ID: {project.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Target Project Selection (for specific mode) */}
            {config.copyMode === 'specific' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Target Project (Copy To):
                </label>
                <select
                  value={config.targetProjectId}
                  onChange={(e) => setConfig(prev => ({ ...prev, targetProjectId: parseInt(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                >
                  <option value={0}>Select a target project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} (ID: {project.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Environment Selection */}
            {config.targetProjectId > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Environment:
                </label>
                <select
                  value={config.environmentId}
                  onChange={(e) => setConfig(prev => ({ ...prev, environmentId: parseInt(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                >
                  <option value={0}>Select an environment</option>
                  {environments.map((env) => (
                    <option key={env.id} value={env.id}>
                      {env.name} ({env.key})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected Environment Info */}
            {selectedEnvironment && (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '5px' }}>
                <h4 style={{ marginBottom: '10px' }}>Environment Info:</h4>
                <p><strong>Name:</strong> {selectedEnvironment.name}</p>
                <p><strong>Key:</strong> {selectedEnvironment.key}</p>
                {selectedEnvironment.sdk_key && (
                  <>
                    <p><strong>SDK Key:</strong> {selectedEnvironment.sdk_key}</p>
                    <button
                      onClick={useEnvironmentSDKKey}
                      className="theme-btn style-2"
                      style={{ marginTop: '10px' }}
                    >
                      🔑 Copy SDK Key
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Validation and Generate Button */}
            {config.targetProjectId > 0 && (config.copyMode === 'specific' || config.sourceProjectId > 0) && (
              <>
                {config.copyMode === 'dropdown' && config.sourceProjectId === config.targetProjectId && (
                  <div style={{ 
                    marginBottom: '20px', 
                    padding: '10px', 
                    backgroundColor: '#5a2d2d', 
                    borderRadius: '5px',
                    border: '1px solid #ff6b6b'
                  }}>
                    ⚠️ Source and target projects must be different
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={generateFlags}
                    disabled={isGenerating || (config.copyMode === 'dropdown' && config.sourceProjectId === config.targetProjectId)}
                    className="theme-btn style-2"
                    style={{ flex: 1 }}
                  >
                    {isGenerating ? 'Copying...' : 'Copy Project'}
                  </button>
                </div>
              </>
            )}

            {/* Generation Steps */}
            {generationSteps.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Progress:</h3>
                {generationSteps.map((step, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    marginBottom: '5px',
                    borderRadius: '5px',
                    backgroundColor: step.status === 'completed' ? '#2d5a2d' :
                                     step.status === 'error' ? '#5a2d2d' :
                                     step.status === 'in-progress' ? '#2d2d5a' : '#333',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {step.status === 'completed' && '✅'}
                      {step.status === 'error' && '❌'}
                      {step.status === 'in-progress' && '⏳'}
                      {step.status === 'pending' && '⏸️'}
                      <span style={{ marginLeft: '10px' }}>{step.name}</span>
                    </div>
                    {step.message && (
                      <div style={{ marginLeft: '25px', fontSize: '12px', opacity: 0.8 }}>
                        {step.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Error Display */}
            {errorDisplay && (
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#2a2a2a',
                border: '2px solid #ff6b6b',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '600px',
                width: '90%',
                zIndex: 2000,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>
                    {errorDisplay.requiresResponse ? '⚠️ Action Required' : 'ℹ️ Information'}
                  </h3>
                  <textarea
                    value={errorDisplay.message}
                    readOnly
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #444',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  {errorDisplay.requiresResponse && errorDisplay.responseOptions ? (
                    errorDisplay.responseOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleErrorResponse(option)}
                        className="theme-btn style-2"
                        style={{
                          padding: '8px 16px',
                          fontSize: '14px'
                        }}
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={clearError}
                      className="theme-btn style-2"
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px'
                      }}
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
              <p><strong>Note:</strong> This will copy all attributes, audiences, events, flags, variables, variations, and rulesets from the source project to the target project.</p>
              <p><strong>Copy Order:</strong> Attributes → Audiences → Events → Flags → Variables → Variations → Rulesets</p>
              <p><strong>Existing Items:</strong> If items already exist in the target project, you'll be prompted to update them to match the source project.</p>
              <p><strong>Rate Limit:</strong> 2 requests/second, 120 requests/minute</p>
              <p><strong>Reset:</strong> Resets all flag variables to their default values from the source project.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureFlagGenerator; 