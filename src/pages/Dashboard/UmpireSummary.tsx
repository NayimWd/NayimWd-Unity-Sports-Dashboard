import { Shield, Star, AlertCircle, ArrowRight } from "lucide-react";
import { useUmpireSummaryQuery } from "../../features/dashboard/summaryApi";
import { Link } from "react-router-dom";

const UmpireSummary = () => {
    const { data, isLoading, isError } = useUmpireSummaryQuery(undefined);
    const summary = data?.data;

    // loading
    if (isLoading) return (
        <div className="rounded-2xl border border-border overflow-hidden animate-pulse">
            <div className="h-1 bg-subSurface" />
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                        <div className="h-4 w-32 rounded bg-subSurface" />
                        <div className="h-3 w-20 rounded bg-subSurface" />
                    </div>
                    <div className="h-8 w-24 rounded-lg bg-subSurface" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array(4).fill(null).map((_, i) => (
                        <div key={i} className="h-20 rounded-xl bg-bg" />
                    ))}
                </div>
            </div>
        </div>
    );

    // error
    if (isError) return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 w-full bg-toastErrorBg" />
            <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-toastErrorBg flex items-center justify-center">
                    <AlertCircle size={16} className="text-toastErrorText" />
                </div>
                <p className="text-sm font-medium text-font">Failed to load umpire summary</p>
            </div>
        </div>
    );

    if (!summary) return null;

    const statCards = [
        { label: "Matches Directed", value: summary.totalMatchesDirected, icon: Shield, color: "text-primary", bg: "bg-blue-500/10" },
        { label: "First Umpire", value: summary.totalFirstUmpire, icon: Star, color: "text-yellow-600", bg: "bg-yellow-500/10" },
        { label: "Second Umpire", value: summary.totalSecondUmpire, icon: Star, color: "text-subtext", bg: "bg-subSurface" },
        { label: "Third Umpire", value: summary.totalThirdUmpire, icon: Star, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-5 space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-font">Umpire Overview</p>
                        <p className="flex items-center gap-1.5 text-xs text-muted mt-0.5">
                            <Star size={10} className="text-yellow-500" />
                            {summary.yearsOfExperience} years of experience
                        </p>
                    </div>
                    <Link to="/dashboard/myAccount">
                    <span className="text-xs font-medium bg-blue-500/10 text-primary
                           px-3 py-1.5 rounded-lg border border-blue-500/20">
                        Account <ArrowRight size={16} className="text-primary ml-2"/>
                    </span>
                    </Link>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {statCards.map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className="bg-subSurface dark:bg-bg rounded-xl p-3.5 space-y-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}>
                                <Icon size={13} className={color} />
                            </div>
                            <p className="text-xl font-medium text-font leading-none">{value}</p>
                            <p className="text-[11px] text-muted">{label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default UmpireSummary;