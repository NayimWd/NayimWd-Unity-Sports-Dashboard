import { useSelector } from "react-redux"
import { RootState } from "../app/store/store";
import { Navigate } from "react-router-dom";

const RedirectRoute = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    // redirect if user authenticared
    if (isAuthenticated && user?._id) {
        return <Navigate to="/dashboard" />
    }

    return <Navigate to="/login" />
}

export default RedirectRoute;