import api from "../api.js";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response;
  },
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    return response;
  },
  logout: () => {
    return localStorage.removeItem("access_token");
  },
  getToken: () => {
    return localStorage.getItem("access_token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },
};
