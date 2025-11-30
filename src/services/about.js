// About Content Service
import { api } from './api';

class AboutService {
  // Get about content (public)
  async getAboutContent() {
    const response = await api.get('/about');

    if (response.data && response.data.content) {
      return {
        success: true,
        content: response.data.content
      };
    }

    return {
      success: false,
      error: response.error,
      content: {
        title: 'About CapSort',
        subtitle: 'Capstone Archiving and Sorting System',
        mission: 'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines.',
        contactEmail: 'capsort@ustp.edu.ph'
      }
    };
  }

  // Update about content (admin only)
  async updateAboutContent(content) {
    const response = await api.put('/about', content);

    if (response.data) {
      return {
        success: true,
        content: response.data.content,
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

export const aboutService = new AboutService();
