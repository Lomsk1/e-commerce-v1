import express from "express";
import { protect } from "../middlewares/protect";
import { restrictTo } from "../middlewares/restrict";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductsBySlug,
  updateProduct,
} from "../controllers/productController";

const productRoute = express.Router({
  mergeParams: true,
});

productRoute.get("/search/:slug", getProductsBySlug);

productRoute
  .route("/")
  .get(getAllProduct)
  .post(protect, restrictTo("admin"), createProduct);

productRoute
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

export default productRoute;
