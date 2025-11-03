import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import PublicRoute from "./PublicRoute";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import LoginSkeleton from "../component/common/loader/LoginSkeleton";
import RegisterSkeleton from "../component/common/loader/RegisterSkeleton";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <ErrorBoundaryWrapper>
        <PublicRoute>
          <SuspenseWrapper CustomLoader={<LoginSkeleton />}>
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
        <SuspenseWrapper CustomLoader={<RegisterSkeleton />}>
          <Registration />
        </SuspenseWrapper>
      </PublicRoute>
    </ErrorBoundaryWrapper>
    ),
  }
]