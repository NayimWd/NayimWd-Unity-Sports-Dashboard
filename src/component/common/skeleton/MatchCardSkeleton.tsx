// ai gen skeleton code
const MatchCardSkeleton = () => {
  return (
    <div aria-busy="true" aria-live="polite" className="relative overflow-hidden rounded-lg max-w-md border border-border bg-gradient-to-br from-subSurface to-surface p-5 animate-pulse">

      {/* Top row */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-4 w-16 rounded-full bg-muted" />
      </div>

      {/* Content */}
      <div className="mt-10 flex flex-col gap-5">

        {/* Teams */}
        <div className="flex justify-center items-center gap-3">
          {/* Team A */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>

          <div className="h-3 w-6 rounded bg-muted" />

          {/* Team B */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="w-9 h-9 rounded-full bg-muted" />
          </div>
        </div>

        {/* Match info */}
        <div className="rounded-lg bg-bg p-4 space-y-2">
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="h-3 w-60 rounded bg-muted" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-end">
        <div className="h-8 w-24 rounded bg-muted" />
      </div>
    </div>
  )
}

export default MatchCardSkeleton;