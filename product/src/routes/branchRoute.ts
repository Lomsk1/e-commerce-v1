import express from "express";
import {
  createBranch,
  deleteBranch,
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

export default branchRoute;
