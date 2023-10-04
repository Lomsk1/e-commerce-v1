import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  const user = jwt_decode(token?.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  return !isExpired ? children : <Navigate to={"/log_in"} replace={true} />;
}

export function PrivateRouteForAdmin({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [user, setUser] = useState(() =>
    localStorage.getItem("blob") ? localStorage.getItem("blob") : null
  );

  return user === "true" ? children : <Navigate to={"/"} replace={true} />;
}

// function PrivateRouter({ children }) {
//     const { user } = useContext(AuthContext);

//     return user ? children : "You are not authorized";
//   }

//   export default PrivateRouter;
