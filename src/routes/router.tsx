import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import { authRoutes } from "./authRoute";
import { dashboardRoutes } from "./dashboardRoute";
import PageSkeleton from "../component/common/loader/PageSkeleton";
import DashboardSkeleton from "../component/common/loader/DashboardSkeleton";
const NotFound = lazy(() => import("../pages/NotFound"));
const Layout = lazy(() => import("../component/layout/DashBoardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));


export const router = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: <RedirectRoute />,
  },
  {
    path: "/dashboard",
    element: (
      <ErrorBoundaryWrapper>
        <ProtectedRoute>
          <SuspenseWrapper CustomLoader={<DashboardSkeleton />}>
            <Layout />
          </SuspenseWrapper>
        </ProtectedRoute>
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper CustomLoader={<PageSkeleton />}>
              <Dashboard />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        ),
      },

      /* all routes inside dashboard*/
      ...dashboardRoutes,
    ],
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper CustomLoader={<PageSkeleton />}>
        <NotFound />
      </SuspenseWrapper>),
  },
]);
