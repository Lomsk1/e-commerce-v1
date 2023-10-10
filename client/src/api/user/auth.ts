import { userBaseURL } from "../../middlewares/env";
import { ResetPasswordTypes, UserTypes } from "../../types/userTypes";
import { ResponseError } from "../../utils/responseError";

export const loginFunction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserTypes> => {
  try {
    const response = await fetch(`${userBaseURL}api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new ResponseError(result.message, result);
    }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};

export const resetPassword = async ({
  email,
}: {
  email: string;
}): Promise<ResetPasswordTypes> => {
  try {
    const response = await fetch(`${userBaseURL}api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new ResponseError(result.message, result);
    }

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
