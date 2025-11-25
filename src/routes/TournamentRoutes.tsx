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
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Tournaments />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <TournamentDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateTournament />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTournamentDate />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdatePhoto />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateResult />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]