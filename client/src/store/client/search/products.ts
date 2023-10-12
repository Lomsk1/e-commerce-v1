import { create } from "zustand";
import { ProductsType } from "../../../types/product";

interface InitialTypes {
  products: ProductsType | null;
  setProducts: (prod: ProductsType) => void;
  clear: () => void;
}

const useSearchProductStore = create<InitialTypes>((set) => ({
  products: null,

  // Action to set the user data
  setProducts: (prod) => set({ products: prod }),
  clear: () => set({ products: null }),
}));

export default useSearchProductStore;
