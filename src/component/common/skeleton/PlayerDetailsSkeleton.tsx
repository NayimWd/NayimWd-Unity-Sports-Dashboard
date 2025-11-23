import Skeleton from "../loader/Skeleton"


const PlayerDetailsSkeleton = () => {
    return (
        <div className="animate-fadeIn">

            {/* HERO BANNER */}
            <div className="relative">
                <Skeleton className="w-full h-48 rounded-xl" />

                {/* FLOATING AVATAR */}
                <div className="absolute -bottom-10 left-6">
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
                </div>
            </div>

            {/* Badges */}
            <div className="mt-16 flex flex-wrap items-center gap-3">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
            </div>

            {/* BASIC INFO CARD */}
            <div className="mt-8 p-5 rounded-xl border border-border bg-card shadow-sm">
                <Skeleton className="h-6 w-40 mb-5 rounded-md" />

                <div className="grid grid-cols-2 gap-5">

                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <Skeleton className="h-3 w-20 rounded-md" />
                            <Skeleton className="h-4 w-28 rounded-md" />
                        </div>
                    ))}

                </div>
            </div>

            {/* TEAM INFO CARD */}
            <div className="mt-8 p-5 rounded-xl border border-border bg-card shadow-sm flex items-center gap-5">
                <Skeleton className="h-16 w-16 rounded-lg" />

                <div className="space-y-2">
                    <Skeleton className="h-3 w-12 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                </div>
            </div>
        </div>
    )
}

export default PlayerDetailsSkeleton