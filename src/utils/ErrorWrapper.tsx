import { Component, ReactElement } from "react";
import ErrorComp from "../component/common/error/ErrorComp";

interface ErrorBoundaryProps {
  children: ReactElement;
  CustomError?: ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryWrapper extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { CustomError } = this.props;

    if (hasError) {
      return CustomError ?? <ErrorComp error={error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;
