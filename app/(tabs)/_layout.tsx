import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useAuthStore } from "../../store/useStore";
import "../../global.css";

export default function TabsLayout() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        headerRight: () => {
          if (!isAuthenticated) return null;
          return (
            <TouchableOpacity onPress={handleLogout} className="mr-4 px-3 py-1">
              <Text className="text-blue-600 font-medium">Logout</Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Packages",
          tabBarLabel: "Packages",
          tabBarIcon: () => <Text>📦</Text>,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "My Bookings",
          tabBarLabel: "Bookings",
          tabBarIcon: () => <Text>🎫</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
      {user?.role === "admin" && (
        <Tabs.Screen
          name="admin"
          options={{
            title: "Uploads",
            tabBarLabel: "Uploads",
            tabBarIcon: () => <Text>📤</Text>,
          }}
        />
      )}

      {/* Hidden routes: keep these in route tree but remove from tab bar */}
      <Tabs.Screen name="package/[id]" options={{ tabBarButton: () => null }} />
      <Tabs.Screen
        name="admin/packages"
        options={{ tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="admin/packages/create"
        options={{ tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="admin/packages/edit/[id]"
        options={{ tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="admin/bookings"
        options={{ tabBarButton: () => null }}
      />
      <Tabs.Screen name="admin" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
}
