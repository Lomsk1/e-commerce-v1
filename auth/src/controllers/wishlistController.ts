import dotenv from "dotenv";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appErrors";
import Wishlist from "../models/wishlistModel";
dotenv.config;

export const getWishlistByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const wishlistItems = await Wishlist.find({ user: id });

    // await Promise.all(
    //   wishlistItems .map(async (document) => {
    //     document.productPopulate();
    //   })
    // );
    if (!wishlistItems) {
      return next(new AppError("No document found with that ID", 404));
    }

    // Extract the product IDs from the wishlist items
    const productIds = wishlistItems.map((item) => item.product);

    // Fetch product details separately
    const productDetails = [];

    for (const productId of productIds) {
      const response = await axios.get(
        `${process.env.PRODUCT_BASE_URL}api/v1/product/${productId}`
      );
      productDetails.push(response.data);
    }

    res.status(200).json({
      status: "success",
      result: wishlistItems.length,
      data: { wishlistItems, productDetails },
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
