import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";

export const getAllWeeklySaleData = createAsyncThunk(
  "weeklySale/getAllWeeklySaleData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("weekly_sale/get_all/");
      return data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const getWeeklySaleByID = createAsyncThunk(
  "weeklySale/getWeeklySaleByID",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `weekly_sale/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createWeeklySale = createAsyncThunk(
  "weeklySale/createWeeklySale",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("weekly_sale/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateWeeklySale = createAsyncThunk(
  "weeklySale/updateWeeklySale",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `weekly_sale/put/${params.id}/`,
        params.weeklySale
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteWeeklySale = createAsyncThunk(
  "weeklySale/deleteWeeklySale",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `weekly_sale/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
