import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { tokenService } from "../services/api";

interface User {
  _id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user: User, token: string) => {
    await tokenService.setToken(token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await tokenService.removeToken();
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const token = await tokenService.getToken();
      if (token) {
        // Verify token by fetching user profile
        const { usersApi } = await import("../services/api");
        const response = await usersApi.getProfile();
        set({
          user: response.data,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      await tokenService.removeToken();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
