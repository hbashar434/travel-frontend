import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../store/useStore";
import { Card } from "../../components/Card";

export default function AdminScreen() {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Access Denied</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Admin Panel
        </Text>

        <Card className="mb-4">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/admin/packages")}
            className="py-4"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Package Management
                </Text>
                <Text className="text-gray-600 mt-1">
                  Create, edit, and delete tour packages
                </Text>
              </View>
              <Text className="text-2xl">→</Text>
            </View>
          </TouchableOpacity>
        </Card>

        <Card className="mb-4">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/admin/bookings")}
            className="py-4"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Booking Management
                </Text>
                <Text className="text-gray-600 mt-1">
                  View and manage all bookings
                </Text>
              </View>
              <Text className="text-2xl">→</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}
