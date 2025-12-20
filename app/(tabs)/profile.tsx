import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useProfile, useUpdateProfile } from "../../hooks/useUser";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuthStore } from "../../store/useStore";

export default function ProfileScreen() {
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({
        name: name || undefined,
        password: password || undefined,
      });
      setIsEditing(false);
      setPassword("");
      setConfirmPassword("");
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert(
        "Update Failed",
        error.response?.data?.message || "Failed to update profile"
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Card className="mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Profile Information
          </Text>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm mb-1">Email</Text>
            <Text className="text-gray-900 text-base">{profile.email}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm mb-1">Name</Text>
            {isEditing ? (
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                autoCapitalize="words"
              />
            ) : (
              <Text className="text-gray-900 text-base">
                {profile.name || "Not set"}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm mb-1">Role</Text>
            <Text className="text-gray-900 text-base capitalize">
              {profile.role}
            </Text>
          </View>

          {isEditing && (
            <>
              <Input
                label="New Password (Optional)"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                secureTextEntry
              />

              {password && (
                <Input
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  secureTextEntry
                />
              )}
            </>
          )}

          <View className="flex-row gap-3 mt-4">
            {isEditing ? (
              <>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setIsEditing(false);
                    setName(profile.name || "");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  variant="outline"
                  className="flex-1"
                />
                <Button
                  title="Save"
                  onPress={handleUpdateProfile}
                  loading={updateProfileMutation.isPending}
                  className="flex-1"
                />
              </>
            ) : (
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                className="flex-1"
              />
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
