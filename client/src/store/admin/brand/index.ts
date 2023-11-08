import { create } from "zustand";

interface InitialTypes {
  brandId: string | null;
  setBrandId: (id: string) => void;
  clearBrandId: () => void;

  addCategoryBrandId: string | null;
  setAddCategoryBrandId: (id: string) => void;
  clearAddCategoryBrandId: () => void;

  editCategoryBrandId: string | null;
  setEditCategoryBrandId: (id: string) => void;
  clearEditCategoryBrandId: () => void;
}

const useAdminBrandStore = create<InitialTypes>((set) => ({
  brandId: null,
  setBrandId: (id) => set({ brandId: id }),
  clearBrandId: () => set({ brandId: null }),

  addCategoryBrandId: null,
  setAddCategoryBrandId: (id) => set({ addCategoryBrandId: id }),
  clearAddCategoryBrandId: () => set({ addCategoryBrandId: null }),

  editCategoryBrandId: null,
  setEditCategoryBrandId: (id) => set({ editCategoryBrandId: id }),
  clearEditCategoryBrandId: () => set({ editCategoryBrandId: null }),
}));

export default useAdminBrandStore;
