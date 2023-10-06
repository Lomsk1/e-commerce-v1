import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";

export const getAllBrandData = createAsyncThunk(
  "brand/getAllBrandData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("brand/get_all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBrandByID = createAsyncThunk(
  "brand/gerBrandByID",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(`brand/get_by_id/${params.id}/`);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("brand/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `brand/put/${params.id}/`,
        params.brand
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`brand/delete/${params.id}/`);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

///////////////////// C A T E G O R Y //////////////////////////////////

export const getBrandCategoryData = createAsyncThunk(
  "brand/getBrandCategoryData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("brand_category/all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBrandCategoryByID = createAsyncThunk(
  "brand/getBrandCategoryByID",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `brand_category/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBrandCategoryByBrand = createAsyncThunk(
  "brand/getBrandCategoryByBrand",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `brand_category/all_by_brand/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createBrandCategory = createAsyncThunk(
  "brand/createBrandCategory",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "brand_category/create/",
        params
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateBrandCategory = createAsyncThunk(
  "brand/updateBrandCategory",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `brand_category/put/${params.id}/`,
        params.brand_category
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteBrandCategory = createAsyncThunk(
  "brand/deleteBrandCategory",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `brand_category/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
