const DashboardSkeleton = () => {
  return (
    <div>
    <div className="h-16 w-full rounded bg-subSurface flex justify-between items-center py-2 px-5" > 
        <div className="h-11 w-48 bg-bg rounded-md"></div>
        <div className="bg-bg rounded-full h-12 w-12"></div>
    </div>
    <div className="flex min-h-screen w-full bg-bg animate-pulse">
      
      {/* sidebar */}
      <div className="hidden md:flex flex-col w-64 p-4 space-y-4 bg-subSurface">
        <div className="h-8 w-full rounded bg-surface" />
        <div className="h-8 w-full rounded bg-surface" />
        <div className="h-8 w-full rounded bg-surface" />
        <div className="h-8 w-full rounded bg-surface" />
        <div className="h-8 w-full rounded bg-surface" />
    
      </div>

      {/* content area*/}
      <div className="flex-1 p-6 w-full space-y-6">
        
    <div className="flex gap-5">
        <div className="h-16 w-full rounded bg-subSurface" />
        <div className="h-16 w-full rounded bg-subSurface" />
        <div className="h-16 w-full rounded bg-subSurface" />
</div>
        {/* content grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-44 bg-surface rounded" />
          <div className="h-44 bg-surface rounded" />
          <div className="h-44 bg-surface rounded" />
          <div className="h-44 bg-surface rounded" />
          <div className="h-44 bg-surface rounded" />
        </div>
        <div className="h-28 w-full rounded bg-subSurface" />
      </div>
    </div>
    </div>
  );
};

export default DashboardSkeleton;