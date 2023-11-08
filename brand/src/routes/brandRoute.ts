import express from "express";
import { protect } from "../middlewares/protect";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brandController";
import { restrictTo } from "../middlewares/restrict";
import { uploadPhotos } from "../middlewares/multer";
import {
  createBrandCategory,
  deleteBrandCategory,
  editBrandCategory,
} from "../controllers/brandCategoryController";

const brandRoute = express.Router({
  mergeParams: true,
});

brandRoute
  .route("/")
  .get(getAllBrand)
  .post(protect, restrictTo("admin"), uploadPhotos, createBrand);

brandRoute
  .route("/:id")
  .get(getBrand)
  .patch(protect, restrictTo("admin"), uploadPhotos, updateBrand)
  .delete(protect, restrictTo("admin"), deleteBrand);

brandRoute
  .route("/:id/category")
  .put(protect, restrictTo("admin"), createBrandCategory);

brandRoute
  .route("/:id/category/:categoryId")
  .patch(protect, restrictTo("admin"), editBrandCategory)
  .put(protect, restrictTo("admin"), deleteBrandCategory);

brandRoute.use(protect);

export default brandRoute;
