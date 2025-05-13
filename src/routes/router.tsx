import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Layout = lazy(() => import("../component/layout/DashBoardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PointTable = lazy(()=> import("../pages/pointTable/PointTable"))
const Blogs = lazy(()=> import("../pages/Blogs/Blogs"))


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <SuspenseWrapper children={<Login />} />,
  },
  {
    path: "/registration",
    element: <SuspenseWrapper children={<Registration />} />,
  },
  {
    path: "/dashboard",
    element: <SuspenseWrapper children={<Layout />} />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper children={<Dashboard />} />,
      },
      {
        path:"pointTable",
        element: <SuspenseWrapper children={<PointTable/>} />
      },
      {
        path: "blogs",
        element: <SuspenseWrapper children={<Blogs/>}/>
      }
    ],
  },
  {
    path: "*",
    element: <SuspenseWrapper children={<NotFound/>}/>,
  },
]);
