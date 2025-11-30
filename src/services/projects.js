// Projects Service
import { api } from './api';

class ProjectsService {
  // Get all projects with filters
  async getProjects(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.field && filters.field !== 'All Fields') params.append('field', filters.field);
    if (filters.yearFrom && filters.yearFrom !== 'From Year') params.append('yearFrom', filters.yearFrom);
    if (filters.yearTo && filters.yearTo !== 'To Year') params.append('yearTo', filters.yearTo);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const queryString = params.toString();
    const endpoint = queryString ? `/projects?${queryString}` : '/projects';
    
    const response = await api.get(endpoint);

    if (response.data) {
      return {
        success: true,
        projects: response.data.projects || [],
        pagination: response.data.pagination
      };
    }

    return {
      success: false,
      error: response.error,
      projects: []
    };
  }

  // Get project by ID
  async getProjectById(id) {
    const response = await api.get(`/projects/${id}`);

    if (response.data && response.data.project) {
      return {
        success: true,
        project: response.data.project
      };
    }

    return {
      success: false,
      error: response.error
    };
  }

  // Create project (admin only)
  async createProject(projectData) {
    const response = await api.post('/projects', projectData);

    if (response.data && response.data.project) {
      return {
        success: true,
        project: response.data.project,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Update project (admin only)
  async updateProject(id, projectData) {
    const response = await api.put(`/projects/${id}`, projectData);

    if (response.data && response.data.project) {
      return {
        success: true,
        project: response.data.project,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Delete project (admin only)
  async deleteProject(id, permanent = false) {
    const endpoint = permanent ? `/projects/${id}?permanent=true` : `/projects/${id}`;
    const response = await api.delete(endpoint);

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

  // Restore project (admin only)
  async restoreProject(id) {
    const response = await api.post(`/projects/${id}/restore`, {});

    if (response.data) {
      return {
        success: true,
        project: response.data.project,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error
    };
  }
}

export const projectsService = new ProjectsService();
