import Skeleton from "./Skeleton";

const RegisterSkeleton = () => {
    return (
        <div className="w-full min-h-screen py-5 paddingX flex items-center justify-center">
            <div className="formContainer bg-surface p-6 sm:p-8 md:p-10 rounded-2xl shadow-md w-full max-w-lg space-y-6 animate-in fade-in">

                <div className="text-center space-y-2">
                    <Skeleton className="h-8 sm:h-9 md:h-10 w-32 sm:w-40 md:w-48 mx-auto rounded" />
                    <Skeleton className="h-4 w-56 sm:w-64 md:w-72 mx-auto rounded" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>


                <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-20 w-full rounded-md" />
                </div>

                <Skeleton className="h-10 w-full rounded mt-3" />

                <div className="flex items-center justify-center space-x-2 pt-4">
                    <Skeleton className="h-4 w-48 sm:w-60 md:w-72 rounded" />
                </div>
            </div>
        </div>
    );
};

export default RegisterSkeleton;