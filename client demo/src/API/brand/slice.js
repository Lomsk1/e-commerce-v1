import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBrandData,
  getBrandByID,
  getBrandCategoryByBrand,
  getBrandCategoryData,
} from "./action";

const brandSelector = createSlice({
  name: "brand",
  initialState: {
    brandData: [],
    brandDataIsLoading: true,

    eachBrandData: [],
    eachBrandIsLoading: true,

    brandCategoryData: [],
    brandCategoryDataIsLoading: true,
  },
  extraReducers: (builder) => {
    // Brand
    builder.addCase(getAllBrandData.pending, (state) => {
      state.brandDataIsLoading = true;
    }),
      builder.addCase(getAllBrandData.fulfilled, (state, action) => {
        (state.brandData = action.payload), (state.brandDataIsLoading = false);
      }),
      builder.addCase(getAllBrandData.rejected, (state) => {
        state.brandDataIsLoading = true;
      });

    builder.addCase(getBrandByID.pending, (state) => {
      state.eachBrandIsLoading = true;
    }),
      builder.addCase(getBrandByID.fulfilled, (state, action) => {
        (state.eachBrandData = action.payload),
          (state.eachBrandIsLoading = false);
      }),
      builder.addCase(getBrandByID.rejected, (state) => {
        state.eachBrandIsLoading = true;
      });

    // /////////////////////// C A T E G O R Y //////////////////////

    builder.addCase(getBrandCategoryData.pending, (state) => {
      state.brandCategoryDataIsLoading = true;
    }),
      builder.addCase(getBrandCategoryData.fulfilled, (state, action) => {
        (state.brandCategoryData = action.payload),
          (state.brandCategoryDataIsLoading = false);
      }),
      builder.addCase(getBrandCategoryData.rejected, (state) => {
        state.brandCategoryDataIsLoading = true;
      });

    builder.addCase(getBrandCategoryByBrand.pending, (state) => {
      state.brandCategoryDataIsLoading = true;
    }),
      builder.addCase(getBrandCategoryByBrand.fulfilled, (state, action) => {
        (state.brandCategoryData = action.payload),
          (state.brandCategoryDataIsLoading = false);
      }),
      builder.addCase(getBrandCategoryByBrand.rejected, (state) => {
        state.brandCategoryDataIsLoading = true;
      });
  },
});

export default brandSelector.reducer;
