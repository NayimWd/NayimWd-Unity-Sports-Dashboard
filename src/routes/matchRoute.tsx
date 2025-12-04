import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Matches = lazy(() => import("../pages/match/GetMatches"));
const MatchDetails = lazy(() => import("../pages/match/MatchDetails"));
const CreateMatch = lazy(() => import("../pages/match/CreateMatch"));
const CreateMatchResult = lazy(() => import("../pages/match/CreateMatchResult"));
const UpdateUmpire = lazy(() => import("../pages/match/UpdateUmpire"));
const UpdateTeam = lazy(() => import("../pages/match/UpdateTeam"));
const UpdateMatchResult = lazy(() => import("../pages/match/UpdateMatchResult"));


export const matchRoutes: RouteObject[] = [
    {
        path: "matches/:tournamentId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Matches />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/details/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <MatchDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateMatch />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/createResult/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateMatchResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/updateResult/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateMatchResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/updateUmpire/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateUmpire />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "matches/updateTeam/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTeam />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },

]