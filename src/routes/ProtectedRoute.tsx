import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useCurrentUserQuery } from "../features/auth/authApi";
import Loader from "../component/common/loader/Loader";

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

  if (!isAuthenticated || !user?._id) {
    return <Navigate to="/login" />;
  }

  return  <>{children && <Navigate to="/dashboard"/>}</> ;
}

export default ProtectedRoute