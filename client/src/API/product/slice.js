import { createSlice } from "@reduxjs/toolkit";
import {
  getAllLimitedProductData,
  getAllProductData,
  getProductBasics,
  getProductBasicsByID,
  getProductBasicsByProduct,
  getProductDataByID,
  getProductImage,
  getProductImageByID,
  getProductImageByProduct,
  getProductSpecification,
  getProductSpecificationByID,
  getProductSpecificationByProduct,
  getProductStock,
  getProductStockByID,
  getProductStockByProduct,
} from "./actions";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    isLoading: true,

    eachProductData: [],
    eachProductIsLoading: true,

    productImagesData: [],
    productImagesIsLoading: true,

    productSpecificationData: [],
    productSpecificationIsLoading: true,

    productBasicData: [],
    productBasicIsLoading: true,

    productStockData: [],
    productStockIsLoading: true,
  },
  extraReducers: (builder) => {
    ///////////////////////// Product ///////////////////////////////
    builder.addCase(getAllProductData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllProductData.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productData = action.payload);
      }),
      builder.addCase(getAllProductData.rejected, (state, action) => {
        state.isLoading = true;
      });

    builder.addCase(getAllLimitedProductData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllLimitedProductData.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productData = action.payload);
      }),
      builder.addCase(getAllLimitedProductData.rejected, (state, action) => {
        state.isLoading = true;
      });

    builder.addCase(getProductDataByID.pending, (state) => {
      state.eachProductIsLoading = true;
    }),
      builder.addCase(getProductDataByID.fulfilled, (state, action) => {
        state.eachProductIsLoading = false;
        state.eachProductData = action.payload;
      }),
      builder.addCase(getProductDataByID.rejected, (state) => {
        state.eachProductIsLoading = true;
      });
    ///////////////////////// Images ///////////////////////////////////////
    builder.addCase(getProductImage.pending, (state) => {
      state.productImagesIsLoading = true;
    }),
      builder.addCase(getProductImage.fulfilled, (state, action) => {
        state.productImagesIsLoading = false;
        state.productImagesData = action.payload;
      }),
      builder.addCase(getProductImage.rejected, (state) => {
        state.productImagesIsLoading = true;
      });

    builder.addCase(getProductImageByID.pending, (state) => {
      state.productImagesIsLoading = true;
    }),
      builder.addCase(getProductImageByID.fulfilled, (state, action) => {
        state.productImagesIsLoading = false;
        state.productImagesData = action.payload;
      }),
      builder.addCase(getProductImageByID.rejected, (state) => {
        state.productImagesIsLoading = true;
      });

    builder.addCase(getProductImageByProduct.pending, (state) => {
      state.productImagesIsLoading = true;
    }),
      builder.addCase(getProductImageByProduct.fulfilled, (state, action) => {
        state.productImagesIsLoading = false;
        state.productImagesData = action.payload;
      }),
      builder.addCase(getProductImageByProduct.rejected, (state) => {
        state.productImagesIsLoading = true;
      });

    /////////////////////  S P E C I F I C A T  I O N S ///////////////////////////////
    builder.addCase(getProductSpecification.pending, (state) => {
      state.productSpecificationIsLoading = true;
    }),
      builder.addCase(getProductSpecification.fulfilled, (state, action) => {
        state.productSpecificationIsLoading = false;
        state.productSpecificationData = action.payload;
      }),
      builder.addCase(getProductSpecification.rejected, (state) => {
        state.productSpecificationIsLoading = true;
      });

    builder.addCase(getProductSpecificationByID.pending, (state) => {
      state.productSpecificationIsLoading = true;
    }),
      builder.addCase(
        getProductSpecificationByID.fulfilled,
        (state, action) => {
          state.productSpecificationIsLoading = false;
          state.productSpecificationData = action.payload;
        }
      ),
      builder.addCase(getProductSpecificationByID.rejected, (state) => {
        state.productSpecificationIsLoading = true;
      });

    builder.addCase(getProductSpecificationByProduct.pending, (state) => {
      state.productSpecificationIsLoading = true;
    }),
      builder.addCase(
        getProductSpecificationByProduct.fulfilled,
        (state, action) => {
          state.productSpecificationIsLoading = false;
          state.productSpecificationData = action.payload;
        }
      ),
      builder.addCase(getProductSpecificationByProduct.rejected, (state) => {
        state.productSpecificationIsLoading = true;
      });

    /////////////////////  B A S I C S ///////////////////////////////
    builder.addCase(getProductBasics.pending, (state) => {
      state.productBasicIsLoading = true;
    }),
      builder.addCase(getProductBasics.fulfilled, (state, action) => {
        state.productBasicIsLoading = false;
        state.productBasicData = action.payload;
      }),
      builder.addCase(getProductBasics.rejected, (state) => {
        state.productBasicIsLoading = true;
      });

    builder.addCase(getProductBasicsByID.pending, (state) => {
      state.productBasicIsLoading = true;
    }),
      builder.addCase(getProductBasicsByID.fulfilled, (state, action) => {
        state.productBasicIsLoading = false;
        state.productBasicData = action.payload;
      }),
      builder.addCase(getProductBasicsByID.rejected, (state) => {
        state.productBasicIsLoading = true;
      });

    builder.addCase(getProductBasicsByProduct.pending, (state) => {
      state.productBasicIsLoading = true;
    }),
      builder.addCase(getProductBasicsByProduct.fulfilled, (state, action) => {
        state.productBasicIsLoading = false;
        state.productBasicData = action.payload;
      }),
      builder.addCase(getProductBasicsByProduct.rejected, (state) => {
        state.productBasicIsLoading = true;
      });

    ///////////////////////// STOCK ///////////////////////////////////////
    builder.addCase(getProductStock.pending, (state) => {
      state.productStockIsLoading = true;
    }),
      builder.addCase(getProductStock.fulfilled, (state, action) => {
        state.productStockIsLoading = false;
        state.productStockData = action.payload;
      }),
      builder.addCase(getProductStock.rejected, (state) => {
        state.productStockIsLoading = true;
      });

    builder.addCase(getProductStockByID.pending, (state) => {
      state.productStockIsLoading = true;
    }),
      builder.addCase(getProductStockByID.fulfilled, (state, action) => {
        state.productStockIsLoading = false;
        state.productStockData = action.payload;
      }),
      builder.addCase(getProductStockByID.rejected, (state) => {
        state.productStockIsLoading = true;
      });

    builder.addCase(getProductStockByProduct.pending, (state) => {
      state.productStockIsLoading = true;
    }),
      builder.addCase(getProductStockByProduct.fulfilled, (state, action) => {
        state.productStockIsLoading = false;
        state.productStockData = action.payload;
      }),
      builder.addCase(getProductStockByProduct.rejected, (state) => {
        state.productStockIsLoading = true;
      });
  },
});

export default productSlice.reducer;
