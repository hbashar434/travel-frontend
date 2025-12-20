import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token storage keys
const TOKEN_KEY = "auth_token";

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Token management helpers
export const tokenService = {
  async setToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  async getToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  async removeToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};

// API endpoints
export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
};

export const packagesApi = {
  getAll: (search?: string) => api.get("/packages", { params: { search } }),
  getById: (id: string) => api.get(`/packages/${id}`),
  create: (data: FormData) =>
    api.post("/packages", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: string, data: FormData) =>
    api.put(`/packages/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/packages/${id}`),
};

export const bookingsApi = {
  create: (data: {
    packageId: string;
    travelDate: string;
    travelers: number;
    notes?: string;
  }) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/me"),
  getAll: () => api.get("/bookings"),
  updateStatus: (id: string, status: string) =>
    api.put(`/bookings/${id}/status`, { status }),
};

export const usersApi = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (data: { name?: string; password?: string }) =>
    api.put("/users/me", data),
};
