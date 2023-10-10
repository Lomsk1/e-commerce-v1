import { create } from "zustand";

interface InitialTypes {
  popupShow: boolean;
  popupText: string | null;
  setText: (text: string) => void;
  clear: () => void;
}

const usePopupMiddleStore = create<InitialTypes>((set) => ({
  popupShow: false,
  popupText: null,

  //   // Action to set the user data
  setText: (text) => set({ popupShow: true, popupText: text }),
  clear: () => set({ popupShow: false, popupText: null }),
}));

export default usePopupMiddleStore;
