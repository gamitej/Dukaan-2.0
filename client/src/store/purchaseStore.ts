import { create } from "zustand";

interface PurchaseState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  formData: {
    category: string;
    product: string;
    company: string;
    price: string;
    quantity: string;
    weight: string;
  };
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  formData: {
    category: "",
    product: "",
    company: "",
    price: "",
    quantity: "",
    weight: "",
  },
}));
