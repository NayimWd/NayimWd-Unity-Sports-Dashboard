const PlayerSkeleton = () => {
  return (
    <div className="w-full max-w-xs rounded-2xl shadow-sm border border-border bg-surface animate-pulse p-4 flex flex-col items-center space-y-3">
  <div className="w-24 h-24 bg-subSurface rounded-full"></div>
  <div className="h-5 bg-muted rounded w-2/3"></div>
  <div className="h-4 bg-muted rounded w-1/2"></div>
</div>
  )
}

export default PlayerSkeleton