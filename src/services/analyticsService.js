import { api } from './api';

// Analytics Service - Handles all analytics-related API calls
class AnalyticsService {
  
  // Get dashboard summary data
  async getDashboardSummary() {
    return await api.get('/analytics/dashboard');
  }

  // Get projects by year and field for bar chart
  async getProjectsByYear() {
    return await api.get('/analytics/projects-by-year');
  }

  // Get field distribution for pie chart
  async getFieldDistribution() {
    return await api.get('/analytics/field-distribution');
  }

  // Get top saved projects
  async getTopSavedProjects(limit = 5) {
    return await api.get(`/analytics/top-saved?limit=${limit}`);
  }

  // Get user activity metrics
  async getUserActivity() {
    return await api.get('/analytics/user-activity');
  }
}

export const analyticsService = new AnalyticsService();