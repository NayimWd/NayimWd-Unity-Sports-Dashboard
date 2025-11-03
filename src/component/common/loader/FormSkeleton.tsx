
const FormSkeleton = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="w-full max-w-5xl p-6 animate-pulse bg-surface rounded-lg">
                <div className="py-2 flex flex-col justify-center items-center">
                    <div className="h-10 w-52 bg-subSurface rounded mb-8 justify-center" />
                    <div className="space-y-4 w-full">
                        <div className="h-11 bg-subSurface rounded" />
                        <div className="h-11 bg-subSurface rounded" />
                        <div className="h-11 bg-subSurface rounded" />
                        <div className="w-full flex justify-between gap-5 items-center my-2">
                            <div className="h-11 w-full bg-subSurface rounded" />
                            <div className="h-11 w-full bg-subSurface rounded " />
                        </div>
                        <div className="h-52 bg-subSurface rounded" />

                    </div>

                    <div className="flex justify-center mt-5">
                        <div className="h-10 w-28 bg-subSurface rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormSkeleton