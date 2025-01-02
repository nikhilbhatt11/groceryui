import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AddItem from "./pages/AddItem.jsx";
import CreateSale from "./pages/CreateSale.jsx";
import AllSales from "./pages/AllSales.jsx";
import Inventry from "./pages/Inventry.jsx";

import UpdateItem from "./pages/UpdateItem.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import RecentSale from "./pages/RecentSale.jsx";
import SaleDetail from "./pages/SaleDetail.jsx";
import Shop_Wishlist_Page from "./pages/Shop_Wishlist_Page.jsx";
import MonthlyGrowthChartPage from "./pages/MonthlyGrowthChartPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import FirstPage from "./pages/FirstPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FirstPage />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-item",
        element: (
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sell",
        element: (
          <ProtectedRoute>
            <CreateSale />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-sales",
        element: (
          <ProtectedRoute>
            <AllSales />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop-inventry",
        element: (
          <ProtectedRoute>
            <Inventry />
          </ProtectedRoute>
        ),
      },
      {
        path: "/details/:productId",
        element: (
          <ProtectedRoute>
            <DetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-item/:productId",
        element: (
          <ProtectedRoute>
            <UpdateItem />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recentSale",
        element: (
          <ProtectedRoute>
            <RecentSale />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saleDetails/:saleId",
        element: (
          <ProtectedRoute>
            <SaleDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Shop_Wishlist_Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "/monthAnalytics",
        element: (
          <ProtectedRoute>
            <MonthlyGrowthChartPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);
