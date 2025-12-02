import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";

const TournamentApplications = lazy(()=> import("../pages/registration/GetTournamentApplication"));
const ApplicationDetails = lazy(()=> import("../pages/registration/ApplicationDetails"))

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
    },
    {
        path: "application/details/:id",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <ApplicationDetails/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]