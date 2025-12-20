import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { usePackage } from "../../../hooks/usePackages";
import { useCreateBooking } from "../../../hooks/useBookings";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { useAuthStore } from "../../../store/useStore";

export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pkg, isLoading } = usePackage(id);
  const { isAuthenticated } = useAuthStore();
  const [travelers, setTravelers] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const createBookingMutation = useCreateBooking();

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleBook = async () => {
    if (!isAuthenticated) {
      Alert.alert("Login Required", "Please login to book a package", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Login",
          onPress: () => router.push("/(auth)/login"),
        },
      ]);
      return;
    }

    if (!selectedDate) {
      Alert.alert("Date Required", "Please select a travel date");
      return;
    }

    if (!pkg) return;

    // Validate travelers
    if (pkg.minPersons && travelers < pkg.minPersons) {
      Alert.alert(
        "Invalid Travelers",
        `Minimum ${pkg.minPersons} travelers required`
      );
      return;
    }
    if (pkg.maxPersons && travelers > pkg.maxPersons) {
      Alert.alert(
        "Invalid Travelers",
        `Maximum ${pkg.maxPersons} travelers allowed`
      );
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        packageId: pkg._id,
        travelDate: selectedDate,
        travelers,
      });
      Alert.alert("Success", "Booking created successfully!", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/bookings"),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Booking Failed",
        error.response?.data?.message || "Failed to create booking"
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading package details..." />;
  }

  if (!pkg) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Package not found</Text>
      </View>
    );
  }

  const price = pkg.discountPrice || pkg.pricePerPerson;
  const totalPrice = price * travelers;

  return (
    <ScrollView className="flex-1 bg-white">
      {pkg.images && pkg.images.length > 0 && (
        <ScrollView horizontal pagingEnabled className="h-64">
          {pkg.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              className="w-full h-64"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      <View className="px-4 py-6">
        <View className="flex-row justify-between items-start mb-4">
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            {pkg.title}
          </Text>
          {pkg.isFeatured && (
            <View className="bg-yellow-400 px-3 py-1 rounded ml-2">
              <Text className="text-sm font-semibold">Featured</Text>
            </View>
          )}
        </View>

        {pkg.destination && (
          <Text className="text-gray-600 mb-2">📍 {pkg.destination}</Text>
        )}

        <View className="flex-row items-center mb-4">
          {pkg.discountPrice ? (
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-blue-600">
                {formatPrice(pkg.discountPrice)}
              </Text>
              <Text className="text-lg text-gray-500 line-through ml-2">
                {formatPrice(pkg.pricePerPerson)}
              </Text>
            </View>
          ) : (
            <Text className="text-2xl font-bold text-blue-600">
              {formatPrice(pkg.pricePerPerson)}
            </Text>
          )}
          <Text className="text-gray-500 ml-2">per person</Text>
        </View>

        {pkg.description && (
          <Card className="mb-4">
            <Text className="text-base text-gray-700">{pkg.description}</Text>
          </Card>
        )}

        {(pkg.durationDays || pkg.durationNights) && (
          <Card className="mb-4">
            <Text className="font-semibold text-gray-900 mb-2">Duration</Text>
            <Text className="text-gray-600">
              {pkg.durationDays && `${pkg.durationDays} days`}
              {pkg.durationNights && ` / ${pkg.durationNights} nights`}
            </Text>
          </Card>
        )}

        {pkg.included && pkg.included.length > 0 && (
          <Card className="mb-4">
            <Text className="font-semibold text-gray-900 mb-2">Included</Text>
            {pkg.included.map((item, index) => (
              <Text key={index} className="text-gray-600 mb-1">
                ✓ {item}
              </Text>
            ))}
          </Card>
        )}

        {pkg.excluded && pkg.excluded.length > 0 && (
          <Card className="mb-4">
            <Text className="font-semibold text-gray-900 mb-2">Excluded</Text>
            {pkg.excluded.map((item, index) => (
              <Text key={index} className="text-gray-600 mb-1">
                ✗ {item}
              </Text>
            ))}
          </Card>
        )}

        {pkg.meetingPoint && (
          <Card className="mb-4">
            <Text className="font-semibold text-gray-900 mb-2">
              Meeting Point
            </Text>
            <Text className="text-gray-600">{pkg.meetingPoint}</Text>
          </Card>
        )}

        {isAuthenticated && (
          <Card className="mb-4">
            <Text className="font-semibold text-gray-900 mb-4">Book Now</Text>

            {pkg.availableDates && pkg.availableDates.length > 0 && (
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Select Travel Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {pkg.availableDates.map((date, index) => {
                    const dateStr = new Date(date).toISOString().split("T")[0];
                    const isSelected = selectedDate === dateStr;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedDate(dateStr)}
                        className={`px-4 py-2 rounded-lg mr-2 ${
                          isSelected ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <Text
                          className={
                            isSelected ? "text-white" : "text-gray-700"
                          }
                        >
                          {new Date(date).toLocaleDateString()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Number of Travelers</Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setTravelers(Math.max(1, travelers - 1))}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <Text className="text-lg font-semibold">-</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-lg font-semibold">{travelers}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setTravelers(Math.min(travelers + 1, pkg.maxPersons || 10))
                  }
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <Text className="text-lg font-semibold">+</Text>
                </TouchableOpacity>
              </View>
              {pkg.minPersons && (
                <Text className="text-sm text-gray-500 mt-1">
                  Min: {pkg.minPersons} travelers
                </Text>
              )}
              {pkg.maxPersons && (
                <Text className="text-sm text-gray-500">
                  Max: {pkg.maxPersons} travelers
                </Text>
              )}
            </View>

            <View className="border-t border-gray-200 pt-4 mt-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Total Price</Text>
                <Text className="text-xl font-bold text-blue-600">
                  {formatPrice(totalPrice)}
                </Text>
              </View>
            </View>

            <Button
              title="Book Now"
              onPress={handleBook}
              loading={createBookingMutation.isPending}
              className="mt-4"
            />
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
