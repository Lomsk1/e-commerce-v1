import express from "express";
import { protect } from "../middlewares/protect";
import { restrictTo } from "../middlewares/restrict";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductStats,
  getProductsBySlug,
  updateProduct,
} from "../controllers/productController";
import { uploadPhoto } from "../middlewares/multer";

const productRoute = express.Router({
  mergeParams: true,
});

productRoute.get("/product-stats", getProductStats);

productRoute.get("/search/:slug", getProductsBySlug);

productRoute
  .route("/")
  .get(getAllProduct)
  .post(protect, restrictTo("admin"), uploadPhoto, createProduct);

productRoute
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), uploadPhoto, updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

export default productRoute;
