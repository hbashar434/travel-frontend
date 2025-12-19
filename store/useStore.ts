import { create } from "zustand";

interface AppState {
  // Add your state here
}

export const useStore = create<AppState>((set) => ({
  // Add your state and actions here
}));
