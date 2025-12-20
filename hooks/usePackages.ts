import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { packagesApi } from "../services/api";
import { Package } from "../types";

export const usePackages = (search?: string) => {
  return useQuery({
    queryKey: ["packages", search],
    queryFn: async () => {
      const response = await packagesApi.getAll(search);
      return response.data as Package[];
    },
  });
};

export const usePackage = (id: string) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const response = await packagesApi.getById(id);
      return response.data as Package;
    },
    enabled: !!id,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await packagesApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await packagesApi.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      queryClient.invalidateQueries({ queryKey: ["package", variables.id] });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await packagesApi.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
