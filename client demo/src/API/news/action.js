import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";


export const getAllNewsData = createAsyncThunk(
    'news/getAllNewsData',
    async (params, {rejectWithValue}) => {
        try{
            const {data} = await axiosUnAuthorized.get('news/get_all/')
            return data
        } catch(err){
            rejectWithValue(err.message)
        }
    }
)

export const getNewsByID = createAsyncThunk(
    "news/getNewsByID",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosUnAuthorized.get(`news/get_by_id/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const createNews = createAsyncThunk(
    "news/createNews",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post("news/post/", params);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const updateNews = createAsyncThunk(
    "news/updateNews",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.put(
          `news/put/${params.id}/`,
          params.news
        );
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const deleteNews = createAsyncThunk(
    "news/deleteNews",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.delete(`news/delete/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );