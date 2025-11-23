const VenueDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero img */}
      <div className="h-52 sm:h-64 bg-muted/30 rounded-xl mt-6"></div>

      {/* Badges */}
      <div className="mt-10 flex gap-3">
        <div className="h-6 w-24 bg-muted/30 rounded" />
        <div className="h-6 w-20 bg-muted/30 rounded" />
      </div>

      {/* Info card */}
      <div className="mt-8 p-6 rounded-xl bg-muted/20 space-y-4">
        <div className="h-5 w-48 bg-muted/30 rounded" />
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div className="h-4 w-32 bg-muted/30 rounded" />
          <div className="h-4 w-28 bg-muted/30 rounded" />
          <div className="sm:col-span-2 h-4 w-52 bg-muted/30 rounded" />
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsSkeleton;