import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { usePackages } from "../../hooks/usePackages";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Card } from "../../components/Card";
import { Package } from "../../types";

export default function PackagesScreen() {
  const [search, setSearch] = useState("");
  const {
    data: packages,
    isLoading,
    refetch,
    isRefetching,
  } = usePackages(search || undefined);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderPackage = (pkg: Package) => (
    <TouchableOpacity
      key={pkg._id}
      onPress={() => router.push(`/(tabs)/package/${pkg._id}`)}
      className="mb-4"
    >
      <Card>
        {pkg.images && pkg.images.length > 0 && (
          <Image
            source={{ uri: pkg.images[0] }}
            className="w-full h-48 rounded-t-lg mb-3"
            resizeMode="cover"
          />
        )}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-900 flex-1">
            {pkg.title}
          </Text>
          {pkg.isFeatured && (
            <View className="bg-yellow-400 px-2 py-1 rounded ml-2">
              <Text className="text-xs font-semibold">Featured</Text>
            </View>
          )}
        </View>
        {pkg.shortDescription && (
          <Text className="text-gray-600 mb-2" numberOfLines={2}>
            {pkg.shortDescription}
          </Text>
        )}
        {pkg.destination && (
          <Text className="text-gray-500 text-sm mb-2">
            📍 {pkg.destination}
          </Text>
        )}
        <View className="flex-row justify-between items-center mt-2">
          <View>
            {pkg.discountPrice ? (
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-blue-600">
                  {formatPrice(pkg.discountPrice)}
                </Text>
                <Text className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(pkg.pricePerPerson)}
                </Text>
              </View>
            ) : (
              <Text className="text-lg font-bold text-blue-600">
                {formatPrice(pkg.pricePerPerson)}
              </Text>
            )}
            <Text className="text-xs text-gray-500">per person</Text>
          </View>
          {pkg.durationDays && (
            <Text className="text-sm text-gray-600">
              {pkg.durationDays} {pkg.durationDays === 1 ? "day" : "days"}
            </Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading packages..." />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          placeholder="Search packages..."
          value={search}
          onChangeText={setSearch}
          className="bg-gray-100 rounded-lg px-4 py-2 text-base"
          autoCapitalize="none"
        />
      </View>
      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {packages && packages.length > 0 ? (
          packages.map(renderPackage)
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg">No packages found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
