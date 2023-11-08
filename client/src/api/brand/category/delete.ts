import { getUserCookie } from "../../../helpers/user";
import { brandBaseURL } from "../../../middlewares/env";
import { ResponseError } from "../../../utils/responseError";

export const deleteBrandCategory = async ({
  id,
  categoryId,
}: {
  id: string;
  categoryId: string;
}): Promise<{
  message: string;
  status: string;
}> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(
      `${brandBaseURL}api/v1/brand/${id}/category/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

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
