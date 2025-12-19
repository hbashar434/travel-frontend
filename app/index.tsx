import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold">Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}
