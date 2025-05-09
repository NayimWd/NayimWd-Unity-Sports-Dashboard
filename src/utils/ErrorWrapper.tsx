import { ReactNode } from "react";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import ErrorComp from "../component/common/error/ErrorComp";

interface Props {
  children: ReactNode;
  CustomErrorFallback?: (props: FallbackProps) => ReactNode;
}

const ErrorBoundaryWrapper = ({children, CustomErrorFallback}: Props) => {
  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) =>
        CustomErrorFallback ? (
          CustomErrorFallback(fallbackProps)
        ) : (
          <ErrorComp error={fallbackProps.error} />
        )
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrapper;