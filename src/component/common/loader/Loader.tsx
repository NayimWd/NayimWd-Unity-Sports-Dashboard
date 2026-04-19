import cn from "../../../utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  overlay?: boolean; // replaces fullScreen
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
};

const Loader = ({ size = "md", overlay = false, className }: LoaderProps) => {
  const loader = (
    <div className={cn("relative inline-flex", className)}>
      {/* Background */}
      <div className={cn("bg-surface rounded-full", sizeClasses[size])} />

      {/* Ping */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-primary opacity-80 animate-ping",
          sizeClasses[size]
        )}
      />

      {/* Pulse */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-primary animate-pulse",
          sizeClasses[size]
        )}
      />
    </div>
  );

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center z-[9999]",
        overlay && "bg-bg/70 backdrop-blur-sm"
      )}
    >
      {loader}
    </div>
  );
};

export default Loader;