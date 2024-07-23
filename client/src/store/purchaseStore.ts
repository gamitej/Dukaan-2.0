import dayjs from "dayjs";
import { create } from "zustand";

export type FormDataPurchase = {
  category: string;
  product: string;
  company: string;
  price: number;
  quantity: number;
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

  isFormValid: boolean;
  setIsFormValid: () => void;
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
    price: 0,
    quantity: 0,
    weight: "",
    orderId: "",
    date: dayjs().format("YYYY-MM-DD"),
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  isFormValid: false,
  setIsFormValid: () =>
    set((state) => {
      const { formData, isChecked } = state;

      const validations = Object.entries(formData).reduce<
        Record<string, boolean>
      >((acc, [key, value]) => {
        if (key !== "orderId") {
          if (key === "price" || key === "quantity") {
            acc[key] = value.toString().length > 0;
          } else {
            acc[key] = value.toString().trim().length > 0;
          }
        }
        return acc;
      }, {});

      console.log(isChecked);

      if (!isChecked) {
        console.log({ validations });
        const isFormValid = Object.values(validations).every(Boolean);
        return { isFormValid };
      }

      const isFormValid =
        Object.values(validations).every(Boolean) &&
        formData.orderId.trim().length > 10;

      return { isFormValid };
    }),
}));
