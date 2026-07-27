import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import RiderRegister from "../pages/Rider/RiderRegister";
import SendParcel from "../pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "rider",
    element: (
      <PrivateRoute>
        <RiderRegister></RiderRegister>
      </PrivateRoute>
    ),
  },
  {
    path: "send-parcel",
    element: (
      <PrivateRoute>
        <SendParcel></SendParcel>
      </PrivateRoute>
    ),
    loader: () => fetch("/serviceCentets.json").then((res) => res.json()),
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
