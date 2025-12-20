import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useAuthStore } from "../../store/useStore";
import "../../global.css";

export default function TabsLayout() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} className="mr-4 px-3 py-1">
            <Text className="text-blue-600 font-medium">Logout</Text>
          </TouchableOpacity>
        ),
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
            title: "Admin",
            tabBarLabel: "Admin",
            tabBarIcon: () => <Text>⚙️</Text>,
          }}
        />
      )}
    </Tabs>
  );
}
