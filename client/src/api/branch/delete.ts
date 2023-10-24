import { getUserCookie } from "../../helpers/user";
import { branchBaseURL } from "../../middlewares/env";
import { ResponseError } from "../../utils/responseError";

export const deleteBranch = async ({
  id,
}: {
  id: string;
}): Promise<{ status: "success" }> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${branchBaseURL}api/v1/branch/${id}`, {
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
