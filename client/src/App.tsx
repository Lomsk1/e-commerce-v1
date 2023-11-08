import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/main.scss";

import RootLayout from "./layout/client/rootLayout";
import HomePage from "./pages/home";
import CartPage from "./pages/cart";
import ContactUs from "./pages/contact";
import BranchPage from "./pages/branch";
import TermsAndPrivacy from "./pages/term&privacy";
import WishlistPage from "./pages/wishlist";
import AboutUs from "./pages/about";
import FilterPage from "./pages/filter";
import BrandPage from "./pages/brand";
import BrandEachPage from "./pages/brandEach";
import EachProduct from "./pages/product";
import ProfilePage from "./pages/auth/profile";
import ProtectedRoute from "./hoc/protected";
import PasswordChangePage from "./pages/auth/passwordChange";
import AdminPanelPage from "./pages/admin/home";
import AdminBranch from "./pages/admin/branch";
import AdminBrand from "./pages/admin/brand";
import AdminCategory from "./pages/admin/category";
import AdminProduct from "./pages/admin/product";

const clientRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id/:name" element={<EachProduct />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="branch" element={<BranchPage />} />
        <Route path="products-filter" element={<FilterPage />} />
        <Route path="brand" element={<BrandPage />} />
        <Route path="brand/:name/:id" element={<BrandEachPage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="terms-and-privacy" element={<TermsAndPrivacy />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route
          path="profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:userId/password-change"
          element={
            <ProtectedRoute>
              <PasswordChangePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/:id"
          element={
            <ProtectedRoute>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/branch"
          element={
            <ProtectedRoute>
              <AdminBranch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/brand"
          element={
            <ProtectedRoute>
              <AdminBrand />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute>
              <AdminCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <AdminProduct />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* <Route path="/admin" element={<AdminRootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />
      </Route> */}
    </>
  )
);

function App() {
  return <RouterProvider router={clientRoute} />;
}

export default App;
