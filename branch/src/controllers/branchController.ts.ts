import Branch from "../models/branchModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";

export const getAllBranch = getAll(Branch);
export const getBranch = getOne(Branch);
export const createBranch = createOne(Branch);
export const deleteBranch = deleteOne(Branch);
export const updateBranch = updateOne(Branch);
