import { create } from "zustand";
import { UserTypes } from "../../../types/userTypes";

interface InitialTypes {
  user: UserTypes | null;
  isAuthenticated: boolean;
  setUser: (user: UserTypes | null) => void;
}

const useAuthStore = create<InitialTypes>((set) => ({
  user: null,
  isAuthenticated: false,

  // Action to set the user data
  setUser: (user) => set({ user: user, isAuthenticated: !!user }),

  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
