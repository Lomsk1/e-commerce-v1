import { getUserCookie } from "../../helpers/user";
import { categoryBaseURL } from "../../middlewares/env";
import { CategoryTypes } from "../../types/categoryTypes";
import { ResponseError } from "../../utils/responseError";

export const updateCategory = async ({
  name,
  id,
}: {
  id: string;
  name?: string;
}): Promise<CategoryTypes> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${categoryBaseURL}api/v1/category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        name: name,
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
