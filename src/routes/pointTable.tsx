import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const PointTable = lazy(() => import("../pages/pointTable/PointTable"));
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";


export const pointTableRoutes: RouteObject[] = [
        {
        path: "pointTable",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <PointTable />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
  
]