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

const clientRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={clientRoute} />;
}

export default App;
