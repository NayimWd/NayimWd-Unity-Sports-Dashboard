import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  // access user and auth satatus
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute