import Category from "../models/categoryModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";

export const getAllCategory = getAll(Category);
export const getCategory = getOne(Category);
export const createCategory = createOne(Category);
export const deleteCategory = deleteOne(Category);
export const updateCategory = updateOne(Category);
