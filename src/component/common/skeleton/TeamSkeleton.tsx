const TeamSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface w-full max-w-sm animate-pulse">

      {/* Image Skeleton */}
      <div className="h-40 w-full bg-subSurface rounded-none rounded-t-lg" />

      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 w-2/3 bg-subSurface rounded-md" />
        <div className="h-3 w-1/2 bg-subSurface rounded-md" />
      </div>
    </div>
  )
}

export default TeamSkeleton;