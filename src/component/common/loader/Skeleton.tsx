import cn from "../../../utils/cn";


const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-muted dark:bg-muted",
      className
    )}
  />
);

export default Skeleton