import { NextFunction, Request, Response } from "express";
import Product from "../models/productModel";
import { catchAsync } from "../utils/catchAsync";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./common/factoryController";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import path from "path";
import AppError from "../utils/appErrors";

export const getAllProduct = getAll(Product);
export const getProduct = getOne(Product);

export const deleteProduct = deleteOne(Product);

export const createProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let createdData = req.body;

    const data = await Product.create(createdData);

    if (req.file) {
      const tempDirPath = path.join(__dirname, "../images/product");
      /* If not exist */
      if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath, { recursive: true });
      }

      const tempFilePath = tempDirPath + "/" + req.file.originalname;

      fs.writeFileSync(tempFilePath, req.file.buffer);

      const cloudUpload = await cloudinary.uploader.upload(tempFilePath, {
        folder: "eCommerce/Product",
      });

      if (createdData.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(createdData.thumbnail.public_id);
      }

      const cloudImage = {
        public_id: cloudUpload.public_id,
        url: cloudUpload.secure_url,
      };

      data.thumbnail = cloudImage;
      data.save({ validateBeforeSave: false });

      // Remove the temporary file after uploading to Cloudinary
      fs.unlink(tempFilePath, () => {});
    }

    res.status(201).json({
      status: "success",
      data,
    });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    let updatedData = { ...body };

    const data = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    if (req.file) {
      const tempDirPath = path.join(__dirname, "../images/product");
      /* If not exist */
      if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath, { recursive: true });
      }

      const tempFilePath = tempDirPath + "/" + req.file.originalname;

      fs.writeFileSync(tempFilePath, req.file.buffer);

      const cloudUpload = await cloudinary.uploader.upload(tempFilePath, {
        folder: "eCommerce/Product",
      });

      if (data.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(data.thumbnail.public_id);
      }

      const cloudImage = {
        public_id: cloudUpload.public_id,
        url: cloudUpload.secure_url,
      };

      data.thumbnail = cloudImage;
      data.save({ validateBeforeSave: false });

      // Remove the temporary file after uploading to Cloudinary
      fs.unlink(tempFilePath, () => {});
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

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
