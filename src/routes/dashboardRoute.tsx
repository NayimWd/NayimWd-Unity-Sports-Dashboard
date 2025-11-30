import { RouteObject } from "react-router-dom";
import { pointTableRoutes } from "./pointTable";
import { blogRoutes } from "./blogRoute";
import { accountRoutes } from "./accountRoute";
import { profileRoutes } from "./profileRoute";
import { teamRoutes } from "./teamRoute";
import { playerRoutes } from "./PlayerRoutes";
import { venueRoutes } from "./venueRoute";
import { tournamentsRoutes } from "./TournamentRoutes";
import { applicationRoutes } from "./appLicationRoute";



export const dashboardRoutes: RouteObject[] = [
    ...pointTableRoutes,
    ...blogRoutes,
    ...accountRoutes,
    ...profileRoutes,
    ...teamRoutes,
    ...playerRoutes,
    ...venueRoutes,
    ...tournamentsRoutes,
    ...applicationRoutes
]