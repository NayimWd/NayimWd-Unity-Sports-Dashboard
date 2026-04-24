import { Link } from "react-router-dom";
import { Trophy, Users, TrendingUp, Medal, ArrowRight, AlertCircle } from "lucide-react";
import { useGetMyTeamQuery, useTeamSummaryQuery } from "../../features/team/teamApi";
import cn from "../../utils/cn";


function ManagerSummary() {
    // get teamId first
    const { data: myTeam, isLoading: teamLoading, isError: teamError } = useGetMyTeamQuery({});
    const teamId = myTeam?._id;

    const {
        data,
        isLoading: summaryLoading,
        isError: summaryError,
    } = useTeamSummaryQuery(teamId, { skip: !teamId });

    const isLoading = teamLoading || summaryLoading;
    const isError = teamError || summaryError;

    // ── loading ──
    if (isLoading) return (
        <div className="rounded-2xl border border-border overflow-hidden animate-pulse">
            <div className="h-1 bg-subSurface" />
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-subSurface" />
                        <div className="space-y-1.5">
                            <div className="h-3.5 w-28 rounded bg-subSurface" />
                            <div className="h-3 w-20 rounded bg-subSurface" />
                        </div>
                    </div>
                    <div className="h-8 w-24 rounded-lg bg-subSurface" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array(4).fill(null).map((_, i) => (
                        <div key={i} className="h-20 rounded-xl bg-subSurface" />
                    ))}
                </div>
            </div>
        </div>
    );

    // ── no team ──
    if (teamError) return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-subSurface flex items-center justify-center">
                    <Users size={16} className="text-muted" />
                </div>
                <div>
                    <p className="text-sm font-medium text-font">No team yet</p>
                    <p className="text-xs text-muted mt-0.5">Create a team to see your stats here.</p>
                </div>
                <Link to="/dashboard/team/create">
                    <button className="text-xs font-medium text-primary hover:underline mt-1">
                        Create Team →
                    </button>
                </Link>
            </div>
        </div>
    );

    // ── summary error ──
    if (summaryError) return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 w-full bg-toastErrorBg" />
            <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-toastErrorBg flex items-center justify-center">
                    <AlertCircle size={16} className="text-toastErrorText" />
                </div>
                <p className="text-sm font-medium text-font">Failed to load team summary</p>
            </div>
        </div>
    );

    if (!data) return null;

    const { teamInfo, stats, tournamentStats } = data?.data;
  
    const statCards = [
        { label: "Matches", value: stats.totalMatches, icon: TrendingUp, color: "text-primary", bg: "bg-blue-500/10" },
        { label: "Wins", value: stats.wins, icon: Trophy, color: "text-green-600", bg: "bg-green-500/10" },
        { label: "Losses", value: stats.losses, icon: TrendingUp, color: "text-toastErrorText", bg: "bg-red-500/10" },
        { label: "Tournaments", value: stats.totalTournaments, icon: Medal, color: "text-yellow-600", bg: "bg-yellow-500/10" },
    ];

    const trophyCards = [
        { label: "Championships", value: tournamentStats.championships, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
        { label: "Runner-ups", value: tournamentStats.runnerUps, color: "text-slate-500", bg: "bg-surface" },
        { label: "Third Place", value: tournamentStats.thirdPlace, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    ];

    return (
        <div className="rounded-2xl border border-border bg-bg overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-5 space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={teamInfo.logo}
                            alt={teamInfo.name}
                            className="w-10 h-10 rounded-xl object-cover border border-border flex-shrink-0"
                            loading="lazy"
                        />
                        <div>
                            <p className="text-sm font-medium text-font">{teamInfo.name}</p>
                            <p className="flex items-center gap-1 text-xs text-muted">
                                <Users size={10} />
                                {teamInfo.totalPlayers} players
                            </p>
                        </div>
                    </div>
                    <Link to={`/dashboard/team/manage/${teamId}`}>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-primary
                               bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg
                               transition-colors">
                            Manage <ArrowRight size={12} />
                        </button>
                    </Link>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {statCards.map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className="bg-surface rounded-xl p-3.5 space-y-2">
                            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", bg)}>
                                <Icon size={13} className={color} />
                            </div>
                            <p className="text-xl font-medium text-font leading-none">{value}</p>
                            <p className="text-[11px] text-muted">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Tournament achievements */}
                <div className="border-t border-border pt-4">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-muted mb-3">
                        Tournament Achievements
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {trophyCards.map(({ label, value, color, bg }) => (
                            <div key={label} className={cn("rounded-xl p-3 text-center", bg)}>
                                <p className={cn("text-lg font-medium", color)}>{value}</p>
                                <p className="text-[11px] text-muted mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManagerSummary