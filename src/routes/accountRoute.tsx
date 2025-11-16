import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import ProtectedRoute from "./ProtectedRoute";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import AccountSkeleton from "../pages/account/AccountSkeleton";
import FormSkeleton from "../component/common/loader/FormSkeleton";
const Account = lazy(() => import("../pages/account/Account"));
const EditAccount = lazy(() => import("../pages/account/EditAccount"));
const EditPhoto = lazy(() => import("../pages/account/EditPhoto"));
const EditDetails = lazy(() => import("../pages/account/EditDetails"));
const ChangePassword = lazy(() => import("../pages/account/ChangePassword"));
const AllUsers = lazy(()=> import("../pages/account/AllUsers"));

export const accountRoutes: RouteObject[] = [
    {
        path: "myAccount",
        element: (
            <ErrorBoundaryWrapper>
                <ProtectedRoute>
                    <SuspenseWrapper CustomLoader={<AccountSkeleton />}>
                        <Account />
                    </SuspenseWrapper>
                </ProtectedRoute>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "users",
        element: (
            <ErrorBoundaryWrapper>
                <ProtectedRoute>
                    <SuspenseWrapper>
                        <AllUsers />
                    </SuspenseWrapper>
                </ProtectedRoute>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "editAccount",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<AccountSkeleton />}>
                    <EditAccount />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>

        ),
    },
    {
        path: "editAccount/photo",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<FormSkeleton />}>
                    <EditPhoto />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "editAccount/details",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<FormSkeleton />}>
                    <EditDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "editAccount/changePassword",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<FormSkeleton />}>
                    <ChangePassword />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]