import express from "express";
import { protect } from "../middlewares/protect";
import { restrictTo } from "../middlewares/restrict";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController";

const productRoute = express.Router({
  mergeParams: true,
});

productRoute
  .route("/")
  .get(getAllProduct)
  .post(protect, restrictTo("editor", "admin"), createProduct);

productRoute
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("editor", "admin"), updateProduct)
  .delete(protect, restrictTo("editor", "admin"), deleteProduct);
productRoute.use(protect);

export default productRoute;
