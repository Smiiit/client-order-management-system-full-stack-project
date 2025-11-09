import axios from "axios";
import { message } from "antd";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          message.error(data.message || "Bad Request");
          break;
        case 401:
          message.error("Unauthorized. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          message.error("You do not have permission to perform this action.");
          break;
        case 404:
          message.error("Resource not found.");
          break;
        case 500:
          message.error("Internal server error. Please try again later.");
          break;
        default:
          message.error(data.message || "Something went wrong!");
      }
    } else if (error.request) {
      // Request made but no response received
      message.error("No response from server. Please check your connection.");
    } else {
      // Something else happened
      message.error("Request failed. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
