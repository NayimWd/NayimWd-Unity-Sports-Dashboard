import { Calendar } from "lucide-react";
import InfoBadge from "./InfoBadge";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCard from "./ProfileCard";
import { useGetUmpireProfileQuery } from "../../../features/profile/profileSlice";
import ProfileSkeleton from "./ProfileSkeleton";
import EmptyProfile from "./EmptyProfile";

const UmpireProfile = () => {

  const { data, isLoading, isError } = useGetUmpireProfileQuery(undefined);

  // loading state
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // error or no data
  if (isError || !data) {
    return <EmptyProfile role="umpire" />;
  }

  return (<ProfileCard editTo="/dashboard/profile/u/update">
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
  )
};

export default UmpireProfile;