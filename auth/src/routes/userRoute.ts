import express from "express";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  signUp,
  updatePassword,
} from "../controllers/authController";
import { protect } from "../middlewares/protect";
import { getMe } from "../middlewares/user";
import { deleteMe, getUser, updateMe } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

userRouter.post("/forgotPassword", forgetPassword);
userRouter.patch("/resetPassword/:token", resetPassword);

userRouter.use(protect);

userRouter.get("/me", getMe, getUser);

userRouter.patch("/updateMyPassword", updatePassword);
userRouter.patch("/updateMe", updateMe);

userRouter.post("/logout", logout);
userRouter.delete("/deleteMe", deleteMe);

export default userRouter;
