import { create } from "zustand";

export type FormDataPurchase = {
  category: string;
  product: string;
  company: string;
  price: string;
  quantity: string;
  weight: string;
  orderId: string;
};

interface PurchaseState {
  isChecked: boolean;
  setIsChecked: () => void;

  isModelOpen: boolean;
  setIsModelOpen: () => void;

  formData: FormDataPurchase;
  setFormData: (name: string, value: string | number) => void;
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  isChecked: false,
  setIsChecked: () => {
    set((state) => ({ ...state, isChecked: !state.isChecked }));
  },

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
    orderId: "",
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
}));
