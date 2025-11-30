// Saved Projects Service
import { api } from './api';

class SavedProjectsService {
  // Get saved projects with filters
  async getSavedProjects(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.field && filters.field !== 'All Fields') params.append('field', filters.field);
    if (filters.yearFrom && filters.yearFrom !== 'From Year') params.append('yearFrom', filters.yearFrom);
    if (filters.yearTo && filters.yearTo !== 'To Year') params.append('yearTo', filters.yearTo);

    const queryString = params.toString();
    const endpoint = queryString ? `/saved-projects?${queryString}` : '/saved-projects';
    
    const response = await api.get(endpoint);

    if (response.data) {
      return {
        success: true,
        savedProjects: response.data.savedProjects || [],
        pagination: response.data.pagination
      };
    }

    return {
      success: false,
      error: response.error,
      savedProjects: []
    };
  }

  // Save a project
  async saveProject(projectId) {
    const response = await api.post('/saved-projects', { projectId });

    if (response.status === 201) {
      return {
        success: true,
        savedProject: response.data.savedProject,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Unsave a project
  async unsaveProject(projectId) {
    const response = await api.delete(`/saved-projects/${projectId}`);

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error
    };
  }

  // Check if project is saved
  async isProjectSaved(projectId) {
    const result = await this.getSavedProjects();
    
    if (result.success) {
      return result.savedProjects.some(sp => sp.projectId === projectId);
    }
    
    return false;
  }
}

export const savedProjectsService = new SavedProjectsService();
