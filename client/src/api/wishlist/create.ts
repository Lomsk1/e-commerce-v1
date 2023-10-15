import { getUserCookie } from "../../helpers/user";
import { userBaseURL } from "../../middlewares/env";
import { WishlistType } from "../../types/wishlist";
import { ResponseError } from "../../utils/responseError";

export const createWishlist = async ({
  product,
}: {
  product: string;
}): Promise<WishlistType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${userBaseURL}api/v1/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        product: product,
      }),
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
