import { getUserCookie } from "../../../helpers/user";
import { branchBaseURL } from "../../../middlewares/env";
import { BranchType } from "../../../types/branch";
import { ResponseError } from "../../../utils/responseError";

export const createBranchWorkingTime = async ({
  id,
  weekDay,
  hour,
}: {
  id: string;
  weekDay: string;
  hour: string;
}): Promise<BranchType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(
      `${branchBaseURL}api/v1/branch/${id}/workingTime`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          weekDay: weekDay,
          hour: hour,
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
