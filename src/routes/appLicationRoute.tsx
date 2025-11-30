import { lazy } from "react";
import { RouteObject } from "react-router-dom";

export const TournamentApplications = lazy(()=> import("../pages/registration/GetTournamentApplication"))

export const applicationRoutes: RouteObject[] = [
    {
        path: "application",
    }
]