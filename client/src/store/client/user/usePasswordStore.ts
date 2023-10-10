import { create } from "zustand";

interface InitialTypes {
  forgottenPassword: boolean;
  setForgottenPassword: (forget: boolean) => void;
}

const useForgottenPasswordStore = create<InitialTypes>((set) => ({
  forgottenPassword: false,

  // Action to set the user data
  setForgottenPassword: (forgot) => set({ forgottenPassword: forgot }),
}));

export default useForgottenPasswordStore;
