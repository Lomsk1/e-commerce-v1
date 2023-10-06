import { createSlice } from "@reduxjs/toolkit";
import { getAllSubscriptionData, getSubscriptionByID } from "./actions";

const subSlice = createSlice({
  name: "sub",
  initialState: {
    subData: [],
    subIsLoading: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSubscriptionData.pending, (state) => {
      state.subIsLoading = true;
    });
    builder.addCase(getAllSubscriptionData.fulfilled, (state, action) => {
      (state.subIsLoading = false), (state.subData = action.payload);
    });
    builder.addCase(getAllSubscriptionData.rejected, (state, action) => {
      state.subIsLoading = true;
    });

    builder.addCase(getSubscriptionByID.pending, (state) => {
      state.subIsLoading = true;
    });
    builder.addCase(getSubscriptionByID.fulfilled, (state, action) => {
      (state.subIsLoading = false), (state.subData = action.payload);
    });
    builder.addCase(getSubscriptionByID.rejected, (state, action) => {
      state.subIsLoading = true;
    });
  },
});

export default subSlice.reducer;
