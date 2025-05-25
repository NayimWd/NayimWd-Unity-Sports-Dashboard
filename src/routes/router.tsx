import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";
import PublicRoute from "./PublicRoute";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Layout = lazy(() => import("../component/layout/DashBoardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PointTable = lazy(() => import("../pages/pointTable/PointTable"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const CreateBlog = lazy(() => import("../pages/Blogs/CreateBlogs"))


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectRoute />,
  },
  {
    path: "/login",
    element: <PublicRoute> <SuspenseWrapper children={<Login />} /> </PublicRoute>,
  },
  {
    path: "/SignUp",
    element: <PublicRoute> <SuspenseWrapper children={<Registration />} /> </PublicRoute>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper children={<Layout />} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SuspenseWrapper children={<Dashboard />} />,
      },
      {
        path: "pointTable",
        element: <SuspenseWrapper children={<PointTable />} />
      },
      /* blog */
      {
        path: "blogs",
        element: <SuspenseWrapper children={<Blogs />} />
      },
      {
        path: "blogs/details/:blogId",
        element: <SuspenseWrapper children={<BlogDetails />} />
      },
      {
        path: "blog/create",
        element: <SuspenseWrapper children={<CreateBlog />} />
      }
    ],
  },
  {
    path: "*",
    element: <SuspenseWrapper children={<NotFound />} />,
  },
]);
