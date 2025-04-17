import { ReactElement, Suspense } from "react";
import Loader from "../component/common/loader/Loader";

interface SuspenseWrapperProps {
  children: ReactElement;
  CustomLoader?: ReactElement;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  CustomLoader,
}) => {
  return <Suspense fallback={CustomLoader ?? <Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
