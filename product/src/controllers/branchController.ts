import { NextFunction, Request, Response } from "express";
import Branch from "../models/branchModel";
import { deleteOne, updateOne } from "./common/factoryController";
import { catchAsync } from "../utils/catchAsync";

export const createBranch = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let createdData = req.body;

    const data = Branch.build({
      id: createdData.id,
      phone: createdData.phone,
      name: createdData.name,
      createdAt: createdData.createdAt,
      city: createdData.city,
      address: createdData.address,
      branchCoord: createdData.branchCoord,
      branchWorkingHours: undefined,
    });
    await data.save();

    res.status(201).json({
      status: "success",
      data,
    });
  }
);
export const deleteBranch = deleteOne(Branch);
export const updateBranch = updateOne(Branch);

export const createBranchWorkingTime = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let createdData = req.body;
    const data = await Branch.findById(req.params.id);
    data.branchWorkingHours.push(createdData);
    data.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      //   data,
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
      (workingTime) => workingTime.id !== workingTimeId
    );

    await branch.save({ validateBeforeSave: false });
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
      (wt) => wt.id.toString() === workingTimeId
    );

    if (!workingTime) {
      return next(new Error("Working time not found"));
    }

    // Update the working time with the new data
    Object.assign(workingTime, updatedWorkingTimeData);

    // Save the branch with the updated working hours
    await branch.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: workingTime,
    });
  }
);
