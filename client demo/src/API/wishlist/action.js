import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

export const getWishlistData = createAsyncThunk(
  "wishlist/getWishlistData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("wishlist/get_all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getWishlistByID = createAsyncThunk(
  "wishlist/getWishlistByID",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `wishlist/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getWishlistByUser = createAsyncThunk(
  "wishlist/getWishlistByUser",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `wishlist/get_by_user/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const createWishlist = createAsyncThunk(
  "wishlist/createWishlist",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("wishlist/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const updateWishlist = createAsyncThunk(
  "wishlist/updateWishlist",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `wishlist/put/${params.id}/`,
        params.wishlist
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `wishlist/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);
