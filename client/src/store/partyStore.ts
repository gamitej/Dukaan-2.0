import { create } from "zustand";

interface PartyState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;
}

export const usePartyStore = create<PartyState>((set) => ({
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },
}));
