import { useEffect } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "../store/useStore";
import { LoadingSpinner } from "../components/LoadingSpinner";
import "../global.css";

export default function Index() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
