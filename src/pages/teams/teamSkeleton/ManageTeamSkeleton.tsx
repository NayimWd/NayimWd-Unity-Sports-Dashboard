
const ManageTeamSkeleton = () => (
  <div className="max-w-3xl mx-auto mt-6 space-y-4 px-2 sm:px-0 animate-pulse">
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="h-1 bg-subSurface" />
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-subSurface flex-shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-subSurface" />
            <div className="h-3 w-24 rounded bg-subSurface" />
          </div>
        </div>
        <div className="h-8 w-24 rounded-lg bg-subSurface" />
      </div>
    </div>
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="h-10 bg-subSurface" />
      {Array(5).fill(null).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-5 py-3 border-t border-border">
          <div className="w-8 h-8 rounded-lg bg-subSurface flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-28 rounded bg-subSurface" />
            <div className="h-2.5 w-16 rounded bg-subSurface" />
          </div>
          <div className="h-5 w-12 rounded-full bg-subSurface" />
        </div>
      ))}
    </div>
  </div>
);

export default ManageTeamSkeleton;