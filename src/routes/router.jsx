import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import RiderRegister from "../pages/Rider/RiderRegister";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ArroveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import RiderRoute from "./RiderRoute";
import AssignRIders from "../pages/Dashboard/AssignRiders/AssignRIders";
import RiderParcels from "../pages/Dashboard/RiderParcels/RiderParcels";
import MyDeliveries from "../pages/Dashboard/MyDeliveries/MyDeliveries";
import AssignDeliveries from "../pages/Dashboard/AssignDeliveries/AssignDeliveries";

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
    loader: () => fetch("/serviceCentets.json").then((res) => res.json()),
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-success",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // only rider routes
      {
        path: "assign-deliveries",
        element: (
          <RiderRoute>
            <AssignDeliveries></AssignDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "rider-parcels",
        element: (
          <RiderRoute>
            <RiderParcels></RiderParcels>
          </RiderRoute>
        ),
      },
      {
        path: "my-deliveries",
        element: (
          <RiderRoute>
            <MyDeliveries></MyDeliveries>
          </RiderRoute>
        ),
      },
      // only admin routes
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRIders></AssignRIders>
          </AdminRoute>
        ),
      }, 
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
