import Product from "../models/productModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";

export const getAllProduct = getAll(Product);
export const getProduct = getOne(Product);
export const createProduct = createOne(Product);
export const deleteProduct = deleteOne(Product);
export const updateProduct = updateOne(Product);
