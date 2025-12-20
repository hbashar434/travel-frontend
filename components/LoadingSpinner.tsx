import { View, ActivityIndicator, Text } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#2563eb" />
      {message && (
        <Text className="mt-4 text-gray-600 text-base">{message}</Text>
      )}
    </View>
  );
}
