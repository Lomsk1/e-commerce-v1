import { getUserCookie } from "../../helpers/user";
import { productBaseURL } from "../../middlewares/env";
import { ProductType } from "../../types/product";
import { ResponseError } from "../../utils/responseError";

export const createProduct = async ({
  formData,
}: {
  formData: FormData;
}): Promise<
  ProductType & {
    error: {
      errors: {
        name: {
          message: string;
          path:
            | "title"
            | "description"
            | "thumbnail"
            | "color"
            | `root.${string}`
            | "price"
            | "brand"
            | "category"
            | "separate";
        };
      };
    };
    message: string;
    status: string;
  }
> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${productBaseURL}api/v1/product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (result.status !== "success") {
      return result;
    }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
