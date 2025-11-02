

const PageSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6 px-4">
            <div className="h-8 w-48 rounded bg-subSurface" />

            <div className="grid gap-4 md:grid-cols-2">
                <div className="h-32 rounded bg-subSurface" />
                <div className="h-32 rounded bg-subSurface" />
            </div>

            <div className="h-24 rounded bg-subSurface" />
            <div className="h-64 rounded bg-subSurface" />
        </div>
    );
}

export default PageSkeleton