import dayjs from "dayjs";
import { create } from "zustand";

const defaultFormData = {
  amount: 0,
  description: "",
  category: "",
  date: dayjs().format("YYYY-MM-DD"),
};

export type FormDataExpense = {
  category: string;
  description: string;
  amount: number;
  date: string;
};

interface ExpenseState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  formData: FormDataExpense;
  setFormData: (name: string, value: string | number) => void;

  isFormValid: boolean;
  setIsFormValid: () => void;

  setResetFormData: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  // filter option model
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  formData: defaultFormData,
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  setResetFormData: () => {
    set((state) => ({
      ...state,
      isModelOpen: false,
      formData: defaultFormData,
    }));
  },

  isFormValid: false,
  setIsFormValid: () =>
    set((state) => {
      const { formData } = state;

      const validations = Object.entries(formData).reduce<
        Record<string, boolean>
      >((acc, [key, value]) => {
        if (key === "amount") {
          acc[key] = value.toString().length > 0;
        } else {
          acc[key] = value.toString().trim().length > 0;
        }
        return acc;
      }, {});

      const isFormValid = Object.values(validations).every(Boolean);

      return { isFormValid };
    }),
}));
