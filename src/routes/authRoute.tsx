import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import PublicRoute from "./PublicRoute";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
const Login = lazy(() => import("../pages/auth/Login"));
const Registration = lazy(() => import("../pages/auth/Registration"));


export const authRoutes: RouteObject[] = [
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
  }
]