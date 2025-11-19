const TeamDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-8 animate-pulse">
            <div className="h-40 w-full bg-muted rounded-lg" />

            <div className="flex gap-4 items-center">
                <div className="h-20 w-20 rounded-full bg-muted" />
                <div className="flex flex-col gap-3">
                    <div className="h-4 w-40 bg-muted rounded" />
                    <div className="h-3 w-28 bg-muted rounded" />
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="rounded-md bg-muted h-40" />
                ))}
            </div>
        </div>
    );
};

export default TeamDetailsSkeleton;