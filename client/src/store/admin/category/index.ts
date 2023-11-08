import { create } from "zustand";

interface InitialTypes {
  categoryId: string | null;
  setCategoryId: (id: string) => void;
  clearCategoryId: () => void;
}

const useAdminCategoryStore = create<InitialTypes>((set) => ({
    categoryId: null,
  setCategoryId: (id) => set({ categoryId: id }),
  clearCategoryId: () => set({ categoryId: null }),
}));

export default useAdminCategoryStore;
