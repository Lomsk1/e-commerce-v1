import { brandBaseURL } from "../../middlewares/env";
import { brandsTypes } from "../../types/brand";
import { ResponseError } from "../../utils/responseError";

export const getAllBrands = async (): Promise<brandsTypes> => {
  try {
    const response = await fetch(`${brandBaseURL}api/v1/brand`, {
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
