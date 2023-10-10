// import axios from "axios";
// import { userBaseURL } from "../middlewares/env";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// const authTokens = localStorage.getItem("authTokens")
//   ? JSON.parse(localStorage.getItem("authTokens"))
//   : null;

// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     Authorization: `Bearer ${authTokens?.access}`,
//     "Content-type": "multipart/form-data",
//     // application/json
//   },
//   withCredentials: true,
// });

// export const axiosUnAuthorizedWithImg = axios.create({
//   baseURL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "multipart/form-data",
//   },
// });

// export const axiosUnAuthorized = axios.create({
//   baseURL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   // withCredentials: "true",
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   if (!authTokens) {
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null;
//     req.headers.Authorization = `Bearer ${authTokens?.access}`;
//   }

//   const user = jwt_decode(authTokens?.access);
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//   if (!isExpired) return req;

//   const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
//     refresh: authTokens.refresh,
//   });

//   localStorage.setItem("authTokens", JSON.stringify(response.data));
//   req.headers.Authorization = `Bearer ${response.data.access}`;

//   return req;
// });

// export default axiosInstance;
