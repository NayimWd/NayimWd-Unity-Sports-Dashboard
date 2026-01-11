import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";

export const useAuthRole = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const role = user?.role;

  const isAdmin = role === "admin";
  const isStaff = role === "staff";
  const isAuthor = isAdmin || isStaff;
  const isManager = role === "manager";
  const isPlayer = role === "player";
  const isUmpire = role === "umpire";

  return {
    isAuthenticated,
    isAdmin,
    isStaff,
    isAuthor,
    isManager,
    isPlayer,
    isUmpire,
  };
};
