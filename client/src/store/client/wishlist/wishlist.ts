import { create } from "zustand";
import { WishlistType } from "../../../types/wishlist";

interface InitialTypes {
  wishlist: WishlistType | null;
  setWishlist: (wishlist: WishlistType | null) => void;
  clearWishlist: () => void;
}

const useWishlistStore = create<InitialTypes>((set) => ({
  wishlist: null,

  // Action to set the user data
  setWishlist: (wishlist) => set({ wishlist: wishlist }),

  clearWishlist: () => set({ wishlist: null }),
}));

export default useWishlistStore;
