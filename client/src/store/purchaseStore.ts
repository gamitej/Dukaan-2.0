import dayjs from "dayjs";
import { create } from "zustand";

export type FormDataPurchase = {
  category: string;
  product: string;
  company: string;
  price: string;
  quantity: string;
  weight: string;
  orderId: string;
  date: string;
};

interface PurchaseState {
  isChecked: boolean;
  setIsChecked: () => void;

  isModelOpen: boolean;
  setIsModelOpen: () => void;

  formData: FormDataPurchase;
  setFormData: (name: string, value: string | number) => void;

  isFormValid: () => boolean;
}

export const usePurchaseStore = create<PurchaseState>((set, get) => ({
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
    date: dayjs().format("YYYY-MM-DD"),
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  isFormValid: () => {
    const { formData, isChecked } = get();
    const fieldsFilled = Object.values(formData).every(
      (value) => value?.trim() !== ""
    );
    return fieldsFilled && (!isChecked || formData.orderId.trim() !== "");
  },
}));
