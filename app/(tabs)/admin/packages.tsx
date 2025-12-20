import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { usePackages } from "../../../hooks/usePackages";
import { useDeletePackage } from "../../../hooks/usePackages";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Package } from "../../../types";
import { useAuthStore } from "../../../store/useStore";

export default function AdminPackagesScreen() {
  const { user } = useAuthStore();
  const { data: packages, isLoading, refetch, isRefetching } = usePackages();
  const deletePackageMutation = useDeletePackage();

  if (user?.role !== "admin") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Access Denied</Text>
      </View>
    );
  }

  const handleDelete = (pkg: Package) => {
    Alert.alert(
      "Delete Package",
      `Are you sure you want to delete "${pkg.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePackageMutation.mutateAsync(pkg._id);
              Alert.alert("Success", "Package deleted successfully");
            } catch (error: any) {
              Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to delete package"
              );
            }
          },
        },
      ]
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading packages..." />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">
          Package Management
        </Text>
        <Button
          title="+ Add Package"
          onPress={() => router.push("/(tabs)/admin/packages/create")}
          className="px-4 py-2"
        />
      </View>

      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {packages && packages.length > 0 ? (
          packages.map((pkg) => (
            <Card key={pkg._id} className="mb-4">
              {pkg.images && pkg.images.length > 0 && (
                <Image
                  source={{ uri: pkg.images[0] }}
                  className="w-full h-40 rounded-t-lg mb-3"
                  resizeMode="cover"
                />
              )}
              <Text className="text-lg font-bold text-gray-900 mb-2">
                {pkg.title}
              </Text>
              {pkg.shortDescription && (
                <Text className="text-gray-600 mb-2" numberOfLines={2}>
                  {pkg.shortDescription}
                </Text>
              )}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-blue-600 font-semibold">
                  {formatPrice(pkg.pricePerPerson)} per person
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${
                    pkg.status === "active" ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      pkg.status === "active"
                        ? "text-green-800"
                        : "text-gray-800"
                    }`}
                  >
                    {pkg.status || "inactive"}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-2 mt-3 pt-3 border-t border-gray-200">
                <Button
                  title="Edit"
                  onPress={() =>
                    router.push(`/(tabs)/admin/packages/edit/${pkg._id}`)
                  }
                  variant="outline"
                  className="flex-1"
                />
                <Button
                  title="Delete"
                  onPress={() => handleDelete(pkg)}
                  variant="danger"
                  className="flex-1"
                />
              </View>
            </Card>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg mb-4">
              No packages found
            </Text>
            <Button
              title="Create First Package"
              onPress={() => router.push("/(tabs)/admin/packages/create")}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
