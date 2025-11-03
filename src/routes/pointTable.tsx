import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const PointTable = lazy(() => import("../pages/pointTable/PointTable"));
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
import PageSkeleton from "../component/common/loader/PageSkeleton";


export const pointTableRoutes: RouteObject[] = [
        {
        path: "pointTable",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper CustomLoader={<PageSkeleton/>}>
              <PointTable />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
  
]