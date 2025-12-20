import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/api";
import { useAuthStore } from "../store/useStore";
import { LoginCredentials, RegisterData } from "../types";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authApi.login(credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.access_token && data.user) {
        await setAuth(data.user, data.access_token);
      }
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authApi.register(data);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.access_token && data.user) {
        await setAuth(data.user, data.access_token);
      }
    },
  });
};
