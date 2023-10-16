import { create } from "zustand";
import { BranchesType } from "../../../types/branch";

interface InitialTypes {
  branch: BranchesType | null;
  setBranch: (branch: BranchesType | null) => void;
  clearBranch: () => void;
}

const useBranchStore = create<InitialTypes>((set) => ({
  branch: null,

  // Action to set the user data
  setBranch: (branch) => set({ branch: branch }),

  clearBranch: () => set({ branch: null }),
}));

export default useBranchStore;
