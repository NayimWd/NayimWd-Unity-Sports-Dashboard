import { RouteObject } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import PublicRoute from "./PublicRoute";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import LoginSkeleton from "../component/common/loader/LoginSkeleton";
import RegisterSkeleton from "../component/common/loader/RegisterSkeleton";
import Login from "../pages/auth/Login";
import RegistrationForm from "../pages/auth/Registration";

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
          <RegistrationForm />
        </SuspenseWrapper>
      </PublicRoute>
    </ErrorBoundaryWrapper>
    ),
  }
]