import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavigation from "../../components/navigation/client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user/user";
import useAuthStore from "../../store/client/user/useAuthStore";

const RootLayout: React.FC = () => {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
  const userState = useAuthStore((state) => state.setUser);

  // console.log(userQuery.data);
  if (userQuery.isSuccess) {
    userState(userQuery.data);
  }

  if (userQuery.isLoading) {
    return <h1>Loading... </h1>;
  }

  return (
    <>
      <ClientNavigation />

      <Outlet />
    </>
  );
};

export default RootLayout;
