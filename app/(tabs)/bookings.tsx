import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useMyBookings } from "../../hooks/useBookings";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Card } from "../../components/Card";
import { Booking } from "../../types";

export default function BookingsScreen() {
  const { data: bookings, isLoading, refetch, isRefetching } = useMyBookings();

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

  const renderBooking = (booking: Booking) => (
    <TouchableOpacity
      key={booking._id}
      onPress={() => router.push(`/(tabs)/booking/${booking._id}`)}
      className="mb-4"
    >
      <Card>
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
          {booking.endDate && (
            <View>
              <Text className="text-sm text-gray-500">End Date</Text>
              <Text className="text-gray-900 font-medium">
                {formatDate(booking.endDate)}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <View>
            <Text className="text-sm text-gray-500">Travelers</Text>
            <Text className="text-gray-900 font-semibold">
              {booking.travelers}{" "}
              {booking.travelers === 1 ? "person" : "people"}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-sm text-gray-500">Total Price</Text>
            <Text className="text-xl font-bold text-blue-600">
              {formatPrice(booking.totalPrice)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading bookings..." />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {bookings && bookings.length > 0 ? (
          bookings.map(renderBooking)
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg mb-4">
              No bookings found
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Browse Packages</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
