import { getUserCookie } from "../../helpers/user";
import {  categoryBaseURL } from "../../middlewares/env";
import { ResponseError } from "../../utils/responseError";

export const deleteCategory = async ({
  id,
}: {
  id: string;
}): Promise<{ status: string; message: string }> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${categoryBaseURL}api/v1/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const result = await response.json();

    //   if (!response.ok) {
    //     throw new ResponseError('something went wrong', result);
    //   }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
