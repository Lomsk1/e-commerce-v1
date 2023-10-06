import { createSlice } from "@reduxjs/toolkit";
import { getAllNewsData, getNewsByID } from "./action";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsData: [],
    isLoading: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNewsData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNewsData.fulfilled, (state, action) => {
      (state.isLoading = false), (state.newsData = action.payload);
    });
    builder.addCase(getAllNewsData.rejected, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getNewsByID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsByID.fulfilled, (state, action) => {
      (state.isLoading = false), (state.newsData = action.payload);
    });
    builder.addCase(getNewsByID.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default newsSlice.reducer;
