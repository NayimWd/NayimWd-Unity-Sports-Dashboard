import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import PlayerDetailsSkeleton from "../component/common/skeleton/PlayerDetailsSkeleton";
const PlayerDetails = lazy(()=> import("../pages/players/PlayerDetails"));

export const playerRoutes : RouteObject[] = [
    {
     path: "players/details/:playerId",
     element: (
        <ErrorBoundaryWrapper>
            <SuspenseWrapper CustomLoader={<PlayerDetailsSkeleton/>}>
                <PlayerDetails/>
            </SuspenseWrapper>
        </ErrorBoundaryWrapper>
     )
    },
];