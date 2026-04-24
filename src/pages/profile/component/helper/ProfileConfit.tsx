import { lazy } from "react";


const PlayerProfile = lazy(() => import("../PlayerProfile"));
const ManagerProfile = lazy(() => import("../ManagerProfile"));
const UmpireProfile = lazy(() => import("../UmpireProfile"));

type UserRole = "manager" | "player" | "umpire";

const profileMap: Record<UserRole, React.ComponentType> = {
    manager: ManagerProfile,
    player: PlayerProfile,
    umpire: UmpireProfile
};


export const useProfileStragegy = (role?: string) => {
    const ProfileComponent = profileMap[role as UserRole] ?? null;
    return { ProfileComponent }
};