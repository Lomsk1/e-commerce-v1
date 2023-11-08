import { create } from "zustand";

interface InitialTypes {
  ProductId: string | null;
  setProductId: (id: string) => void;
  clearProductId: () => void;

  forMoreProductId: string | null;
  setForMoreProductId: (id: string) => void;
  clearForMoreProductId: () => void;

  moreProductAddFormId: string | null;
  setMoreProductAddFormId: (id: string) => void;
  clearMoreProductAddFormId: () => void;

  specificationsProductId: string | null;
  setSpecificationsProductId: (id: string) => void;
  clearSpecificationsProductId: () => void;
}

const useAdminProductStore = create<InitialTypes>((set) => ({
  ProductId: null,
  setProductId: (id) => set({ ProductId: id }),
  clearProductId: () => set({ ProductId: null }),

  forMoreProductId: null,
  setForMoreProductId: (id) => set({ forMoreProductId: id }),
  clearForMoreProductId: () => set({ forMoreProductId: null }),

  moreProductAddFormId: null,
  setMoreProductAddFormId: (id) => set({ moreProductAddFormId: id }),
  clearMoreProductAddFormId: () => set({ moreProductAddFormId: null }),

  specificationsProductId: null,
  setSpecificationsProductId: (id) => set({ specificationsProductId: id }),
  clearSpecificationsProductId: () => set({ specificationsProductId: null }),
}));

export default useAdminProductStore;
