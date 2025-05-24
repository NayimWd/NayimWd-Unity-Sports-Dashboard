import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  // access user and auth satatus
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated && !user?._id) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute