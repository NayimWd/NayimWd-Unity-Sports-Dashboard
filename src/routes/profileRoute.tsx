import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Profile = lazy((()=> import("../pages/profile/MyProfile")))


export const profileRoutes: RouteObject[] = [
    {
        path: "profile",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Profile/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]