import { Trophy } from "lucide-react";
import InfoBadge from "./InfoBadge";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";
import { useGetManagerProfileQuery } from "../../../features/profile/profileSlice";
import ProfileSkeleton from "./ProfileSkeleton";
import EmptyProfile from "./EmptyProfile";


const ManagerProfile = () => {
    const { data, isLoading, isError } = useGetManagerProfileQuery(undefined);

    // loading state
    if (isLoading) {
        return <ProfileSkeleton />;
    }

    // error or no data
    if (isError || !data) {
        return <EmptyProfile role="manager" />;
    }

    const user = data.userId;
    const teams = data.teamsManaged ?? [];

    return (
        <ProfileCard text="Account" editTo="/dashboard/myAccount">
            {/* Header */}
            <div className="flex items-center gap-4">
                <ProfileAvatar
                    photo={user?.photo}
                    name={user?.name || "Unknown"}
                />

                <div className="space-y-1.5">
                    <h2 className="text-base font-medium text-font">
                        {user?.name || "Unknown User"}
                    </h2>

                    <InfoBadge
                        icon={<Trophy size={11} className="text-primary" />}
                        label={`${teams.length} Team${teams.length !== 1 ? "s" : ""} managed`}
                    />
                </div>
            </div>

            {/* Teams */}
            {teams.length > 0 ? (
                <div className="space-y-2">
                    <p className="text-xs my-2 font-medium text-muted uppercase tracking-widest">
                        Teams
                    </p>

                    {teams.map((t: any) => (
                        <Link key={t._id} to={`/dashboard/team/manage/${t._id}`}>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-subSurface hover:border-inputBorder transition-colors">
                                <img
                                    src={t.teamLogo || "/placeholder.png"}
                                    alt={t.teamName}
                                    className="w-8 h-8 rounded-lg object-cover border border-border"
                                />

                                <span className="text-sm font-medium text-font flex-1">
                                    {t.teamName}
                                </span>

                                <span className="text-xs text-muted">Manage →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted mt-4">
                    No teams managed yet.
                </p>
            )}
        </ProfileCard>
    )
};

export default ManagerProfile