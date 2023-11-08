import { getUserCookie } from "../../../helpers/user";
import { brandBaseURL } from "../../../middlewares/env";
import { brandType } from "../../../types/brand";
import { ResponseError } from "../../../utils/responseError";

export const updateBrandCategory= async ({
  id,
  brandCategoryId,
  name,
  categoryId,
}: {
  id: string;
  brandCategoryId: string;
  name?: string;
  categoryId?: string;
}): Promise<brandType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(
      `${brandBaseURL}api/v1/brand/${id}/category/${brandCategoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: name,
          categoryId: categoryId,
        }),
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
