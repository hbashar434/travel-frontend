import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "../services/api";
import { Booking, CreateBookingData } from "../types";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["bookings", "me"],
    queryFn: async () => {
      const response = await bookingsApi.getMyBookings();
      return response.data as Booking[];
    },
  });
};

export const useAllBookings = () => {
  return useQuery({
    queryKey: ["bookings", "all"],
    queryFn: async () => {
      const response = await bookingsApi.getAll();
      return response.data as Booking[];
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBookingData) => {
      const response = await bookingsApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await bookingsApi.updateStatus(id, status);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
