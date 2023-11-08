import fs from "fs";
import path from "path";
import { NextFunction, Response, Request } from "express";
import Brand from "../models/brandModel";
import { catchAsync } from "../utils/catchAsync";
import { deleteOne, getAll, getOne } from "./common/factoryController";
import AppError from "../utils/appErrors";
import cloudinary from "../utils/cloudinary";

export const getAllBrand = getAll(Brand);
export const getBrand = getOne(Brand);

export const createBrand = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let createdData = req.body;

    const data = await Brand.create(createdData);

    if (req.files) {
      const tempDirPath = path.join(__dirname, "../images/brand");

      /* If not exist, create the directory */
      if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath, { recursive: true });
      }

      if (req.files["thumbnail"]) {
        const thumbnailFile = req.files["thumbnail"][0]; // Access the "thumbnail" file
        const thumbnailTempFilePath =
          tempDirPath + "/" + thumbnailFile.originalname;

        fs.writeFileSync(thumbnailTempFilePath, thumbnailFile.buffer);

        // Upload the thumbnail to Cloudinary
        const thumbnailCloudUpload = await cloudinary.uploader.upload(
          thumbnailTempFilePath,
          {
            folder: "eCommerce/Brand",
          }
        );

        if (createdData.thumbnail?.public_id) {
          await cloudinary.uploader.destroy(createdData.thumbnail.public_id);
        }

        const thumbnailCloudImage = {
          public_id: thumbnailCloudUpload.public_id,
          url: thumbnailCloudUpload.secure_url,
        };

        // Remove the temporary thumbnail file after uploading to Cloudinary
        fs.unlink(thumbnailTempFilePath, () => {});

        data.thumbnail = thumbnailCloudImage;
        data.save({ validateBeforeSave: false });
      }

      if (req.files["image"]) {
        const imageFile = req.files["image"][0]; // Access the "image" file
        const imageTempFilePath = tempDirPath + "/" + imageFile.originalname;

        fs.writeFileSync(imageTempFilePath, imageFile.buffer);

        // Upload the image to Cloudinary
        const imageCloudUpload = await cloudinary.uploader.upload(
          imageTempFilePath,
          {
            folder: "eCommerce/Brand",
          }
        );

        // If you want to handle deleting the old image, add your logic here

        const imageCloudImage = {
          public_id: imageCloudUpload.public_id,
          url: imageCloudUpload.secure_url,
        };

        // Remove the temporary image file after uploading to Cloudinary
        fs.unlink(imageTempFilePath, () => {});

        data.image = imageCloudImage;
        data.save({ validateBeforeSave: false });
      }
    }

    res.status(201).json({
      status: "success",
      data,
    });
  }
);

export const updateBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    let updatedData = { ...body };

    const data = await Brand.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    if (req.files) {
      const tempDirPath = path.join(__dirname, "../images/brand");
      /* If not exist, create the directory */
      if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath, { recursive: true });
      }

      if (req.files["thumbnail"]) {
        const thumbnailFile = req.files["thumbnail"][0]; // Access the "thumbnail" file
        const thumbnailTempFilePath =
          tempDirPath + "/" + thumbnailFile.originalname;

        fs.writeFileSync(thumbnailTempFilePath, thumbnailFile.buffer);

        // Upload the thumbnail to Cloudinary
        const thumbnailCloudUpload = await cloudinary.uploader.upload(
          thumbnailTempFilePath,
          {
            folder: "eCommerce/Brand",
          }
        );

        if (data.thumbnail?.public_id) {
          await cloudinary.uploader.destroy(data.thumbnail.public_id);
        }

        const thumbnailCloudImage = {
          public_id: thumbnailCloudUpload.public_id,
          url: thumbnailCloudUpload.secure_url,
        };

        data.thumbnail = thumbnailCloudImage;
        data.save({ validateBeforeSave: false });

        // Remove the temporary thumbnail file after uploading to Cloudinary
        fs.unlink(thumbnailTempFilePath, () => {});
      }

      if (req.files["image"]) {
        const imageFile = req.files["image"][0]; // Access the "image" file
        const imageTempFilePath = tempDirPath + "/" + imageFile.originalname;

        fs.writeFileSync(imageTempFilePath, imageFile.buffer);

        // Upload the image to Cloudinary
        const imageCloudUpload = await cloudinary.uploader.upload(
          imageTempFilePath,
          {
            folder: "eCommerce/Brand",
          }
        );

        // If you want to handle deleting the old image, add your logic here
        if (data.image?.public_id) {
          await cloudinary.uploader.destroy(data.image.public_id);
        }

        const imageCloudImage = {
          public_id: imageCloudUpload.public_id,
          url: imageCloudUpload.secure_url,
        };

        data.image = imageCloudImage;
        data.save({ validateBeforeSave: false });

        // Remove the temporary image file after uploading to Cloudinary
        fs.unlink(imageTempFilePath, () => {});
      }
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const deleteBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Brand.findById(req.params.id);

    if (!data) {
      return next(new AppError("No Document found with that ID", 404));
    }

    // Delete associated images if they exist
    if (data.thumbnail && data.thumbnail.public_id) {
      // Delete the thumbnail image from Cloudinary
      await cloudinary.uploader.destroy(data.thumbnail.public_id);
    }

    if (data.image && data.image.public_id) {
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(data.image.public_id);
    }

    // Now delete the brand itself
    await data.deleteOne();

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
