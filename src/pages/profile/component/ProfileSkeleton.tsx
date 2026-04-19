const ProfileSkeleton = () => (
    <div className="max-w-2xl mx-auto rounded-2xl border border-border overflow-hidden animate-pulse">
        <div className="h-1 bg-subSurface" />
        <div className="p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-subSurface flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-36 rounded bg-subSurface" />
                <div className="h-3 w-24 rounded bg-subSurface" />
            </div>
        </div>
    </div>
);

export default ProfileSkeleton