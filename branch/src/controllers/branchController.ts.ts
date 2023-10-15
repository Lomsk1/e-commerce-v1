import axios from "axios";
import { NextFunction, Request, Response } from "express";
import Branch from "../models/branchModel";
import { catchAsync } from "../utils/catchAsync";
import { getAll, getOne } from "./common/factoryController";
import { productURI } from "../config/keys";
import AppError from "../utils/appErrors";

export const getAllBranch = getAll(Branch);
export const getBranch = getOne(Branch);
export const createBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let createdData = req.body;
    const data = await Branch.create(createdData);

    if (data) {
      const createProductBranch = await axios.post(
        `${productURI}api/v1/branch`,
        {
          ...createdData,
          id: data._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(createProductBranch);

      if (createProductBranch.status !== 201) {
        await Branch.findByIdAndDelete(data._id);

        return next(new AppError("Product branch does not created", 404));
      }
    }

    res.status(201).json({
      status: "success",
      data,
    });
  }
);
export const updateBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    let updatedData = { ...body };

    const data = await Branch.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    const productBranch = await axios.patch(
      `${productURI}api/v1/branch/${data._id.toString()}`,
      {
        ...updatedData,
      }
    );

    if (productBranch.status !== 200)
      next(
        new AppError(
          `Product branch does not Updated. Please Update it manually with id(${data._id})`,
          404
        )
      );

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const deleteBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Branch.findByIdAndDelete(req.params.id);

    if (!data) {
      return next(new AppError("No Document found with that ID", 404));
    }

    const productBranch = await axios.delete(
      `${productURI}api/v1/branch/${req.params.id}`
    );
    if (productBranch.status !== 204)
      next(
        new AppError(
          `Product branch does not Deleted. Please delete it manually with id(${data._id})`,
          404
        )
      );

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
