import { create } from "zustand";

interface InitialTypes {
  searchWrapperIsShow: boolean;
  setSearchWrapperIsShow: (bool: boolean) => void;
}

const useSearchWrapperStore = create<InitialTypes>((set) => ({
  searchWrapperIsShow: false,

  // Action to set the user data
  setSearchWrapperIsShow: (bool) => set({ searchWrapperIsShow: bool }),
}));

export default useSearchWrapperStore;
