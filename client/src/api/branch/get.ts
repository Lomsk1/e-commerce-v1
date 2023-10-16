import { branchBaseURL } from "../../middlewares/env";
import { BranchesType } from "../../types/branch";
import { ResponseError } from "../../utils/responseError";

export const getAllBranch = async (): Promise<BranchesType> => {
  try {
    const response = await fetch(`${branchBaseURL}api/v1/branch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new ResponseError(result.message, result);
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
