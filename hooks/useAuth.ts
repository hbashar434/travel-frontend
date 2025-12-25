import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/api";
import { useAuthStore } from "../store/useStore";
import { LoginCredentials, RegisterData } from "../types";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log("login api input", credentials);

      const response = await authApi.login(credentials);
      console.log("login api response", response);
      return response.data;
    },
    onSuccess: async (data) => {
      console.log("login api onSuccess data", data);
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
      console.log("Register API Input:", data); // log input data
      const response = await authApi.register(data);
      console.log("Register API Raw Response:", response); // log full response
      return response.data;
    },
    onSuccess: async (data) => {
      console.log("Register API onSuccess Data:", data); // log the data returned
      if (data.access_token && data.user) {
        await setAuth(data.user, data.access_token);
      }
    },
  });
};
