import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import "./styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EachProduct from "./pages/each_product";
import Branches from "./pages/branches";
import HotDealMain from "./pages/hos_sales/main";
import EachSale from "./pages/hos_sales/with_slide";
import NewProductPage from "./pages/new_products";
import BrandPage from "./pages/brands";
import CartPage from "./pages/cart";
import WishlistPage from "./pages/wishlist";
import AdminBranch from "./pages/admin/branch";
import AdminHomePage from "./pages/admin/home";
import AdminBrand from "./pages/admin/brand";
import AdminCategory from "./pages/admin/category";
import AdminNews from "./pages/admin/news";
import AdminWeeklySale from "./pages/admin/weekly_sale";
import AdminProduct from "./pages/admin/product";
import FilterPage from "./pages/filter";
import { useEffect } from "react";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import ProfilePage from "./pages/profile";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, loadUser } from "./API/auth/actions";
import PasswordResetConfirmation from "./pages/auth/passResConf";
import UserActivatePage from "./pages/auth/userActivate";
import PasswordChangePage from "./pages/auth/passChange";
import EmailChangeHandler from "./pages/auth/emailChange";
import PrivateRoute, { PrivateRouteForAdmin } from "./hoc/protectedRouter";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { getWishlistByUser } from "./API/wishlist/action";
import AboutUs from "./pages/about_us";
import ContactUs from "./pages/contact_us";
import TermsAndPrivacy from "./pages/terms_privace";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, userInfo, userToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadUser());
      })
      .catch((rejectedValue) => {
        console.log(rejectedValue);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
      const user = jwt_decode(token?.access);
      dispatch(
        getWishlistByUser({
          id: user.user_id,
        })
      );

      dispatch(loadUser());
    }
  }, [isAuthenticated]);

  if (localStorage.getItem("authTokens")) {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    const user = jwt_decode(token?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  }
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/each_products/:name/:id" element={<EachProduct />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/hot_deal_main_page" element={<HotDealMain />} />
        <Route path="/each_sale/:id" element={<EachSale />} />
        <Route path="/new_product" element={<NewProductPage />} />
        <Route path="/brand_page/:name/:id" element={<BrandPage />} />
        <Route path="/cart_main_page" element={<CartPage />} />
        <Route path="/wishlist_main_page" element={<WishlistPage />} />
        <Route path="/filer_page/:name/:id" element={<FilterPage />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/terms_and_privacy" element={<TermsAndPrivacy />} />

        <Route path="/register" element={<RegisterPage />} />
        {!isAuthenticated && <Route path="/log_in" element={<LoginPage />} />}
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirmation />}
        />
        <Route path="/activate/:uid/:token" element={<UserActivatePage />} />

        <Route
          path="/password_change"
          element={
            <PrivateRoute>
              <PasswordChangePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/email_change"
          element={
            <PrivateRoute>
              <EmailChangeHandler />
            </PrivateRoute>
          }
        />

        <Route
          path="/costumer/info"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin_home_page"
          element={
            <PrivateRouteForAdmin>
              <AdminHomePage />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_branch"
          element={
            <PrivateRouteForAdmin>
              <AdminBranch />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_brand"
          element={
            <PrivateRouteForAdmin>
              <AdminBrand />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_category"
          element={
            <PrivateRouteForAdmin>
              <AdminCategory />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_news"
          element={
            <PrivateRouteForAdmin>
              <AdminNews />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_weekly_sale"
          element={
            <PrivateRouteForAdmin>
              <AdminWeeklySale />
            </PrivateRouteForAdmin>
          }
        />
        <Route
          path="/admin_product"
          element={
            <PrivateRouteForAdmin>
              <AdminProduct />
            </PrivateRouteForAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
