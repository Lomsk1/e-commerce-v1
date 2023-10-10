import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appErrors";

interface UserPayload {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not authorized! Please, login", 401));
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    // 3) check if user still exist

    if (!decoded) {
      return next(new AppError("Valid time has expired", 401));
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = decoded;

    next();
  }
);
