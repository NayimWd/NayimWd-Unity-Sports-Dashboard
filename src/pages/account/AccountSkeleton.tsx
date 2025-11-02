
const AccountSkeleton = () => {
    return (
        <section className="rounded-lg w-full p-5 space-y-6 bg-surface shadow-sm border border-border animate-pulse">
            {/* title */}
            <div className="h-6 w-40 bg-muted rounded-md" />

            <div className="flex flex-col items-center gap-6 mt-6">
                {/* phto skeleton */}
                <div className="h-40 w-40 rounded-full bg-muted" />

                {/* info */}
                <div className="flex flex-col items-center space-y-2 w-full">
                    <div className="h-4 w-48 bg-muted rounded-md" />
                    <div className="h-4 w-56 bg-muted rounded-md" />
                    <div className="h-4 w-40 bg-muted rounded-md" />
                    <div className="h-4 w-52 bg-muted rounded-md" />
                </div>
            </div>
        </section>
    )
}

export default AccountSkeleton;