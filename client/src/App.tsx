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

const clientRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="branch" element={<BranchPage />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="terms-and-privacy" element={<TermsAndPrivacy />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={clientRoute} />;
}

export default App;
