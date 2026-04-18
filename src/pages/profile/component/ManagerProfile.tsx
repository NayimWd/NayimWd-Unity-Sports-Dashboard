import { Trophy } from "lucide-react";
import InfoBadge from "./InfoBadge";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";


const ManagerProfile = ({ data }: { data: any }) => (
    <ProfileCard editTo="/dashboard/profile/edit">
        <div className="flex items-center gap-4">
            <ProfileAvatar photo={data.userId?.photo} name={data.userId?.name} />
            <div className="space-y-1.5">
                <h2 className="text-base font-medium text-font">{data.userId?.name}</h2>
                <InfoBadge
                    icon={<Trophy size={11} className="text-primary" />}
                    label={`${data.teamsManaged?.length ?? 0} Team managed`}
                />
            </div>
        </div>

        {data.teamsManaged?.length > 0 && (
            <div className="space-y-2">
                <p className="text-xs my-2 font-medium text-muted uppercase tracking-widest">
                    Teams
                </p>
                {data.teamsManaged.map((t: any) => (
                    <Link key={t._id} to={`/dashboard/team/myTeam`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-subSurface hover:border-inputBorder transition-colors">
                            <img
                                src={t.teamLogo}
                                alt={t.teamName}
                                className="w-8 h-8 rounded-lg object-cover border border-border"
                            />
                            <span className="text-sm font-medium text-font flex-1">{t.teamName}</span>
                            <span className="text-xs text-muted">Manage →</span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </ProfileCard>
);

export default ManagerProfile