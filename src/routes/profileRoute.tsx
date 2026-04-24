import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Profile = lazy((() => import("../pages/profile/MyProfile")));
const CreatePlayerProfile = lazy(() => import("../pages/profile/CreatePlayerProfile"));
const EditPlayerProfile = lazy(() => import("../pages/profile/EditPlayerProfile"));
const CreateUmpireProfile = lazy(() => import("../pages/profile/CreateUmpireProfile"));
const UpdateUmpireProfile = lazy(() => import("../pages/profile/UpdateUmpireProfile"));

export const profileRoutes: RouteObject[] = [
    {
        path: "profile",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Profile />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "profile/p/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreatePlayerProfile />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "profile/p/update/:playerId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <EditPlayerProfile />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "profile/u/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateUmpireProfile />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "profile/u/update",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <UpdateUmpireProfile />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]