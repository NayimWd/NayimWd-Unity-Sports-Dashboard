import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import ProtectedRoute from "./ProtectedRoute";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import AccountSkeleton from "../pages/account/AccountSkeleton";
const Account = lazy(()=> import("../pages/account/Account"));
const EditAccount = lazy(()=> import("../pages/account/EditAccount"));

export const accountRoutes: RouteObject[] = [
    {
        path: "myAccount",
        element: (
            <ErrorBoundaryWrapper>
                <ProtectedRoute>
                    <SuspenseWrapper CustomLoader={<AccountSkeleton/>}>
                        <Account/>
                    </SuspenseWrapper>
                </ProtectedRoute>
            </ErrorBoundaryWrapper>
        ),
    },
    {
        path: "editAccount",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<AccountSkeleton/>}>
                    <EditAccount/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]