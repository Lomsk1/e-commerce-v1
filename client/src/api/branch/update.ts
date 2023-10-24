import { getUserCookie } from "../../helpers/user";
import { branchBaseURL } from "../../middlewares/env";
import { BranchType } from "../../types/branch";
import { ResponseError } from "../../utils/responseError";

export const updateBranch = async ({
  city,
  address,
  name,
  phone,
  id,
  branchCoord,
  branchWorkingHours,
}: {
  id: string;
  city?: string;
  address?: string;
  name?: string;
  phone?: string;

  branchCoord?: { lat?: string; long?: string };
  branchWorkingHours?: { weekDay: string; hour: string }[];
}): Promise<BranchType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${branchBaseURL}api/v1/branch/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        city: city,
        name: name,
        address: address,
        phone: phone,
        branchCoord,
        branchWorkingHours,
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
