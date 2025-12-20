import { View, ViewProps } from "react-native";
import { cn } from "../utils/cn";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
