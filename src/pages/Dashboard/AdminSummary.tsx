import SummaryCard from "../../component/common/card/SummaryCard";
import { useGetSummaryQuery } from "../../features/dashboard/summaryApi";
import { Trophy, Users, User, Clock, Star, Building2 } from "lucide-react";

const statItems = [
    { key: "tournamentCount", label: "Tournaments", icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
    { key: "teamCount", label: "Teams", icon: Users, color: "text-green-600", bg: "bg-green-500/10" },
    { key: "playerCount", label: "Players", icon: User, color: "text-purple-600", bg: "bg-purple-500/10" },
    { key: "runningPlayerCount", label: "Active Players", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { key: "umpireCount", label: "Umpires", icon: Star, color: "text-red-500", bg: "bg-red-500/10" },
    { key: "venueCount", label: "Venues", icon: Building2, color: "text-teal-600", bg: "bg-teal-500/10" },
];


function AdminSummary() {

    const { data, isLoading } = useGetSummaryQuery();

    const summary = data?.data ?? null;

    return (
        <section className="mb-8">
      

            {/* Skeleton */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array(6).fill(null).map((_, i) => (
                        <div key={i} className="h-28 rounded-xl bg-subSurface animate-pulse" />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!isLoading && !summary && (
                <div className="border border-border rounded-xl p-8 text-center text-muted text-sm">
                    No summary data available.
                </div>
            )}

            {/* Grid */}
            {!isLoading && summary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {statItems.map(({ key, label, icon: Icon, color, bg }) => (
                        <SummaryCard
                            key={key}
                            label={label}
                            value={(summary as any)[key] ?? 0}
                            icon={<Icon className={`w-4 h-4 ${color}`} />}
                            iconBg={bg}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default AdminSummary