import { RouteObject } from "react-router-dom";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import { lazy } from "react";
import VenueDetailsSkeleton from "../component/common/skeleton/VenuedetailsSkeleton";
import FormSkeleton from "../component/common/loader/FormSkeleton";
const Venue = lazy(() => import("../pages/venue/Venues"));
const VenueDetails = lazy(() => import("../pages/venue/VenueDetails"));
const ManageVenue = lazy(() => import("../pages/venue/ManageVenue"));
const CreateVenue = lazy(() => import("../pages/venue/Createvenue"));
const UpdateVenue = lazy(() => import("../pages/venue/UpdateVenue"));


export const venueRoutes: RouteObject[] = [
    {
        path: "venue",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <Venue />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "venue/:venueId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <VenueDetails />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "venue/manage",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper>
                    <ManageVenue />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "venue/create",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<FormSkeleton/>}>
                    <CreateVenue />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
    {
        path: "venue/edit/:venueId",
        element: (
            <ErrorBoundaryWrapper>
                <SuspenseWrapper CustomLoader={<VenueDetailsSkeleton/>}>
                    <UpdateVenue />
                </SuspenseWrapper>
            </ErrorBoundaryWrapper>
        )
    },
]