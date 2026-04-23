import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import { lazy } from "react";
const Teams = lazy(() => import("../pages/teams/Teams"));
const TeamDetails = lazy(() => import("../pages/teams/TeamDetails"));
const MyTeam = lazy(() => import("../pages/teams/MyTeam"));
const CreateTeam = lazy(() => import("../pages/teams/CreateTeam"));
const ManageTeam = lazy(()=> import("../pages/teams/ManageTeam"));
const Editteam = lazy(()=> import("../pages/teams/EditTeam"));
const RemovePlayer = lazy(()=> import("../pages/teams/RemovePlayer"));
const CangeTeamInfo = lazy(()=> import("../pages/teams/CangeTeamInfo"));
const UpdateTeamName = lazy(()=> import("../pages/teams/UpdateTeamName"));
const UpdateTeamLogo = lazy(()=> import("../pages/teams/UpdateTeamLogo"));


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
    {
        path: "team/manage/:teamId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <ManageTeam />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/edit/:teamId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Editteam/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/:teamId/removePlayer",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <RemovePlayer/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/:teamId/updateName",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTeamName/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/:teamId/updateLogo",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateTeamLogo/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "team/:teamId/changeInfo",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CangeTeamInfo/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },

]