import express from "express";
import {
  createBranch,
  createBranchWorkingTime,
  deleteBranch,
  deleteBranchWorkingTime,
  editBranchWorkingTime,
  updateBranch,
} from "../controllers/branchController";

const branchRoute = express.Router({
  mergeParams: true,
});

branchRoute
  .route("/")
  //   .get(getAllProduct)
  .post(createBranch);

branchRoute
  .route("/:id")
  //   .get(getProduct)
  .patch(updateBranch)
  .delete(deleteBranch);

branchRoute.route("/:id/workingTime").patch(createBranchWorkingTime);

branchRoute
  .route("/:id/workingTime/:workingTimeId")
  .patch(deleteBranchWorkingTime)
  .put(editBranchWorkingTime);

export default branchRoute;
