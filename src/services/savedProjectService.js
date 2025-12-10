import { api } from './api';

// Saved Project Service - Handles all saved project-related API calls
class SavedProjectService {
  
  // Get all saved projects for the current user with optional filters
  async getSavedProjects(filters = {}) {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    if (filters.field && filters.field !== 'All Fields') {
      queryParams.append('field', filters.field);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    if (filters.yearFrom && filters.yearFrom !== 'From Year') {
      queryParams.append('yearFrom', filters.yearFrom);
    }
    if (filters.yearTo && filters.yearTo !== 'To Year') {
      queryParams.append('yearTo', filters.yearTo);
    }
    if (filters.page) {
      queryParams.append('page', filters.page);
    }
    if (filters.limit) {
      queryParams.append('limit', filters.limit);
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/saved-projects?${queryString}` : '/saved-projects';
    
    return await api.get(endpoint);
  }

  // Save a project to user's saved collection
  async saveProject(projectId) {
    return await api.post('/saved-projects', {
      projectId: parseInt(projectId)
    });
  }

  // Remove a project from user's saved collection
  async unsaveProject(projectId) {
    return await api.delete(`/saved-projects/${projectId}`);
  }

  // Check if a project is saved by the current user
  async isProjectSaved(projectId) {
    try {
      const result = await this.getSavedProjects({ limit: 1000 }); // Get all saved projects
      if (result.error) {
        return false;
      }
      
      const savedProjects = result.data.savedProjects || [];
      return savedProjects.some(saved => saved.project.id === parseInt(projectId));
    } catch (error) {
      return false;
    }
  }
}

export const savedProjectService = new SavedProjectService();