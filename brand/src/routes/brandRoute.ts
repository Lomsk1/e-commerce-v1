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

const brandRoute = express.Router({
  mergeParams: true,
});

brandRoute
  .route("/")
  .get(getAllBrand)
  .post(protect, restrictTo("admin"), createBrand);

brandRoute
  .route("/:id")
  .get(getBrand)
  .patch(protect, restrictTo("admin"), updateBrand)
  .delete(protect, restrictTo("admin"), deleteBrand);
brandRoute.use(protect);

export default brandRoute;
