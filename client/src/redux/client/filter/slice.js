import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filteredIsSet: false,

    priceData: [],
  },
  reducers: {
    setPriceData: (state, action) => {
      state.priceData = action.payload;
    },
    setFilteredIs: (state, action) => {
      state.filteredIsSet = action.payload;
    },
  },
});

export const { setPriceData, setFilteredIs } = filterSlice.actions;
export default filterSlice.reducer;
