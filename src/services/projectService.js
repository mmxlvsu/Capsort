import { api } from './api';

// Project Service - Handles all project-related API calls
class ProjectService {
  
  // Get all projects with optional filters
  async getAllProjects(filters = {}) {
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
    const endpoint = queryString ? `/projects?${queryString}` : '/projects';
    
    return await api.get(endpoint);
  }

  // Get project by ID
  async getProjectById(id) {
    return await api.get(`/projects/${id}`);
  }

  // Create new project
  async createProject(projectData) {
    const { title, author, year, field } = projectData;
    
    return await api.post('/projects', {
      title,
      author,
      year: parseInt(year),
      field,
      fileUrl: 'https://placeholder.com/default.pdf' // Default placeholder
    });
  }

  // Update existing project
  async updateProject(id, projectData) {
    const { title, author, year, field } = projectData;
    
    return await api.put(`/projects/${id}`, {
      title,
      author,
      year: parseInt(year),
      field
    });
  }

  // Delete project (move to trash)
  async deleteProject(id) {
    return await api.delete(`/projects/${id}`);
  }

  // Permanently delete project
  async permanentlyDeleteProject(id) {
    return await api.delete(`/projects/${id}?permanent=true`);
  }

  // Restore project from trash
  async restoreProject(id) {
    return await api.put(`/projects/${id}/restore`);
  }
}

export const projectService = new ProjectService();