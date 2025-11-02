import { ReactElement, Suspense } from "react";
// import Loader from "../component/common/loader/Loader";
import PageSkeleton from "../component/common/loader/PageSkeleton";


interface SuspenseWrapperProps {
  children: ReactElement;
  CustomLoader?: ReactElement;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  CustomLoader,
}) => {
  return <Suspense fallback={CustomLoader ?? <PageSkeleton/>}>{children}</Suspense>;
};

export default SuspenseWrapper;
