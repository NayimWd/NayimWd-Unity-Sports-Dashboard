import PageLayout from '../../../component/layout/PageLayout'
import BackButton from '../../../utils/BackButton'

function MALoading() {
    return (
        <PageLayout>
            <BackButton>Back</BackButton>
            <div className="max-w-lg mx-auto mt-6 space-y-4 px-2 sm:px-0 animate-pulse">
                <div className="h-6 w-40 rounded bg-subSurface" />
                <div className="rounded-2xl border border-border overflow-hidden">
                    <div className="h-1 bg-subSurface" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 w-32 rounded bg-subSurface" />
                        <div className="h-3 w-48 rounded bg-subSurface" />
                        <div className="h-3 w-36 rounded bg-subSurface" />
                    </div>
                </div>
                <div className="rounded-2xl border border-border overflow-hidden">
                    <div className="h-1 bg-subSurface" />
                    <div className="p-5 space-y-3">
                        <div className="h-10 w-full rounded-xl bg-subSurface" />
                        <div className="h-3 w-32 rounded bg-subSurface" />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default MALoading