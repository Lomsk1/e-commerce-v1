import { ReactNode } from "react";
import useAuthStore from "../store/client/user/useAuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore((state) => state);

  return user?.status === "success" ? (
    children
  ) : (
    <Navigate to={"/"} replace={true} />
  );
};

export default ProtectedRoute;
