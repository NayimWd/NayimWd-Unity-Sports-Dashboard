import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
const Schedule = lazy(()=> import("../pages/schedule/Schedule"));
const CreateSchedule = lazy(()=> import("../pages/schedule/CreateScheduleR1"));
const CreateScheduleR2 = lazy(()=> import("../pages/schedule/CreateScheduleR2"));
const ScheduleSwith = lazy(()=> import("../pages/schedule/ScheduleSwith"));

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

    },
    {
        path: "schedule/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <ScheduleSwith/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "schedule/R1/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateSchedule/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "schedule/R2/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <CreateScheduleR2/>
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]