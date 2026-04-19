import { Star, Users } from "lucide-react";
import InfoBadge from "./InfoBadge";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCard from "./ProfileCard";

const PlayerProfile = ({ data }: { data: any }) => (
    <ProfileCard editTo="/dashboard/profile/edit">
        <div className="flex items-center gap-4">
            <ProfileAvatar photo={data.userId?.photo} name={data.userId?.name} />
            <div className="space-y-1.5">
                <h2 className="text-base font-medium text-font">{data.userId?.name}</h2>
                <div className="flex flex-wrap gap-2">
                    <InfoBadge
                        icon={<Star size={11} className="text-primary" />}
                        label={data.player_role}
                    />
                    {data.teamId && (
                        <InfoBadge
                            icon={<Users size={11} className="text-primary" />}
                            label={data.teamId.teamName}
                        />
                    )}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
                { label: "Batting", value: data.batingStyle },
                { label: "Bowling Arm", value: data.bowlingArm },
                { label: "Bowling Style", value: data.bowlingStyle },
                {
                    label: "Date of Birth", value: data.DateOfBirth
                        ? new Date(data.DateOfBirth).toLocaleDateString()
                        : "N/A"
                },
            ].map(({ label, value }) => (
                <div key={label} className="bg-subSurface rounded-lg p-3">
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm font-medium text-font capitalize">{value}</p>
                </div>
            ))}
        </div>
    </ProfileCard>
);


export default PlayerProfile