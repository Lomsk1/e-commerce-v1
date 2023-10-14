import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavigation from "../../components/navigation/client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user/user";
import useAuthStore from "../../store/client/user/useAuthStore";
import { getAllCategory } from "../../api/category/cateogry";
import useCategoryStore from "../../store/client/category/category";

const RootLayout: React.FC = () => {
  /* Queries */
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });

  /* Stores */
  const userState = useAuthStore((state) => state.setUser);

  const categoriesState = useCategoryStore((state) => state.setCategories);

  /* User Query Functions */
  if (userQuery.isSuccess) {
    userState(userQuery.data);
  }

  if (categoryQuery.isLoading) {
    return <h1>Loading... </h1>;
  }

  /* Category Query Functions */
  if (categoryQuery.isSuccess) {
    categoriesState(categoryQuery.data);
  }

  /* Loading Function for All */
  // if (userQuery.isLoading || categoryQuery.isLoading) {
  //   return <h1>Loading... </h1>;
  // }
  return (
    <>
      <ClientNavigation />

      <Outlet />
    </>
  );
};

export default RootLayout;
