import create from "zustand";
import { ErdInfo } from "../hooks/useGenerateErd";

interface ErdStore {
  currentErd: ErdInfo | null;
  setCurrentErd: (erd: ErdInfo) => void;
  clearCurrentErd: () => void;
}

export const useErdStore = create<ErdStore>((set) => ({
  currentErd: null,
  setCurrentErd: (currentErd) => set((state) => ({ ...state, currentErd })),
  clearCurrentErd: () => set((state) => ({ ...state, currentErd: null })),
}));
