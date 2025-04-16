import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Loader from "../component/common/loader/Loader";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Layout = lazy(() => import("../component/layout/DashBoardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/registration",
    element: (
      <Suspense fallback={<Loader />}>
        <Registration />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout children={<Outlet />} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);
