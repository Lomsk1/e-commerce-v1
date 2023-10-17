import { categoryBaseURL } from "../../middlewares/env";
import { CategoriesTypes } from "../../types/categoryTypes";
import { ResponseError } from "../../utils/responseError";

export const getAllCategory = async (): Promise<CategoriesTypes | null> => {
  try {
    const response = await fetch(`${categoryBaseURL}api/v1/category`, {
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

export const getCategoryById = async ({
  id,
}: {
  id: string;
}): Promise<CategoriesTypes | null> => {
  try {
    const response = await fetch(`${categoryBaseURL}api/v1/category/${id}`, {
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
