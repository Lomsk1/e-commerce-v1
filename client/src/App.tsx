import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/main.scss";

import RootLayout from "./layout/client/rootLayout";
import HomePage from "./pages/home";

const clientRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={clientRoute} />;
}

export default App;
