import { create } from "zustand";

interface PartyDetailsState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;
}

export const usePartyDetailsStore = create<PartyDetailsState>((set) => ({
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },
}));
