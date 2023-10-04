import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";


export const getAllSubscriptionData = createAsyncThunk(
    'subscription/getAllSubscriptionData',
    async (params, {rejectWithValue}) => {
        try{
            const {data} = await axiosUnAuthorized.get('sub/get_all/')
            return data
        } catch(err){
            rejectWithValue(err.message)
        }
    }
)

export const getSubscriptionByID = createAsyncThunk(
    "subscription/getSubscriptionByID",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosUnAuthorized.get(`sub/get_by_id/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const createSubscription = createAsyncThunk(
    "subscription/createSubscription",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosUnAuthorized.post("sub/post/", params);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const updateSubscription = createAsyncThunk(
    "subscription/updateSubscription",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.put(
          `sub/put/${params.id}/`,
          params.sub
        );
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );
  
  export const deleteSubscription = createAsyncThunk(
    "subscription/deleteSubscription",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.delete(`sub/delete/${params.id}/`);
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    }
  );