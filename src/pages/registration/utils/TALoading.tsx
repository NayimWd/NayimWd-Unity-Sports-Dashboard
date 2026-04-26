

function TALoading() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="rounded-2xl border border-border overflow-hidden">
                <div className="h-1 bg-subSurface" />
                <div className="p-5 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-subSurface flex-shrink-0" />
                    <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-subSurface" />
                        <div className="h-3 w-20 rounded bg-subSurface" />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
                <div className="h-1 bg-subSurface" />
                <div className="p-5 space-y-3">
                    <div className="h-3 w-24 rounded bg-subSurface" />
                    {Array(2).fill(null).map((_, i) => (
                        <div key={i} className="h-12 rounded-xl bg-subSurface" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TALoading