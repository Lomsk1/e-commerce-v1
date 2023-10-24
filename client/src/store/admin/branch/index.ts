import { create } from "zustand";

interface InitialTypes {
  branchId: string | null;
  setBranchId: (id: string) => void;
  clearBranchId: () => void;

  addTimeBranchId: string | null;
  setAddTimeBranchId: (id: string) => void;
  clearAddTimeBranchId: () => void;

  editTimeBranchId: string | null;
  setEditTimeBranchId: (id: string) => void;
  clearEditTimeBranchId: () => void;
}

const useAdminBranchStore = create<InitialTypes>((set) => ({
  branchId: null,
  setBranchId: (id) => set({ branchId: id }),
  clearBranchId: () => set({ branchId: null }),

  addTimeBranchId: null,
  setAddTimeBranchId: (id) => set({ addTimeBranchId: id }),
  clearAddTimeBranchId: () => set({ addTimeBranchId: null }),

  editTimeBranchId: null,
  setEditTimeBranchId: (id) => set({ editTimeBranchId: id }),
  clearEditTimeBranchId: () => set({ editTimeBranchId: null }),
}));

export default useAdminBranchStore;
