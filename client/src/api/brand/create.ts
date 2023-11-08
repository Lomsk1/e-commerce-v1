import { getUserCookie } from "../../helpers/user";
import { brandBaseURL } from "../../middlewares/env";
import { brandType } from "../../types/brand";
import { ResponseError } from "../../utils/responseError";

export const createBrand = async ({
  formData,
}: {
  formData: FormData;
}): Promise<brandType> => {
  const userToken = getUserCookie();
  if (!userToken) null;
  try {
    const response = await fetch(`${brandBaseURL}api/v1/brand`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (result.status !== "success") {
      return result;
    }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
