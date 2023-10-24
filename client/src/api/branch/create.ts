import { getUserCookie } from "../../helpers/user";
import { branchBaseURL } from "../../middlewares/env";
import { BranchType } from "../../types/branch";
import { ResponseError } from "../../utils/responseError";

export const createBranch = async ({
  city,
  address,
  name,
  phone,
  branchCoord,
}: {
  city: string;
  address: string;
  name: string;
  phone: string;
  branchCoord: { lat: string; long: string };

}): Promise<BranchType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${branchBaseURL}api/v1/branch`, {
      method: "POST",
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
