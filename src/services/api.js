// API Service - Base HTTP client
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth headers with token
  getHeaders() {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Handle response
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      return {
        error: data.error || 'An error occurred',
        message: data.message,
        status: response.status,
        data: null
      };
    }

    return {
      data,
      error: null,
      status: response.status
    };
  }

  // GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return {
        error: 'Network error',
        message: error.message,
        status: 0,
        data: null
      };
    }
  }

  // POST request
  async post(endpoint, body) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      return this.handleResponse(response);
    } catch (error) {
      return {
        error: 'Network error',
        message: error.message,
        status: 0,
        data: null
      };
    }
  }

  // PUT request
  async put(endpoint, body) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      return this.handleResponse(response);
    } catch (error) {
      return {
        error: 'Network error',
        message: error.message,
        status: 0,
        data: null
      };
    }
  }

  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return {
        error: 'Network error',
        message: error.message,
        status: 0,
        data: null
      };
    }
  }
}

export const api = new ApiService();
