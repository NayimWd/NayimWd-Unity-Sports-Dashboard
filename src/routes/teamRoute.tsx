import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import { lazy } from "react";
const Teams = lazy(() => import("../pages/teams/Teams"));
const TeamDetails = lazy(() => import("../pages/teams/TeamDetails"));
const MyTeam = lazy(() => import("../pages/teams/MyTeam"));
const CreateTeam = lazy(() => import("../pages/teams/CreateTeam"));


export const teamRoutes: RouteObject[] = [
    {
        path: "team",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Teams />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "team/details/:teamId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <TeamDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "team/myTeam",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <MyTeam />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateTeam />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]