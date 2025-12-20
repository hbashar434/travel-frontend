import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useCreatePackage } from "../../../../hooks/usePackages";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Card } from "../../../../components/Card";
import { useAuthStore } from "../../../../store/useStore";

export default function CreatePackageScreen() {
  const { user } = useAuthStore();
  const createPackageMutation = useCreatePackage();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    destination: "",
    category: "",
    meetingPoint: "",
    pricePerPerson: "",
    discountPrice: "",
    durationDays: "",
    durationNights: "",
    minPersons: "",
    maxPersons: "",
    status: "active" as "active" | "inactive",
    isFeatured: false,
  });

  const [included, setIncluded] = useState<string[]>([]);
  const [includedInput, setIncludedInput] = useState("");
  const [excluded, setExcluded] = useState<string[]>([]);
  const [excludedInput, setExcludedInput] = useState("");
  const [images, setImages] = useState<string[]>([]);

  if (user?.role !== "admin") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">Access Denied</Text>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addIncluded = () => {
    if (includedInput.trim()) {
      setIncluded([...included, includedInput.trim()]);
      setIncludedInput("");
    }
  };

  const removeIncluded = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const addExcluded = () => {
    if (excludedInput.trim()) {
      setExcluded([...excluded, excludedInput.trim()]);
      setExcludedInput("");
    }
  };

  const removeExcluded = (index: number) => {
    setExcluded(excluded.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.pricePerPerson) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("pricePerPerson", formData.pricePerPerson);
      if (formData.shortDescription)
        formDataToSend.append("shortDescription", formData.shortDescription);
      if (formData.description)
        formDataToSend.append("description", formData.description);
      if (formData.destination)
        formDataToSend.append("destination", formData.destination);
      if (formData.category)
        formDataToSend.append("category", formData.category);
      if (formData.meetingPoint)
        formDataToSend.append("meetingPoint", formData.meetingPoint);
      if (formData.discountPrice)
        formDataToSend.append("discountPrice", formData.discountPrice);
      if (formData.durationDays)
        formDataToSend.append("durationDays", formData.durationDays);
      if (formData.durationNights)
        formDataToSend.append("durationNights", formData.durationNights);
      if (formData.minPersons)
        formDataToSend.append("minPersons", formData.minPersons);
      if (formData.maxPersons)
        formDataToSend.append("maxPersons", formData.maxPersons);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("isFeatured", formData.isFeatured.toString());

      included.forEach((item) => {
        formDataToSend.append("included[]", item);
      });
      excluded.forEach((item) => {
        formDataToSend.append("excluded[]", item);
      });

      images.forEach((uri, index) => {
        const filename = uri.split("/").pop() || `image${index}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        formDataToSend.append("images", {
          uri,
          name: filename,
          type,
        } as any);
      });

      await createPackageMutation.mutateAsync(formDataToSend);
      Alert.alert("Success", "Package created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create package"
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Create Package
        </Text>

        <Card className="mb-4">
          <Input
            label="Title *"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Package title"
          />
          <Input
            label="Slug *"
            value={formData.slug}
            onChangeText={(text) => setFormData({ ...formData, slug: text })}
            placeholder="package-slug"
            autoCapitalize="none"
          />
          <Input
            label="Short Description"
            value={formData.shortDescription}
            onChangeText={(text) =>
              setFormData({ ...formData, shortDescription: text })
            }
            placeholder="Brief description"
          />
          <Input
            label="Description"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            placeholder="Full description"
            className="h-24"
          />
          <Input
            label="Destination"
            value={formData.destination}
            onChangeText={(text) =>
              setFormData({ ...formData, destination: text })
            }
            placeholder="Destination"
          />
          <Input
            label="Category"
            value={formData.category}
            onChangeText={(text) =>
              setFormData({ ...formData, category: text })
            }
            placeholder="Category"
          />
          <Input
            label="Meeting Point"
            value={formData.meetingPoint}
            onChangeText={(text) =>
              setFormData({ ...formData, meetingPoint: text })
            }
            placeholder="Meeting point"
          />
          <Input
            label="Price Per Person *"
            value={formData.pricePerPerson}
            onChangeText={(text) =>
              setFormData({ ...formData, pricePerPerson: text })
            }
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Input
            label="Discount Price"
            value={formData.discountPrice}
            onChangeText={(text) =>
              setFormData({ ...formData, discountPrice: text })
            }
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Input
            label="Duration Days"
            value={formData.durationDays}
            onChangeText={(text) =>
              setFormData({ ...formData, durationDays: text })
            }
            placeholder="7"
            keyboardType="numeric"
          />
          <Input
            label="Duration Nights"
            value={formData.durationNights}
            onChangeText={(text) =>
              setFormData({ ...formData, durationNights: text })
            }
            placeholder="6"
            keyboardType="numeric"
          />
          <Input
            label="Min Persons"
            value={formData.minPersons}
            onChangeText={(text) =>
              setFormData({ ...formData, minPersons: text })
            }
            placeholder="1"
            keyboardType="numeric"
          />
          <Input
            label="Max Persons"
            value={formData.maxPersons}
            onChangeText={(text) =>
              setFormData({ ...formData, maxPersons: text })
            }
            placeholder="10"
            keyboardType="numeric"
          />

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Status</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, status: "active" })}
                className={`px-4 py-2 rounded-lg ${
                  formData.status === "active" ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <Text
                  className={
                    formData.status === "active"
                      ? "text-white"
                      : "text-gray-700"
                  }
                >
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, status: "inactive" })}
                className={`px-4 py-2 rounded-lg ${
                  formData.status === "inactive" ? "bg-red-600" : "bg-gray-200"
                }`}
              >
                <Text
                  className={
                    formData.status === "inactive"
                      ? "text-white"
                      : "text-gray-700"
                  }
                >
                  Inactive
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <TouchableOpacity
              onPress={() =>
                setFormData({ ...formData, isFeatured: !formData.isFeatured })
              }
              className={`px-4 py-2 rounded-lg ${
                formData.isFeatured ? "bg-yellow-400" : "bg-gray-200"
              }`}
            >
              <Text
                className={
                  formData.isFeatured ? "text-gray-900" : "text-gray-700"
                }
              >
                {formData.isFeatured ? "★ Featured" : "☆ Not Featured"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Images</Text>
            <Button
              title="Pick Images"
              onPress={pickImage}
              variant="outline"
              className="mb-2"
            />
            <View className="flex-row flex-wrap gap-2">
              {images.map((uri, index) => (
                <View key={index} className="relative">
                  <Image
                    source={{ uri }}
                    className="w-20 h-20 rounded-lg"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <Text className="text-white text-xs">×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Included</Text>
            <View className="flex-row gap-2 mb-2">
              <Input
                value={includedInput}
                onChangeText={setIncludedInput}
                placeholder="Add included item"
                className="flex-1 mb-0"
              />
              <Button title="Add" onPress={addIncluded} className="px-4" />
            </View>
            {included.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2"
              >
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => removeIncluded(index)}>
                  <Text className="text-red-600">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Excluded</Text>
            <View className="flex-row gap-2 mb-2">
              <Input
                value={excludedInput}
                onChangeText={setExcludedInput}
                placeholder="Add excluded item"
                className="flex-1 mb-0"
              />
              <Button title="Add" onPress={addExcluded} className="px-4" />
            </View>
            {excluded.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2"
              >
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => removeExcluded(index)}>
                  <Text className="text-red-600">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Button
            title="Create Package"
            onPress={handleSubmit}
            loading={createPackageMutation.isPending}
            className="mt-4"
          />
        </Card>
      </View>
    </ScrollView>
  );
}
