import PageLayout from '../../../component/layout/PageLayout'
import BackButton from '../../../utils/BackButton'
import { useGoBack } from '../../../hooks/useGoBack';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const MaEmpty = () => {
    const goBack = useGoBack();
    return (
        <PageLayout>
            <BackButton onClick={goBack}>Back</BackButton>
            <div className="max-w-lg mx-auto mt-6 px-2 sm:px-0">
                <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                    <div className="h-1 w-full bg-gradient-primary" />
                    <div className="p-10 flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-subSurface flex items-center justify-center">
                            <FileText size={20} className="text-muted" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-font">No application found</p>
                            <p className="text-xs text-muted mt-1">
                                You haven't applied to any upcoming tournament yet.
                            </p>
                        </div>
                        <Link to="/dashboard/tournament">
                            <button className="flex items-center gap-1.5 text-xs font-medium
                                 text-primary hover:underline mt-1">
                                Browse Tournaments <ArrowRight size={12} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default MaEmpty