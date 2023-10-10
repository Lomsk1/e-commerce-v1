import Brand from "../models/brandModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";

export const getAllBrand = getAll(Brand);
export const getBrand = getOne(Brand);
export const createBrand = createOne(Brand);
export const deleteBrand = deleteOne(Brand);
export const updateBrand = updateOne(Brand);
