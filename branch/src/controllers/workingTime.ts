import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import Branch from "../models/branchModel";
import axios from "axios";
import { productURI } from "../config/keys";
import AppError from "../utils/appErrors";

export const createBranchWorkingTime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let createdData = req.body;
    const data = await Branch.findById(req.params.id);
    data.branchWorkingHours.push(createdData);
    data.save({ validateBeforeSave: false });

    if (data) {
      const createBranchTime = await axios.patch(
        `${productURI}api/v1/branch/${req.params.id}/workingTime`,
        {
          ...createdData,
          id: data.branchWorkingHours[
            data.branchWorkingHours.length - 1
          ].id.toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (createBranchTime.status !== 201) {
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

export const deleteBranchWorkingTime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const branchId = req.params.id;
    const workingTimeId = req.params.workingTimeId;

    const branch = await Branch.findById(branchId);

    if (!branch) {
      return next(new Error("Branch not found"));
    }

    branch.branchWorkingHours = branch.branchWorkingHours.filter(
      (workingTime) => workingTime._id.toString() !== workingTimeId
    );

    await branch.save({ validateBeforeSave: false });

    if (branch) {
      const createProductBranch = await axios.patch(
        `${productURI}api/v1/branch/${req.params.id}/workingTime/${req.params.workingTimeId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (createProductBranch.status !== 201) {
        await Branch.findByIdAndDelete(branch._id);

        return next(new AppError("Product branch does not created", 404));
      }
    }

    res.status(201).json({
      status: "success",
      branch,
    });
  }
);

export const editBranchWorkingTime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const branchId = req.params.id;
    const workingTimeId = req.params.workingTimeId;
    const updatedWorkingTimeData = req.body;

    // Find the branch by its ID
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return next(new Error("Branch not found"));
    }

    // Find the working time within the branch's working hours array
    const workingTime = branch.branchWorkingHours.find(
      (wt) => wt._id.toString() === workingTimeId
    );

    if (!workingTime) {
      return next(new Error("Working time not found"));
    }

    // Update the working time with the new data
    Object.assign(workingTime, updatedWorkingTimeData);

    const productBranch = await axios.put(
      `${productURI}api/v1/branch/${req.params.id}/workingTime/${req.params.workingTimeId}`,
      {
        ...updatedWorkingTimeData,
      }
    );

    if (productBranch.status !== 200)
      next(
        new AppError(
          `Product branch does not Updated. Please Update it manually with id(${branch._id})`,
          404
        )
      );

    // Save the branch with the updated working hours
    await branch.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: workingTime,
    });
  }
);
