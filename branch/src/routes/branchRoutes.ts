import express from "express";
import { protect } from "../middlewares/protect";
import { restrictTo } from "../middlewares/restrict";
import {deleteBranch, 
  createBranch,
  getAllBranch,
  getBranch,
  updateBranch,
} from "../controllers/branchController.ts";

const branchRoute = express.Router({
  mergeParams: true,
});

branchRoute
  .route("/")
  .get(getAllBranch)
  .post(protect, restrictTo("admin"), createBranch);

branchRoute
  .route("/:id")
  .get(getBranch)
  .patch(protect, restrictTo("admin"), updateBranch)
  .delete(protect, restrictTo("admin"), deleteBranch);
branchRoute.use(protect);

export default branchRoute;
