import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import Brand from "../models/brandModel";
import AppError from "../utils/appErrors";

export const createBrandCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let createdData = req.body;
    const data = await Brand.findById(req.params.id);

    if (!data) {
      return next(new AppError("Brand not found", 404));
    }

    data.brandCategory.push(createdData);
    data.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      data,
    });
  }
);

export const deleteBrandCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brandId = req.params.id;
    const categoryId = req.params.categoryId;

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(new Error("Brand not found"));
    }

    brand.brandCategory = brand.brandCategory.filter(
      (category) => category._id.toString() !== categoryId
    );

    await brand.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      brand,
    });
  }
);

export const editBrandCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brandId = req.params.id;
    const brandCategoryId = req.params.categoryId;
    const updatedBrandCategory = req.body;

    // Find the branch by its ID
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(new AppError("Branch not found", 404));
    }

    // Find the working time within the branch's working hours array
    const brandCategory = brand.brandCategory.find(
      (wt) => wt._id.toString() === brandCategoryId
    );

    if (!brandCategory) {
      return next(new AppError("Brand Category not found", 404));
    }

    // Update the working time with the new data
    Object.assign(brandCategory, updatedBrandCategory);

    // Save the branch with the updated working hours
    await brand.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      brand,
    });
  }
);
