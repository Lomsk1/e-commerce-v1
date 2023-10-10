import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import User, { UserDoc } from "../models/userModel";
import Email from "../utils/email";
import AppError from "../utils/appErrors";

dotenv.config();

const signToken = (
  id: string,
  email: string,
  role: string,
  firstName: string,
  lastName: string
) => {
  return jwt.sign(
    { id, email, role, firstName, lastName },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (
  user: UserDoc,
  statusCode: number,
  res: Response,
  req: Request
) => {
  const token = signToken(
    user.id,
    user.email,
    user.role,
    user.firstName,
    user.lastName
  );

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    sameSite: "none",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  //   secure: req.secure || req.headers["x-forwarded-proto"] === "https",

  //   Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const url = `${req.protocol}://${req.get("host")}/me`;

    await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, res, req);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please, enter Email and Password", 400));
    }
    // 2) check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or Password", 401));
    }

    // 3) if everything is OK, send token to client
    createSendToken(user, 200, res, req);
  }
);

export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError("No member found with this email", 404));
    }
    // 2) Generate the random reset
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
      const resetURL = `${process.env.FRONT_BASE_URL}/auth/password-forgot/${resetToken}`;

      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Please, check your email",
      });
    } catch (ere) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError("Something bad happened", 500));
    }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get token based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Valid time has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res, req);
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) check if POSTed current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Current password isn't correct", 401));
    }
    // console.log(req.body.passwordCurrent, user.password)

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) Log user in, send JWT
    createSendToken(user, 200, res, req);
  }
);

export const logout = (_req: Request, res: Response) => {
  // Clear the JWT cookie by setting it to an expired value
  res.cookie("jwt", "expired", {
    expires: new Date(Date.now() - 1),
    httpOnly: true,
  });

  // Optionally, you can redirect the user to a specific page or send a JSON response
  res.status(200).json({ status: "success" });
};
