import { NextFunction, Request, Response } from "express";
import Product from "../models/productModel";
import { catchAsync } from "../utils/catchAsync";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";

export const getAllProduct = getAll(Product);
export const getProduct = getOne(Product);
export const createProduct = createOne(Product);
export const deleteProduct = deleteOne(Product);
export const updateProduct = updateOne(Product);

export const getProductsBySlug = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { slug } = req.params;
    
    const slugs = slug.split(" ").filter(Boolean); // Split the slug into individual slugs

    const regexConditions = slugs.map((s) => new RegExp(s, "i")); // Create regex patterns for each slug
    const query = { slug: { $in: regexConditions } };

    const data = await Product.find(query);

    res.status(200).json({
      status: "success",
      result: data.length,
      data,
    });
  }
);
