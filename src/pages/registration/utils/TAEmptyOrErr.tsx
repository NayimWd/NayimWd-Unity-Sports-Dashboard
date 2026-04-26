import { AlertCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const TAEmptyOrErr = () => {
    return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 bg-toastErrorBg" />
            <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-toastErrorBg flex items-center justify-center">
                    <AlertCircle size={16} className="text-toastErrorText" />
                </div>
                <div>
                    <p className="text-sm font-medium text-font">No team found</p>
                    <p className="text-xs text-muted mt-1">
                        You need a team to apply for a tournament.
                    </p>
                </div>
                <Link to="/dashboard/myTeam">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-primary
                                       hover:underline mt-1">
                        Go to My Team <ArrowRight size={12} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default TAEmptyOrErr