// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/endpoints";
import {
  validateAuthResponse,
  debugResponse,
} from "../../utils/responseHelper";

// Get initial state from localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);

      // Debug the response
      debugResponse(response, "Login");

      // Validate and extract token and user
      const { token, refreshToken, user } = validateAuthResponse(response);

      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      console.log("✅ Token stored:", token);
      console.log("✅ User stored:", user);

      return { token, user };
    } catch (error) {
      console.error("❌ Login error:", error);
      return rejectWithValue(
        error.message || error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);

      // Debug the response
      debugResponse(response, "Register");

      // Handle different response structures
      const data = response.data || response;

      console.log("✅ Registration successful");

      // For registration, we'll just return success without auto-login
      return {
        success: true,
        message: data.message || "Registration successful",
      };
    } catch (error) {
      console.error("❌ Registration error:", error);
      return rejectWithValue(
        error.message || error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authAPI.logout({ refreshToken });
      }
    } catch (error) {
      // Ignore API errors, still log out
    }
    // Clear everything immediately
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return null;
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Don't auto-login after registration
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
