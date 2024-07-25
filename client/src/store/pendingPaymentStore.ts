import { create } from "zustand";

interface PendingPaymenState {
  selectedData: any | null;
  isDetailModelOpen: boolean;
  setIsDetailModelOpen: (selectedData?: { [key: string]: any } | null) => void;
}

export const usePendingPaymentStore = create<PendingPaymenState>((set) => ({
  selectedData: null,
  isDetailModelOpen: false,
  setIsDetailModelOpen: (selectedData = null) => {
    set((state) => {
      const data = !state.isDetailModelOpen ? selectedData : null;

      return {
        ...state,
        selectedData: data,
        isDetailModelOpen: !state.isDetailModelOpen,
      };
    });
  },
}));
