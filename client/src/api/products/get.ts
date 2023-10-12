import { productBaseURL } from "../../middlewares/env";
import { ProductsType } from "../../types/product";
import { ResponseError } from "../../utils/responseError";

export const getSearchProducts = async ({
  slug,
}: {
  slug: string;
}): Promise<ProductsType> => {
  try {
    const response = await fetch(
      `${productBaseURL}api/v1/product/search/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
