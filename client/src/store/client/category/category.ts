import { create } from "zustand";
import { CategoriesTypes } from "../../../types/categoryTypes";

interface InitialTypes {
  categories: CategoriesTypes | null;
  setCategories: (categories: CategoriesTypes | null) => void;
}

const useCategoryStore = create<InitialTypes>((set) => ({
  categories: null,

  // Action to set the user data
  setCategories: (categories) => set({ categories: categories }),

  clearUser: () => set({ categories: null }),
}));

export default useCategoryStore;
