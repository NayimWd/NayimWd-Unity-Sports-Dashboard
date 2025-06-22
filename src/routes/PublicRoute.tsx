import { ReactNode } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { Navigate } from "react-router-dom";

interface PubLicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PubLicRouteProps) => {
    // access user from redux store 
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    // redirect if user loggedin 
    if (isAuthenticated && user?._id) {
        return <Navigate to="/dashboard" />
    }

    return children ? <>{children}</> : <Navigate to="/login" replace />;
}

export default PublicRoute;