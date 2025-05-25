import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"
import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "../features/auth/authApi";
import Loader from "../component/common/loader/Loader";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // access user and auth satatus
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // persist user 
  const { isLoading, isFetching } = useCurrentUserQuery(undefined, { skip: isAuthenticated });

  if (isLoading && isFetching) {
    return <Loader />
  }

  if (!isAuthenticated && !user?._id) {
    <Navigate to="/login" replace />
  }

  return <> {children}</>;
}

export default ProtectedRoute