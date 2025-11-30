// Authentication Service
import { api } from './api';

class AuthService {
  // Register student
  async register(data) {
    const response = await api.post('/auth/register', {
      fullName: data.fullName,
      contactNumber: data.contactNumber,
      email: data.email,
      password: data.password
    });

    if (response.data) {
      return {
        success: true,
        user: response.data.user,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Student login
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });

    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Admin login
  async adminLogin(email, password) {
    const response = await api.post('/auth/admin/login', { email, password });

    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me');

    if (response.data && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return {
        success: true,
        user: response.data.user
      };
    }

    return {
      success: false,
      error: response.error
    };
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Check if authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Check if admin
  isAdmin() {
    const user = this.getStoredUser();
    return user?.role === 'admin';
  }

  // Check if student
  isStudent() {
    const user = this.getStoredUser();
    return user?.role === 'student';
  }

  // Request password reset
  async requestPasswordReset(email) {
    const response = await api.post('/auth/forgot-password', { email });

    if (response.data) {
      return {
        success: true,
        message: response.data.message,
        // Development only - remove in production
        resetLink: response.data.resetLink,
        resetToken: response.data.resetToken
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }

  // Reset password with token
  async resetPassword(token, newPassword) {
    const response = await api.post('/auth/reset-password', { token, newPassword });

    if (response.data) {
      return {
        success: true,
        message: response.data.message
      };
    }

    return {
      success: false,
      error: response.error,
      message: response.message
    };
  }
}

export const authService = new AuthService();
