import { create } from "zustand";

interface ExpenseState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  // filter option model
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },
}));
