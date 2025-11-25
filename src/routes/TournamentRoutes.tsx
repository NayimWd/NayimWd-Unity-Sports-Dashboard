import { RouteObject } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import { lazy } from "react";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
const Tournaments = lazy(() => import("../pages/tournament/Tournaments"));
const TournamentDetails = lazy(() => import("../pages/tournament/TournamentDetails"));
const CreateTournament = lazy(() => import("../pages/tournament/CreateTournament"));
const UpdateDetails = lazy(() => import("../pages/tournament/updateDetails"))
const UpdateTournamentDate = lazy(() => import("../pages/tournament/updateTournamentDate"))
const UpdatePhoto = lazy(() => import("../pages/tournament/updatePhoto"))
const CreateResult = lazy(() => import("../pages/tournament/CreateResult"))


export const tournamentRoutes: RouteObject[] = [
    {
        path: "tournament",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Tournaments />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/details/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <TournamentDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateTournament />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/updateDetails/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/updateDate/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTournamentDate />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/updatePhoto/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdatePhoto />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "tournament/createResult/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]