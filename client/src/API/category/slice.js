import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoryData, getCategoryByID } from "./action";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    categoryIsLoading: true,

    eachCategoryData: [],
    eachIsLoading: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategoryData.pending, (state) => {
      state.categoryIsLoading = true;
    });
    builder.addCase(getAllCategoryData.fulfilled, (state, action) => {
      (state.categoryIsLoading = false), (state.categoryData = action.payload);
    });
    builder.addCase(getAllCategoryData.rejected, (state, action) => {
      state.categoryIsLoading = true;
    });

    builder.addCase(getCategoryByID.pending, (state) => {
      state.eachIsLoading = true;
    });
    builder.addCase(getCategoryByID.fulfilled, (state, action) => {
      (state.eachIsLoading = false), (state.eachCategoryData = action.payload);
    });
    builder.addCase(getCategoryByID.rejected, (state, action) => {
      state.eachIsLoading = true;
    });
  },
});

export default categorySlice.reducer;
