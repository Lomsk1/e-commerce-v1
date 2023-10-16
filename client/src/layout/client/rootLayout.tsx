import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ClientNavigation from "../../components/navigation/client";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user/user";
import useAuthStore from "../../store/client/user/useAuthStore";
import { getAllCategory } from "../../api/category/cateogry";
import useCategoryStore from "../../store/client/category/category";
import { getWishlistByUser } from "../../api/wishlist/get";
import useWishlistStore from "../../store/client/wishlist/wishlist";
import { getUserCookie } from "../../helpers/user";
import Footer from "../../components/footer";
import { ScrollRestoration } from "react-router-dom";

const RootLayout: React.FC = () => {
  /* State */
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    setIsUser(!!getUserCookie());
  }, []);

  /* Queries */
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isUser,
    retry: false,
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
    retry: 2,
  });

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistByUser,
    enabled: !!userQuery.data,
    retry: 1,
  });

  /* Stores */
  const userState = useAuthStore((state) => state.setUser);
  const categoriesState = useCategoryStore((state) => state.setCategories);
  const wishlistState = useWishlistStore((state) => state.setWishlist);

  /* User Query Functions */
  if (userQuery.isSuccess) {
    userState(userQuery.data);
  }

  if (categoryQuery.isLoading) {
    return <h1>Loading... </h1>;
  }

  if (isUser && userQuery.isLoading) {
    return <h1>Loading... </h1>;
  }

  if (isUser && wishlistQuery.isLoading) {
    return <h1>Loading... </h1>;
  }
  /* Category Query Functions */
  if (categoryQuery.isSuccess) {
    categoriesState(categoryQuery.data);
  }
  if (wishlistQuery.isSuccess) {
    wishlistState(wishlistQuery.data);
  }

  /* Loading Function for All */
  // if (userQuery.isLoading || categoryQuery.isLoading) {
  //   return <h1>Loading... </h1>;
  // }
  return (
    <>
      <ClientNavigation />

      <Outlet />

      <Footer />

      <ScrollRestoration />
    </>
  );
};

export default RootLayout;
