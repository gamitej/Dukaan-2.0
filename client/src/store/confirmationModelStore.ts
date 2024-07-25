import { create } from "zustand";

interface ConfirmationModelState {
  selectedData: { [key: string]: any } | null;
  isConfirmationModelOpen: boolean;
  setIsConfirmationModelOpen: (
    selectedData?: { [key: string]: any } | null
  ) => void;
}

export const useConfirmationStore = create<ConfirmationModelState>((set) => ({
  selectedData: null,
  isConfirmationModelOpen: false,
  setIsConfirmationModelOpen: (selectedData = null) => {
    set((state) => {
      const id = !state.isConfirmationModelOpen ? selectedData : null;

      return {
        ...state,
        selectedData: id,
        isConfirmationModelOpen: !state.isConfirmationModelOpen,
      };
    });
  },
}));
