import { create } from "zustand";

interface InitialTypes {
  categoryValue: string;
  setCategoryValue: (cat: string) => void;
}

const useHomeCategoryValueStore = create<InitialTypes>((set) => ({
  categoryValue: "top",

  setCategoryValue: (cat) => set({ categoryValue: cat }),
}));

export default useHomeCategoryValueStore;
