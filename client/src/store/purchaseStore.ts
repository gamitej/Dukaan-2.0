import { create } from "zustand";

export type FormDataPurchase = {
  category: string;
  product: string;
  company: string;
  price: string;
  quantity: string;
  weight: string;
};

interface PurchaseState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  formData: FormDataPurchase;
  setFormData: (name: string, value: string | number) => void;
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
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
}));
