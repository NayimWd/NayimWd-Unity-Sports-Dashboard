import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Schedule = lazy(()=> import("../pages/schedule/Schedule"));

export const ScheduleRoute: RouteObject[] = [
    {
        path: "schedule",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Schedule/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    }
]