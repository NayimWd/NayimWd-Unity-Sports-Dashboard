import { lazy } from "react";

const ManagerSummary = lazy(() => import("./ManagerSummary"));
const AdminSummary = lazy(() => import("./AdminSummary"));
const UmpireSummary = lazy(() => import("./UmpireSummary"));
const PlayerSummary = lazy(() => import("./PlayerSummary"));

type UserRole = "manager" | "admin" | "umpire" | "player";

const summaryMap: Record<UserRole, React.ComponentType> = {
  manager: ManagerSummary,
  admin: AdminSummary,
  umpire: UmpireSummary,
  player: PlayerSummary,
};

export const useDashboardSummary = (role?: string) => {
  const RoleSummary = summaryMap[role as UserRole] ?? null;
  return { RoleSummary };
};
