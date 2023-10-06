import { createSlice } from "@reduxjs/toolkit";

export const adminTableSlice = createSlice({
  name: "adminTable",
  initialState: {
    mainToggleForms: false,
    mainTableID: null,
    otherTableToggle: false,
    thirdNestedTableID: null,

    childFormName: "",
    childFormAdd: false,
    childFormChange: false,
    childTableID: null,
    fatherTableID: null,

    statusValue: "",
    statusRequest: false,
    statusCondition: "",

    apiCollector: false,
  },
  reducers: {
    mainFormToggle: (state, action) => {
      state.mainToggleForms = action.payload;
    },
    childTableToggle: (state, action) => {
      state.otherTableToggle = action.payload;
    },
    setMainTableID: (state, action) => {
      state.mainTableID = action.payload;
    },

    childFormPost: (state, action) => {
      state.childFormName = action.payload;
      (state.childFormAdd = true), (state.childFormChange = false);
    },
    childFormPut: (state, action) => {
      state.childFormName = action.payload;
      (state.childFormAdd = false), (state.childFormChange = true);
    },
    setChildTableID: (state, action) => {
      state.childTableID = action.payload;
    },
    childFormsClose: (state) => {
      (state.childFormAdd = false), (state.childFormChange = false);
      state.childFormName = "";
    },

    setStatusValue: (state, action) => {
      state.statusValue = action.payload;
    },
    setStatusCondition: (state, action) => {
      state.statusCondition = action.payload;
    },
    statusRequestToggle: (state, action) => {
      state.statusRequest = action.payload;
    },

    setApiCollector: (state, action) => {
      state.apiCollector = action.payload;
    },

    setThirdNestedTableID: (state, action) => {
      state.thirdNestedTableID = action.payload;
    },
    setFatherTableID: (state, action)=>{
      state.fatherTableID = action.payload
    }
  },
});

export const {
  mainFormToggle,
  setMainTableID,
  childTableToggle,
  childFormToggle,
  childFormPost,
  childFormPut,
  setChildTableID,
  childFormsClose,
  setStatusValue,
  statusRequestToggle,
  setStatusCondition,
  setApiCollector,
  setThirdNestedTableID,
  setFatherTableID,
} = adminTableSlice.actions;
export default adminTableSlice.reducer;
