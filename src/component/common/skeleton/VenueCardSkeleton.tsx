const VenueCardSkeleton = () => (
  <div className="animate-pulse bg-card rounded-xl overflow-hidden shadow-md">
    <div className="h-40 bg-muted"></div>
    <div className="flex justify-between items-center">

   
    <div className="p-4 space-y-3">
      <div className="h-4 w-2/3 bg-muted rounded"></div>
      <div className="h-3 w-1/2 bg-muted rounded"></div>
    </div>
        <div className="bg-muted w-16 h-10 rounded"></div>
     </div>
  </div>
);

export default VenueCardSkeleton;