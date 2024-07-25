import { create } from "zustand";

interface ConfirmationModelState {
  selectedId: string | null;
  isConfirmationModelOpen: boolean;
  setIsConfirmationModelOpen: (selectedid?: string | null) => void;
}

export const useConfirmationStore = create<ConfirmationModelState>((set) => ({
  selectedId: null,
  isConfirmationModelOpen: false,
  setIsConfirmationModelOpen: (selectedId = null) => {
    set((state) => {
      const id = !state.isConfirmationModelOpen ? selectedId : null;

      return {
        ...state,
        selectedId: id,
        isConfirmationModelOpen: !state.isConfirmationModelOpen,
      };
    });
  },
}));
