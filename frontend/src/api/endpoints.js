// src/api/endpoints.js
import axiosInstance from "./axios";

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
      { refreshToken }
    );
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth/me`
    );
    return response.data;
  },
};

// Products APIs
export const productsAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/products`,
      { params }
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/products`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
    );
    return response.data;
  },
};

// Clients APIs
export const clientsAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/clients`,
      { params }
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${id}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/clients`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${id}`
    );
    return response.data;
  },
};

// Orders APIs
export const ordersAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders`,
      { params }
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/orders`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`
    );
    return response.data;
  },

  getSummary: async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/orders/summary`
    );
    return response.data;
  },
};

// Comments APIs
export const commentsAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/comments`,
      { params }
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/comments/${id}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/comments`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/comments/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_BASE_URL}/comments/${id}`
    );
    return response.data;
  },
};

// Users APIs
export const usersAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/users`,
      { params }
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/users`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
    );
    return response.data;
  },

  updatePermissions: async (id, permissions) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id}/permissions`,
      { permissions }
    );
    return response.data;
  },
};
