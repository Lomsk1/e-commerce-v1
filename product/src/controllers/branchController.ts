import Branch from "../models/branchModel";
import { createOne, deleteOne, updateOne } from "./common/factoryController";

export const createBranch = createOne(Branch);
export const deleteBranch = deleteOne(Branch);
export const updateBranch = updateOne(Branch);
