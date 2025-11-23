import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const PlayerDetails = lazy(()=> import("../pages/players/PlayerDetails"));

export const playerRoutes : RouteObject[] = [
    {
     path: "players/details/:playerId",
     element: (
        <ErrorBoundaryWrapper>
            <SuspenseWrapper>
                <PlayerDetails/>
            </SuspenseWrapper>
        </ErrorBoundaryWrapper>
     )
    },
];