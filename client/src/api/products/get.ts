import { productBaseURL } from "../../middlewares/env";
import {
  ProductStatsTypes,
  ProductType,
  ProductsType,
} from "../../types/product";
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

export const getAllProduct = async (): Promise<ProductsType> => {
  try {
    const response = await fetch(`${productBaseURL}api/v1/product`, {
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

export const getProductById = async ({
  id,
}: {
  id: string;
}): Promise<ProductType> => {
  try {
    const response = await fetch(`${productBaseURL}api/v1/product/${id}`, {
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

export const getAllProductByParams = async ({
  searchParams,
}: {
  searchParams?: string;
}): Promise<ProductsType> => {
  try {
    const response = await fetch(
      `${productBaseURL}api/v1/product${searchParams ? searchParams : ""}`,
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

export const getProductsStats = async (): Promise<ProductStatsTypes> => {
  try {
    const response = await fetch(
      `${productBaseURL}api/v1/product/product-stats`,
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
