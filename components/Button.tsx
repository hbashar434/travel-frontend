import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { cn } from "../utils/cn";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg items-center justify-center";
  const variantStyles = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    danger: "bg-red-600",
    outline: "bg-transparent border-2 border-blue-600",
  };

  const textStyles = {
    primary: "text-white",
    secondary: "text-white",
    danger: "text-white",
    outline: "text-blue-600",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        (disabled || loading) && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#2563eb" : "#fff"} />
      ) : (
        <Text className={cn("font-semibold text-base", textStyles[variant])}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
