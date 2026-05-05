import { ReactNode } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { Navigate } from "react-router-dom";
import Loader from "../component/common/loader/Loader";
import { useCurrentUserQuery } from "../features/auth/authApi";

interface PubLicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PubLicRouteProps) => {
    // access user from redux store 
    const { isAuthenticated, user, authLoaded } = useSelector((state: RootState) => state.auth);
   // persist user check
    const { isLoading, isFetching } = useCurrentUserQuery(undefined, { skip:  authLoaded });
  

  // Wait for auth to load before redirecting
  if (isLoading || isFetching || !authLoaded) {
    return <Loader />
  }

    // redirect if user loggedin 
    if (isAuthenticated && user?._id) {
        return <Navigate to="/dashboard" />
    }

    return children ? <>{children}</> : <Navigate to="/login" replace />;
}

export default PublicRoute;