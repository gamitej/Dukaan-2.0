import { create } from "zustand";

interface GlobalState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  isStockModelOpen: boolean;
  setIsStockModelOpen: () => void;
}

export const useGlobleStore = create<GlobalState>((set) => ({
  // filter option model
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  isStockModelOpen: false,
  setIsStockModelOpen: () => {
    set((state) => ({ ...state, isStockModelOpen: !state.isStockModelOpen }));
  },
}));
