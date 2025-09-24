import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import ProtectedRoute from "./ProtectedRoute";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Account = lazy(()=> import("../pages/account/Account"));

export const accountRoutes: RouteObject[] = [
    {
        path: "myAccount",
        element: (
            <ErrorBoundaryWrapper>
                <ProtectedRoute>
                    <SuspenseWrapper>
                        <Account/>
                    </SuspenseWrapper>
                </ProtectedRoute>
            </ErrorBoundaryWrapper>
        ),
    }
]