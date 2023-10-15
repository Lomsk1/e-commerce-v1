import express from "express";
import { protect } from "../middlewares/protect";
import {
  createWishlist,
  deleteWishlist,
  getWishlistByUser,
} from "../controllers/wishlistController";

const wishlistRoute = express.Router();

// userRouter.post("/signup", signUp);
// userRouter.post("/login", login);

// userRouter.post("/forgotPassword", forgetPassword);
// userRouter.patch("/resetPassword/:token", resetPassword);

wishlistRoute.use(protect);

wishlistRoute.post("/", createWishlist);

wishlistRoute.get("/byUser", getWishlistByUser);

wishlistRoute.delete("/del/:id", deleteWishlist);

// userRouter.patch("/updateMyPassword", updatePassword);
// userRouter.patch("/updateMe", updateMe);

// userRouter.post("/logout", logout);
// userRouter.delete("/deleteMe", deleteMe);

export default wishlistRoute;
