import { useSelector } from "react-redux"
import { RootState } from "../app/store/store";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../component/common/loader/Loader";
import { useCurrentUserQuery } from "../features/auth/authApi";

const RedirectRoute = () => {
  // location 
  const location = useLocation();

  const { isAuthenticated, user, authLoaded } = useSelector((state: RootState) => state?.auth);

   // persist user check
    const { isLoading, isFetching } = useCurrentUserQuery(undefined, { skip:  authLoaded });
  

  // Wait for auth to load before redirecting
  if (isLoading || isFetching || !authLoaded) {
    return <Loader />
  }

  // redirect if user authenticared
  if (isAuthenticated && user?._id) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return <Navigate to="/login" replace state={{ from: location }} />
}

export default RedirectRoute;