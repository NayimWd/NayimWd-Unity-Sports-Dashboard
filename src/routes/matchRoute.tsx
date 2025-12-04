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
const ManageMatch = lazy(() => import("../pages/match/ManageMatch"));


export const matchRoutes: RouteObject[] = [
    {
        path: "match",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Matches />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "match/manage",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <ManageMatch />
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
        path: "match/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateMatch />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "match/createResult/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateMatchResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "match/updateResult/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateMatchResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "match/updateUmpire/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateUmpire />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "match/updateTeam/:matchId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTeam />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }

]