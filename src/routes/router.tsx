import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";
import PublicRoute from "./PublicRoute";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Layout = lazy(() => import("../component/layout/DashBoardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PointTable = lazy(() => import("../pages/pointTable/PointTable"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const CreateBlog = lazy(() => import("../pages/Blogs/CreateBlogs"));
const UpdateBlogDetails = lazy(()=> import("../pages/Blogs/UpdateBlogDetails"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectRoute />,
  },
  {
    path: "/login",
    element: (
      <ErrorBoundaryWrapper>
        <PublicRoute>
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        </PublicRoute>
      </ErrorBoundaryWrapper>
    ),
  },
  {
    path: "/SignUp",
    element: (<ErrorBoundaryWrapper>
      <PublicRoute>
        <SuspenseWrapper>
          <Registration />
        </SuspenseWrapper>
      </PublicRoute>
    </ErrorBoundaryWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ErrorBoundaryWrapper>
        <ProtectedRoute>
          <SuspenseWrapper>
            <Layout />
          </SuspenseWrapper>
        </ProtectedRoute>
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        index: true,
        element: (<ErrorBoundaryWrapper>
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        </ErrorBoundaryWrapper>
        ),
      },
      {
        path: "pointTable",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <PointTable />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      /* blog */
      {
        path: "blogs",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <Blogs />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blogs/details/:blogId",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <BlogDetails />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blog/create",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <CreateBlog />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blog/update/:blogId",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <UpdateBlogDetails/>
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      }
    ],
  },
  {
    path: "*",
    element: (<SuspenseWrapper>
      <NotFound />
    </SuspenseWrapper>),
  },
]);
