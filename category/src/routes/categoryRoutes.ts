import express from "express";
import { protect } from "../middlewares/protect";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import { restrictTo } from "../middlewares/restrict";

const categoryRoute = express.Router({
  mergeParams: true,
});

categoryRoute
  .route("/")
  .get(getAllCategory)
  .post(protect, restrictTo("editor", "admin"), createCategory);

categoryRoute
  .route("/:id")
  .get(getCategory)
  .patch(protect, restrictTo("editor", "admin"), updateCategory)
  .delete(protect, restrictTo("editor", "admin"), deleteCategory);
categoryRoute.use(protect);

export default categoryRoute;
