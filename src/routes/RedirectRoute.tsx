import { useSelector } from "react-redux"
import { RootState } from "../app/store/store";
import { Navigate, useLocation } from "react-router-dom";

const RedirectRoute = () => {
    // location 
    const location = useLocation();

    const { isAuthenticated, user, authLoaded } = useSelector((state: RootState) => state?.auth);

     // Wait for auth to load before redirecting
  if (!authLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-font">Loading...</div>;
  }

    // redirect if user authenticared
    if (isAuthenticated && user?._id) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />
    }

    return <Navigate to="/login" replace state={{ from: location }} />
}

export default RedirectRoute;