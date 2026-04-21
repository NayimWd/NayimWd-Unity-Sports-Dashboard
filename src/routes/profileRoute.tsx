import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import AccountSkeleton from "../pages/account/AccountSkeleton";
const Profile = lazy((()=> import("../pages/profile/MyProfile")));
const CreatePlayerProfile = lazy(()=> import("../pages/profile/CreatePlayerProfile"));


export const profileRoutes: RouteObject[] = [
    {
        path: "profile",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<AccountSkeleton/>}>
                    <Profile/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "profile/p/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<AccountSkeleton/>}>
                    <CreatePlayerProfile/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]