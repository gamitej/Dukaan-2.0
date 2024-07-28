import dayjs from "dayjs";
import { create } from "zustand";

export type DateRangeType = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

interface GlobalState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  isStockModelOpen: boolean;
  setIsStockModelOpen: () => void;

  selectedDateRange: DateRangeType;
  setSelectedDateRabge: (value: DateRangeType) => void;
}

export const useGlobleStore = create<GlobalState>((set) => ({
  // filter option model
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  isStockModelOpen: false,
  setIsStockModelOpen: () => {
    set((state) => ({ ...state, isStockModelOpen: !state.isStockModelOpen }));
  },

  selectedDateRange: {
    startDate: dayjs(),
    endDate: dayjs(),
  },
  setSelectedDateRabge: (value) => {
    set((state) => ({ ...state, selectedDateRange: value }));
  },
}));
