import { RouteObject } from "react-router-dom";
import { pointTableRoutes } from "./pointTable";
import { blogRoutes } from "./blogRoute";
import { accountRoutes } from "./accountRoute";
import { profileRoutes } from "./profileRoute";


export const dashboardRoutes: RouteObject[] = [
    ...pointTableRoutes,
    ...blogRoutes,
    ...accountRoutes,
    ...profileRoutes,
]