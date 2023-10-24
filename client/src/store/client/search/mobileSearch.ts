import { create } from "zustand";

interface InitialTypes {
  searchMobileWrapperIsShow: boolean;
  setSearchMobileWrapperIsShow: (bool: boolean) => void;
}

const useSearchMobileWrapperStore = create<InitialTypes>((set) => ({
  searchMobileWrapperIsShow: false,

  // Action to set the user data
  setSearchMobileWrapperIsShow: (bool) =>
    set({ searchMobileWrapperIsShow: bool }),
}));

export default useSearchMobileWrapperStore;
