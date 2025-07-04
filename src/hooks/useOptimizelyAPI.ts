import { useState, useEffect, useCallback } from 'react';
import { optimizelyAPIService, APIState, Project, Environment } from '../services/OptimizelyAPIService';

export const useOptimizelyAPI = () => {
  const [apiState, setApiState] = useState<APIState>(optimizelyAPIService.getState());
  const [projects, setProjects] = useState<Project[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [projectsCache, setProjectsCache] = useState<Project[] | null>(null);
  const [cachedApiToken, setCachedApiToken] = useState<string>('');
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading projects...');

  // Listen to API service state changes
  useEffect(() => {
    const handleStateChange = (state: APIState) => {
      setApiState(state);
    };

    optimizelyAPIService.addStateListener(handleStateChange);
    return () => optimizelyAPIService.removeStateListener(handleStateChange);
  }, []);

  // Fetch projects with caching (preserving existing logic)
  const fetchProjects = useCallback(async (sourceToken: string, targetToken: string) => {
    // Check if we already have cached data and if the API token hasn't changed
    if (projectsCache !== null && cachedApiToken === targetToken) {
      console.log('Using cached projects data');
      setProjects(projectsCache);
      return;
    }

    // Check if we're already loading
    if (isProjectsLoading) {
      console.log('Projects are already loading, skipping duplicate request');
      return;
    }

    try {
      setIsProjectsLoading(true);
      
      // Validate target token and set it in the service
      if (!optimizelyAPIService.validateTargetToken(targetToken)) {
        throw new Error('Invalid target API token');
      }

      // Fetch projects with progress callback
      const fetchedProjects = await optimizelyAPIService.fetchProjects((message: string) => {
        setLoadingMessage(message);
      });

      // Cache the results
      setProjectsCache(fetchedProjects);
      setCachedApiToken(targetToken);
      setProjects(fetchedProjects);
      setLoadingMessage('Loading projects...'); // Reset loading message
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setLoadingMessage('Loading projects...'); // Reset loading message
      throw error;
    } finally {
      setIsProjectsLoading(false);
    }
  }, [projectsCache, cachedApiToken, isProjectsLoading]);

  // Fetch environments for a project
  const fetchEnvironments = useCallback(async (projectId: number, sourceToken: string, targetToken: string) => {
    try {
      // Validate target token and set it in the service
      if (!optimizelyAPIService.validateTargetToken(targetToken)) {
        throw new Error('Invalid target API token');
      }

      const fetchedEnvironments = await optimizelyAPIService.fetchEnvironments(projectId);
      setEnvironments(fetchedEnvironments);
    } catch (error) {
      console.error('Failed to fetch environments:', error);
      throw error;
    }
  }, []);

  // Create attributes
  const createAttributes = useCallback(async (sourceProjectId: number, targetProjectId: number, sourceToken: string, targetToken: string) => {
    // Validate tokens and set them in the service
    if (!optimizelyAPIService.validateTokens(sourceToken, targetToken)) {
      throw new Error('Invalid API tokens');
    }

    return await optimizelyAPIService.createAttributes(sourceProjectId, targetProjectId);
  }, []);

  // Create audiences
  const createAudiences = useCallback(async (sourceProjectId: number, targetProjectId: number, sourceToken: string, targetToken: string) => {
    // Validate tokens and set them in the service
    if (!optimizelyAPIService.validateTokens(sourceToken, targetToken)) {
      throw new Error('Invalid API tokens');
    }

    return await optimizelyAPIService.createAudiences(sourceProjectId, targetProjectId);
  }, []);

  // Clear projects cache
  const clearProjectsCache = useCallback(() => {
    setProjectsCache(null);
    setCachedApiToken('');
    setProjects([]);
  }, []);

  // Clear API service error
  const clearError = useCallback(() => {
    optimizelyAPIService.clearError();
  }, []);

  return {
    // State
    apiState,
    projects,
    environments,
    isProjectsLoading,
    loadingMessage,
    
    // Actions
    fetchProjects,
    fetchEnvironments,
    createAttributes,
    createAudiences,
    clearProjectsCache,
    clearError,
  };
}; 