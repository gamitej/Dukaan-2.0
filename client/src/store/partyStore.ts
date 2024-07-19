import { create } from "zustand";

interface PartyState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  submitBtnEnable: boolean;

  partyName: string;
  setPartyName: (name: string) => void;

  setReset: () => void;
}

export const usePartyStore = create<PartyState>((set) => ({
  submitBtnEnable: false,

  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  partyName: "",
  setPartyName: (name) => {
    const enableBtn = name?.length > 6;

    set((state) => ({ ...state, partyName: name, submitBtnEnable: enableBtn }));
  },

  setReset: () => {
    set((state) => ({
      ...state,
      isModelOpen: false,
      partyName: "",
      submitBtnEnable: false,
    }));
  },
}));
