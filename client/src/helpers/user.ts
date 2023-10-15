import jwtDecode from "jwt-decode";
import { UserDecodedTypes, UserTypes } from "../types/userTypes";
import Cookies from "js-cookie";

const USER_COOKIE_KEY = "jwt";

export function setUserCookie(userToken: UserTypes["token"]): void {
  Cookies.set(USER_COOKIE_KEY, userToken);
}

export function getUserCookie(): string | undefined {
  const userToken = Cookies.get(USER_COOKIE_KEY);
  if (!userToken) {
    return undefined;
  }

  try {
    const decodedUser = jwtDecode<UserDecodedTypes>(userToken);

    /* Check if the token is still valid */
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedUser.exp && decodedUser.exp <= currentTime) {
      return undefined;
    }

    return userToken;
  } catch (error) {
    return undefined;
  }
}

export function removeUserCookie(): void {
  Cookies.remove(USER_COOKIE_KEY);
}
