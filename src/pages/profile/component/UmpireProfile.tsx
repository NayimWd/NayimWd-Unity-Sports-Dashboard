import { Calendar } from "lucide-react";
import InfoBadge from "./InfoBadge";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCard from "./ProfileCard";

const UmpireProfile = ({ data }: { data: any }) => (
  <ProfileCard editTo="/dashboard/profile/edit">
    <div className="flex items-center gap-4">
      <ProfileAvatar photo={data.userId?.photo} name={data.userId?.name} />
      <div className="space-y-1.5">
        <h2 className="text-base font-medium text-font">{data.userId?.name}</h2>
        <InfoBadge
          icon={<Calendar size={11} className="text-primary" />}
          label={`${data.yearsOfExperience} yrs experience`}
        />
      </div>
    </div>
  </ProfileCard>
);

export default UmpireProfile;