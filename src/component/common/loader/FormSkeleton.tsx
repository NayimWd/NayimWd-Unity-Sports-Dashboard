
const FormSkeleton = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="w-full max-w-md space-y-6 p-6 animate-pulse">
                <div className="h-7 w-40 bg-subSurface rounded" />
                <div className="space-y-4">
                    <div className="h-11 bg-subSurface rounded" />
                    <div className="h-11 bg-subSurface rounded" />
                    <div className="h-11 bg-subSurface rounded" />
                </div>
                <div className="h-11 w-full bg-primary/40 rounded" />
                <div className="flex justify-center">
                    <div className="h-4 w-28 bg-subSurface rounded" />
                </div>
            </div>
        </div>
    );
}

export default FormSkeleton