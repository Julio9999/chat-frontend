import type { UserData } from "@/modules/auth/interfaces/auth-interface";
import { create } from "zustand";

interface MainState {
  userData: UserData
  setUserData: (userData: UserData) => void;
  clearUserData: () => void;
}

export const useMainStore = create<MainState>((set) => ({
    userData: { username: "", email: "" },
    setUserData: (userData) => set({ userData }),
    clearUserData: () => set({ userData: { username: "", email: "" } })
}));
