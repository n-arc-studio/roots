import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000';

export const languageService = {
  updateLanguagePreference: async (language: 'en' | 'ja') => {
    try {
      const response = await axios.put(
        `${API_URL}/api/auth/language`,
        { language },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
