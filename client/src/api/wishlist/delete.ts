import { getUserCookie } from "../../helpers/user";
import { userBaseURL } from "../../middlewares/env";
import { ResponseError } from "../../utils/responseError";

export const deleteWishlist = async ({
  id,
}: {
  id: string;
}): Promise<{ status: string }> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${userBaseURL}api/v1/wishlist/del/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.status !== 204) {
      throw new ResponseError("Something wrong during deletion", response);
    }

    // const result = await response.json();

    const ret = { status: "success" };

    return ret;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
