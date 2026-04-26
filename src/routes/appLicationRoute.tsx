import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";

const GetTournamentApplication = lazy(()=> import("../pages/registration/GetTournamentApplication"));
const ApplicationDetails = lazy(()=> import("../pages/registration/ApplicationDetails"));
const TournamentApplication = lazy(()=> import("../pages/registration/TournamentApplication"));
const MyApplication = lazy(()=> import("../pages/registration/MyApplication"));


export const applicationRoutes: RouteObject[] = [
    {
        path: "application",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <GetTournamentApplication/>
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
    },
    {
        path: "application/apply/:tournamentId",
        element: (
         <ErrorBoundaryWrapper>
            <SuspenseWrapper>
                <TournamentApplication/>
            </SuspenseWrapper>
         </ErrorBoundaryWrapper>
        )
    },
    {
        path: "application/my_application",
        element: (
         <ErrorBoundaryWrapper>
            <SuspenseWrapper>
                <MyApplication/>
            </SuspenseWrapper>
         </ErrorBoundaryWrapper>
        )
    },
]