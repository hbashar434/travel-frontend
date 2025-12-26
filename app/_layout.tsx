import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/useStore";
import { LoadingSpinner } from "../components/LoadingSpinner";
import "../global.css";
import "react-native-reanimated";
import { Text, View } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

function RootLayoutNav() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-4">
      <Text className="text-2xl font-bold text-blue-600 mb-2">
        Welcome to Travel App
      </Text>

      <Text className="text-base text-gray-700 text-center">
        This layout is styled using Tailwind (NativeWind)
      </Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}
