import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/insights";

export const insightsApi = {
  getSummary: async (year, month) => {
    try {
      const response = await axios.get(`${API_URL}/summary/${year}/${month}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching AI summary:", error);
      throw error;
    }
  },

  getSpendingCategories: async (year, month) => {
    try {
      const response = await axios.get(`${API_URL}/spending-categories/${year}/${month}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching spending categories:", error);
      throw error;
    }
  },

  getHealthScore: async (year, month) => {
    try {
      const response = await axios.get(`${API_URL}/health-score/${year}/${month}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching health score:", error);
      throw error;
    }
  },

  getSavingsRecommendations: async (year, month) => {
    try {
      const response = await axios.get(`${API_URL}/savings-recommendations/${year}/${month}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching savings recommendations:", error);
      throw error;
    }
  }
};
