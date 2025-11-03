import Skeleton from "./Skeleton"

const LoginSkeleton = () => {
    return (
        <div className=" min-h-screen w-full flexCenter flex-col paddingX">
            <div className="formContainer bg-surface p-6 sm:p-8 md:p-10 rounded-xl shadow-md w-full max-w-md space-y-6 animate-in fade-in">

                <div className="text-center space-y-2">
                    <Skeleton className="h-8 sm:h-9 md:h-10 w-28 sm:w-36 md:w-44 mx-auto rounded" />
                    <Skeleton className="h-4 w-44 sm:w-56 md:w-64 mx-auto rounded" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <Skeleton className="h-10 w-32 rounded mt-4" />

                <div className="flex items-center justify-center space-x-2 pt-4">
                    <Skeleton className="h-4 w-40 sm:w-48 md:w-56 rounded" />
                </div>
            </div>
        </div>
    )
}

export default LoginSkeleton