import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";

export const getAllBranchData = createAsyncThunk(
  "branch/getAllBranchData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get("branch/get_all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchDataByID = createAsyncThunk(
  "branch/getBranchDataByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `branch/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post("branch/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `branch/put/${params.id}/`,
        params.branch
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `branch/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchCoords = createAsyncThunk(
  "branchCoords/getBranchCoords",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get("branch_coord/get_all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchCoordsByID = createAsyncThunk(
  "branchCoords/getBranchCoordsByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `branch_coord/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchCoordsByBranch = createAsyncThunk(
  "branchCoords/getBranchCoordsByBranch",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `branch_coord/get_by_Branch/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createBranchCoords = createAsyncThunk(
  "branchCoords/createBranchCoords",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post("branch_coord/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateBranchCoords = createAsyncThunk(
  "branchCoords/updateBranchCoords",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `branch_coord/put/${params.id}/`,
        params.branch
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteBranchCoords = createAsyncThunk(
  "branchCoords/deleteBranchBranchCoords",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `branch_coord/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchWorkingHours = createAsyncThunk(
  "branchWorking/getBranchWorkingHours",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get("branch_working_hour/get_all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchWorkingHoursByID = createAsyncThunk(
  "branchWorking/getBranchWorkingHoursByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `branch_working_hour/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getBranchWorkingHoursByBranch = createAsyncThunk(
  "branchWorking/getBranchWorkingHoursByBranch",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `branch_working_hour/get_by_Branch/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createBranchWorkingHours = createAsyncThunk(
  "branchWorking/createBranchWorkingHours",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post(
        "branch_working_hour/post/",
        params
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateBranchWorkingHours = createAsyncThunk(
  "branchWorking/updateBranchWorkingHours",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `branch_working_hour/put/${params.id}/`,
        params.branch
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteBranchWorkingHours = createAsyncThunk(
  "branch/deleteBranchWorkingHours",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `branch_working_hour/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
