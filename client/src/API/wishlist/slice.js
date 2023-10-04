import { createSlice } from "@reduxjs/toolkit";
import { getWishlistByUser } from "./action";

const wishlistSelector = createSlice({
  name: "wishlist",
  initialState: {
    wishlistData: [],
    isLoading: true,
  },
  extraReducers: (builder) => {
    // Brand
    builder.addCase(getWishlistByUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getWishlistByUser.fulfilled, (state, action) => {
        (state.wishlistData = action.payload), (state.isLoading = false);
      }),
      builder.addCase(getWishlistByUser.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default wishlistSelector.reducer;
