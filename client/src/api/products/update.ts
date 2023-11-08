import { getUserCookie } from "../../helpers/user";
import { productBaseURL } from "../../middlewares/env";
import { ProductType } from "../../types/product";
import { ResponseError } from "../../utils/responseError";

export const updateProduct = async ({
  formData,
  id,
}: {
  id: string;
  formData: FormData;
}): Promise<ProductType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${productBaseURL}api/v1/product/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    //   if (result.status !== "success") {
    //     throw new ResponseError(result.message, result);
    //   }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};

export const updateProductMore = async ({
  id,
  sale,
  newPrice,
  top,
  popularity,
  productModel,
  totalInStock,
}: {
  id: string;
  sale?: number;
  newPrice?: number;
  top?: boolean;
  popularity?: boolean;
  productModel?: string;
  totalInStock?: boolean;
}): Promise<ProductType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${productBaseURL}api/v1/product/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sale: sale,
        newPrice,
        top,
        popularity,
        productModel,
        totalInStock,
      }),
    });

    const result = await response.json();

    //   if (result.status !== "success") {
    //     throw new ResponseError(result.message, result);
    //   }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
