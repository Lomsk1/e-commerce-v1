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
brandRoute.use(protect);

export default brandRoute;
