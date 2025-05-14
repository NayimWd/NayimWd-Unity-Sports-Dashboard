const MatchSkeleton = () => {
  return (
    <div className="w-full max-w-md rounded-2xl shadow-sm border border-border bg-surface animate-pulse p-4 space-y-4">
  <div className="flex justify-between items-center">
    <div className="w-24 h-6 bg-muted rounded"></div>
    <div className="w-16 h-6 bg-muted rounded"></div>
  </div>
  <div className="h-4 bg-muted rounded w-3/4"></div>
  <div className="h-4 bg-muted rounded w-2/3"></div>
  <div className="flex justify-between items-center pt-2">
    <div className="h-4 w-16 bg-muted rounded"></div>
    <div className="h-4 w-16 bg-muted rounded"></div>
  </div>
</div>
  )
}

export default MatchSkeleton;