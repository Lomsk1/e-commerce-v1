import { createSlice } from "@reduxjs/toolkit";

export const productTableSlice = createSlice({
  name: "productTable",
  initialState: {
    asNew: false,
    sales: false,
    top: false,
    popularity: false,

    imageTable: false,
    specificationTable: false,
    specBasicTable: false,
    branchTable: false,

    sortData: "all",
    isSort: false,

    productLimit: 10,
  },
  reducers: {
    setAsNew: (state, action) => {
      state.asNew = action.payload;
      state.popularity = false;
      state.top = false;
      state.sales = false;
    },
    setSales: (state, action) => {
      state.sales = action.payload;
      state.popularity = false;
      state.top = false;
      state.asNew = false;
    },
    setTop: (state, action) => {
      state.top = action.payload;
      state.popularity = false;
      state.asNew = false;
      state.sales = false;
    },
    setPopularity: (state, action) => {
      state.popularity = action.payload;
      state.asNew = false;
      state.top = false;
      state.sales = false;
    },
    setProductFormsClose: (state) => {
      state.popularity = false;
      state.asNew = false;
      state.top = false;
      state.sales = false;
    },

    setImageTable: (state, action) => {
      state.imageTable = action.payload;
      state.branchTable = false;
      state.specBasicTable = false;
      state.specificationTable = false;
    },
    setSpecTable: (state, action) => {
      state.specificationTable = action.payload;
      state.branchTable = false;
      state.specBasicTable = false;
      state.imageTable = false;
    },
    setSpecBasicTable: (state, action) => {
      state.specBasicTable = action.payload;
      state.branchTable = false;
      state.imageTable = false;
      state.specificationTable = true;
    },
    setBranchTable: (state, action) => {
      state.branchTable = action.payload;
      state.imageTable = false;
      state.specBasicTable = false;
      state.specificationTable = false;
    },
    setProductChildTablesClose: (state) => {
      state.branchTable = false;
      state.imageTable = false;
      state.specBasicTable = false;
      state.specificationTable = false;
    },
    setSortData: (state, action) => {
      state.sortData = action.payload;
    },
    setSortIsLoading: (state, action) => {
      state.isSort = action.payload;
    },
    setProductLimit: (state, action) => {
      state.productLimit = action.payload;
    },
  },
});

export const {
  setAsNew,
  setSales,
  setTop,
  setPopularity,
  setImageTable,
  setSpecTable,
  setSpecBasicTable,
  setBranchTable,
  setProductFormsClose,
  setProductChildTablesClose,
  setSortData,
  setSortIsLoading,
  setProductLimit,
} = productTableSlice.actions;
export default productTableSlice.reducer;
