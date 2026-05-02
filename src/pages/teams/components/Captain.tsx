import { Crown } from "lucide-react"

function Captain({ captain }: { captain: any }) {
    return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Crown size={13} className="text-yellow-500" />
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Captain
                </p>
            </div>
            <div className="p-4 flex items-center gap-3">
                <img
                    src={captain.photo}
                    alt={captain.name}
                    className="w-10 h-10 rounded-lg object-cover border border-border"
                    loading="lazy"
                />
                <div>
                    <p className="text-sm font-medium text-font">{captain.name}</p>
                    <p className="text-xs text-muted capitalize">{captain.role}</p>
                </div>
                <span className="ml-auto text-[10px] font-medium bg-yellow-50 dark:bg-yellow-900/20
                                   text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-full
                                   border border-yellow-200 dark:border-yellow-800/40">
                    Captain
                </span>
            </div>
        </div>
    )
}

export default Captain