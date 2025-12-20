export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// Update the API base URL in services/api.ts if needed
export const config = {
  apiUrl: API_BASE_URL,
};
