import PageLayout from '../../../component/layout/PageLayout'
import BackButton from '../../../utils/BackButton'
import { useGoBack } from '../../../hooks/useGoBack'
import { AlertCircle } from 'lucide-react'

const MAError = () => {
    const goBack = useGoBack();
    return (
        <PageLayout>
            <BackButton onClick={goBack}>Back</BackButton>
            <div className="max-w-lg mx-auto mt-6 px-2 sm:px-0">
                <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                    <div className="h-1 bg-toastErrorBg" />
                    <div className="p-8 flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-toastErrorBg flex items-center justify-center">
                            <AlertCircle size={16} className="text-toastErrorText" />
                        </div>
                        <p className="text-sm font-medium text-font">Failed to load application</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default MAError