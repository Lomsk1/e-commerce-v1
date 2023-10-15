import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appErrors";
import Wishlist from "../models/wishlistModel";

export const getWishlistByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const data = await Wishlist.find({ user: id });

    // await Promise.all(
    //   data.map(async (document) => {
    //     document.productPopulate();
    //   })
    // );
    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      result: data.length,
      data,
    });
  }
);
export const createWishlist = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const data = await Wishlist.create({
      user: req.user.id,
      product: req.body.product,
    });

    res.status(201).json({
      status: "success",
      data,
    });
  }
);

export const deleteWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Wishlist.findByIdAndDelete(req.params.id);

    if (!data) {
      return next(new AppError("No Document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
