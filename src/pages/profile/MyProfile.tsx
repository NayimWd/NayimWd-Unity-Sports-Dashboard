import SectionLayout from "../../component/layout/SectionLayout";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGetManagerProfileQuery, useGetPlayerProfileQuery, useGetUmpireProfileQuery } from "../../features/profile/profileSlice";
import { useCurrentUserQuery } from "../../features/auth/authApi";

const MyProfile = () => {

  const { data: user, isLoading: userLoading } = useCurrentUserQuery();

  // picking the user role
  const isManager = user?.role === "manager";
  const isPlayer = user?.role === "player";
  const isUmpire = user?.role === "umpire";

  // based on user role fetching data
  const { data: manager } = useGetManagerProfileQuery(undefined, { skip: !isManager });
  const { data: player } = useGetPlayerProfileQuery(undefined, { skip: !isPlayer });
  const { data: umpire } = useGetUmpireProfileQuery(undefined, { skip: !isUmpire });

  // role based profile
  const profile = manager || player || umpire;


  return (
    <PageLayout>
      <BackButton link="/dashboard">Go Home</BackButton>
      <SectionLayout>
        Profile
      </SectionLayout>
    </PageLayout>
  )
}

export default MyProfile;