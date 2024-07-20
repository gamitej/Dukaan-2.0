import { create } from "zustand";

interface GlobalState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;
}

export const useGlobleStore = create<GlobalState>((set) => ({
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },
}));
