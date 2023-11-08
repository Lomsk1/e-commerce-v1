import { getUserCookie } from "../../../helpers/user";
import { brandBaseURL } from "../../../middlewares/env";
import { brandType } from "../../../types/brand";
import { ResponseError } from "../../../utils/responseError";

export const createBrandCategory = async ({
  id,
  data,
}: {
  id: string;
  data: string;
}): Promise<brandType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${brandBaseURL}api/v1/brand/${id}/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: data,
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
