import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";


export const getAllCategoryData = createAsyncThunk(
    'category/getAllCategoryData',
    async (params, {rejectWithValue}) => {
        try{
            const {data} = await axiosUnAuthorized.get('category/get_all/')
            return data
        } catch(err){
            rejectWithValue(err.message)
        }
    }
)

export const getCategoryByID = createAsyncThunk(
    "category/getCategoryByID",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosUnAuthorized.get(`category/get_by_id/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post("category/create/", params);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.put(
          `category/put/${params.id}/`,
          params.category
        );
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.delete(`category/delete/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );