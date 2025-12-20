import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import {
  useAllBookings,
  useUpdateBookingStatus,
} from "../../../hooks/useBookings";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Booking } from "../../../types";
import { useAuthStore } from "../../../store/useStore";

export default function AdminBookingsScreen() {
  const { user } = useAuthStore();
  const { data: bookings, isLoading, refetch, isRefetching } = useAllBookings();
  const updateStatusMutation = useUpdateBookingStatus();

  if (user?.role !== "admin") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Access Denied</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: bookingId,
        status: newStatus,
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading bookings..." />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">
          Booking Management
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: Booking) => (
            <Card key={booking._id} className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-bold text-gray-900 flex-1">
                  {booking.packageTitle || "Package"}
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${getStatusColor(
                    booking.status
                  )}`}
                >
                  <Text className="text-xs font-semibold capitalize">
                    {booking.status}
                  </Text>
                </View>
              </View>

              {booking.packageDestination && (
                <Text className="text-gray-600 mb-2">
                  📍 {booking.packageDestination}
                </Text>
              )}

              <View className="flex-row justify-between mb-2">
                <View>
                  <Text className="text-sm text-gray-500">Travel Date</Text>
                  <Text className="text-gray-900 font-medium">
                    {formatDate(booking.travelDate)}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-500">Travelers</Text>
                  <Text className="text-gray-900 font-medium">
                    {booking.travelers}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-500">Total</Text>
                  <Text className="text-gray-900 font-medium">
                    {formatPrice(booking.totalPrice)}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-2 mt-4 pt-4 border-t border-gray-200">
                {booking.status !== "confirmed" && (
                  <Button
                    title="Confirm"
                    onPress={() => handleStatusUpdate(booking._id, "confirmed")}
                    variant="primary"
                    className="flex-1"
                  />
                )}
                {booking.status !== "cancelled" && (
                  <Button
                    title="Cancel"
                    onPress={() => handleStatusUpdate(booking._id, "cancelled")}
                    variant="danger"
                    className="flex-1"
                  />
                )}
                {booking.status !== "completed" &&
                  booking.status === "confirmed" && (
                    <Button
                      title="Complete"
                      onPress={() =>
                        handleStatusUpdate(booking._id, "completed")
                      }
                      variant="secondary"
                      className="flex-1"
                    />
                  )}
              </View>
            </Card>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg">No bookings found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
