import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../../helpers/axios";

export const getAllProductData = createAsyncThunk(
  "product/getAllProductData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(`product/get_all/`);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getAllLimitedProductData = createAsyncThunk(
  "product/getAllLimitedProductData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product/get_all/${params.limit}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductDataByID = createAsyncThunk(
  "product/getProductDataByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post("product/post/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `product/put/${params.id}/`,
        params.product
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `product/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////

export const getProductImage = createAsyncThunk(
  "productImage/getProductImage",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get("product_image/all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductImageByID = createAsyncThunk(
  "productImage/getProductImageByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_image/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductImageByProduct = createAsyncThunk(
  "productImage/getProductImageByProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_image/all_by_product/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createProductImage = createAsyncThunk(
  "productImage/createProductImage",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post(
        "product_image/create/",
        params
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateProductImage = createAsyncThunk(
  "productImage/updateProductImage",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `product_image/put/${params.id}/`,
        params.image
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "productImage/deleteProductProductImage",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `product_image/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////
export const getProductSpecification = createAsyncThunk(
  "productSpecification/getProductSpecification",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        "product_specification/all/"
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductSpecificationByID = createAsyncThunk(
  "productSpecification/getProductSpecificationByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_specification/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductSpecificationByProduct = createAsyncThunk(
  "productSpecification/getProductSpecificationByProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_specification/all_by_product/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createProductSpecification = createAsyncThunk(
  "productSpecification/createProductSpecification",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post(
        "product_specification/create/",
        params
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateProductSpecification = createAsyncThunk(
  "productSpecification/updateProductSpecification",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `product_specification/put/${params.id}/`,
        params.specification
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteProductSpecification = createAsyncThunk(
  "productSpecification/deleteProductSpecification",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `product_specification/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////
export const getProductBasics = createAsyncThunk(
  "productBasics/getProductBasics",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get("product_basic/all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductBasicsByID = createAsyncThunk(
  "productBasics/getProductBasicsByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_basic/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductBasicsByProduct = createAsyncThunk(
  "productBasics/getProductBasicsByProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `product_basic/all_by_product/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createProductBasics = createAsyncThunk(
  "productBasics/createProductBasics",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post(
        "product_basic/create/",
        params
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateProductBasics = createAsyncThunk(
  "productBasics/updateProductBasics",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `product_basic/put/${params.id}/`,
        params.basic
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteProductBasics = createAsyncThunk(
  "productBasics/deleteProductBasics",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(
        `product_basic/delete/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////
export const getProductStock = createAsyncThunk(
  "productStock/getProductStock",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get("stock/all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductStockByID = createAsyncThunk(
  "productStock/getProductStockByID",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `stock/get_by_id/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getProductStockByProduct = createAsyncThunk(
  "productStock/getProductStockByProduct",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosUnAuthorized.get(
        `stock/all_by_product/${params.id}/`
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const createProductStock = createAsyncThunk(
  "productStock/createProductStock",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.post("stock/create/", params);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const updateProductStock = createAsyncThunk(
  "productStock/updateProductStock",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.put(
        `stock/put/${params.id}/`,
        params.stock
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const deleteProductStock = createAsyncThunk(
  "productStock/deleteProductStock",
  async (params, rejectWithValue) => {
    try {
      const { data } = await axiosInstance.delete(`stock/delete/${params.id}/`);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
