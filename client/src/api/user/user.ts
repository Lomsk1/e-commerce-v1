import { UserTypes, UsersTypes } from "../../types/userTypes";
import { userBaseURL } from "../../middlewares/env";
import { ResponseError } from "../../utils/responseError";
import { getUserCookie } from "../../helpers/user";

export const getUser = async (): Promise<UserTypes | null> => {
  const userToken = getUserCookie();
  if (!userToken) null;

  try {
    const response = await fetch(`${userBaseURL}api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const result = await response.json();

    // if (result.status !== "success") {
    //   throw new ResponseError(result.message, result);
    // }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};

export const getUsersByEmail = async ({
  email,
}: {
  email: string;
}): Promise<UsersTypes | null> => {
  const userToken = getUserCookie();
  if (!userToken) null;

  try {
    const response = await fetch(
      `${userBaseURL}api/v1/users/byEmail/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const result = await response.json();

    // if (result.status !== "success") {
    //   throw new ResponseError(result.message, result);
    // }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};

export const getUsersByParams = async ({
  params,
}: {
  params?: string;
}): Promise<UsersTypes | null> => {
  const userToken = getUserCookie();
  if (!userToken) null;

  try {
    const response = await fetch(
      `${userBaseURL}api/v1/users/?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const result = await response.json();

    // if (result.status !== "success") {
    //   throw new ResponseError(result.message, result);
    // }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new ResponseError(error.message, error);
  }
};
