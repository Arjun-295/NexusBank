import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/chat";

export const chatApi = {
  sendMessage: async (message, history = []) => {
    try {
      const response = await axios.post(`${API_URL}/message`, {
        message: message,
        history: history
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      throw error;
    }
  }
};
