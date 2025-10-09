import cn from "../../../utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl" | "adaptive";
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
  adaptive:
    "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16",
};

const Loader = ({ size = "adaptive", fullScreen, className }: LoaderProps) => {
  const loader = (
    <div className={cn("relative inline-flex", className)}>
      {/* Background Circle */}
      <div className={cn("bg-surface rounded-full", sizeClasses[size])}></div>

      {/* Ping Animation */}
      <div
        className={cn(
          "absolute top-0 left-0 rounded-full bg-primary opacity-80 animate-ping",
          sizeClasses[size]
        )}
      ></div>

      {/* Pulse Animation */}
      <div
        className={cn(
          "absolute top-0 left-0 rounded-full bg-primary animate-pulse",
          sizeClasses[size]
        )}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-bg/60 backdrop-blur-sm z-[9999]">
        {loader}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      {loader}
    </div>
  );
};

export default Loader;