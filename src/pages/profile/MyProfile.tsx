import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGetManagerProfileQuery, useGetPlayerProfileQuery, useGetUmpireProfileQuery } from "../../features/profile/profileSlice";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import ProfileSkeleton from "./component/ProfileSkeleton";
import ManagerProfile from "./component/ManagerProfile";
import EmptyProfile from "./component/EmptyProfile";
import PlayerProfile from "./component/PlayerProfile";
import UmpireProfile from "./component/UmpireProfile";

const MyProfile = () => {
  const { data: user, isLoading: userLoading } = useCurrentUserQuery();

  const isManager = user?.role === "manager";
  const isPlayer = user?.role === "player";
  const isUmpire = user?.role === "umpire";

  const { data: manager, isLoading: mLoading } = useGetManagerProfileQuery(
    undefined, { skip: !isManager }
  );
  const { data: player, isLoading: pLoading } = useGetPlayerProfileQuery(
    undefined, { skip: !isPlayer }
  );
  const { data: umpire, isLoading: uLoading } = useGetUmpireProfileQuery(
    undefined, { skip: !isUmpire }
  );

  const isLoading = userLoading || mLoading || pLoading || uLoading;

  return (
    <PageLayout>
      <BackButton link="/dashboard">Go Home</BackButton>

      <div className="max-w-2xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

        {/* Header */}
        <div>
          <h1 className="text-xl font-medium text-font">My Profile</h1>
          <p className="text-sm text-muted mt-0.5">
            Your {user?.role} profile overview.
          </p>
        </div>

        {/* Loading */}
        {isLoading && <ProfileSkeleton />}

        {/* Manager */}
        {!isLoading && isManager && (
          manager
            ? <ManagerProfile data={manager} />
            : <EmptyProfile role="manager" />
        )}

        {/* Player */}
        {!isLoading && isPlayer && (
          player
            ? <PlayerProfile data={player} />
            : <EmptyProfile role="player" />
        )}

        {/* Umpire */}
        {!isLoading && isUmpire && (
          umpire
            ? <UmpireProfile data={umpire} />
            : <EmptyProfile role="umpire" />
        )}

      </div>
    </PageLayout>
  )
}

export default MyProfile;