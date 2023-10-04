import { createSlice } from "@reduxjs/toolkit";
import { getAllWeeklySaleData, getWeeklySaleByID } from "./action";

const weeklySlice = createSlice({
  name: "weekly_sale",
  initialState: {
    weeklySaleData: [],
    isLoading: true,

    eachWeeklySaleData: [],
    eachIsLoading: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWeeklySaleData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllWeeklySaleData.fulfilled, (state, action) => {
      (state.isLoading = false), (state.weeklySaleData = action.payload);
    });
    builder.addCase(getAllWeeklySaleData.rejected, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getWeeklySaleByID.pending, (state) => {
      state.eachIsLoading = true;
    });
    builder.addCase(getWeeklySaleByID.fulfilled, (state, action) => {
      (state.eachIsLoading = false),
        (state.eachWeeklySaleData = action.payload);
    });
    builder.addCase(getWeeklySaleByID.rejected, (state, action) => {
      state.eachIsLoading = true;
    });
  },
});

export default weeklySlice.reducer;
