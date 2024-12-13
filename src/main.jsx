import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AddItem from "./pages/AddItem.jsx";
import CreateSale from "./pages/CreateSale.jsx";
import AllSales from "./pages/AllSales.jsx";
import Inventry from "./pages/Inventry.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/all-items",
        element: <Home />,
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
        element: <AddItem />,
      },
      {
        path: "/sell",
        element: <CreateSale />,
      },
      {
        path: "/all-sales",
        element: <AllSales />,
      },
      {
        path: "/shop-inventry",
        element: <Inventry />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
