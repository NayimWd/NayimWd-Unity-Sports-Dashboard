import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";

export const TournamentApplications = lazy(()=> import("../pages/registration/GetTournamentApplication"))

export const applicationRoutes: RouteObject[] = [
    {
        path: "application",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <TournamentApplications/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]