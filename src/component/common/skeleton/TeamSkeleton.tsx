const TeamSkeleton = () => {
  return (
    <div className="w-full max-w-xs rounded-2xl shadow-sm border border-border bg-surface animate-pulse p-4 space-y-3 text-center">
  <div className="w-16 h-16 bg-subSurface rounded-full mx-auto"></div>
  <div className="h-5 bg-muted rounded w-3/4 mx-auto"></div>
  <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
</div>
  )
}

export default TeamSkeleton;