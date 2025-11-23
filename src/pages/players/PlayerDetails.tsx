import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetPlayerDetailsQuery } from "../../features/player/playerApi";
import PlayerDetailsSkeleton from "../../component/common/skeleton/PlayerDetailsSkeleton";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import { fontStyle } from "../../utils/ClassUtils";
import Badge from "../../component/ui/Badge";
import Card from "../../component/common/card/Card";

const fallBackImg = "/lightImg.jpeg"


const PlayerDetails = () => {
  const { playerId } = useParams();
  const goBack = useGoBack();

  const { data, isLoading, isError } = useGetPlayerDetailsQuery(
    playerId as string
  );
  // destructuring data
  const playerProfile = data?.playerProfile;
  const playerDetails = data?.player.playerId;
  const teamDetails = data?.player.teamId;
  const status = data?.player.status;
  const isCaptain = data?.player.isCaptain;

  // show skeleton if loading
  if (isLoading) return <PlayerDetailsSkeleton />

  // handle error 
  if (isError || !playerDetails?._id) {
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <p className="text-center text-lg text-red-500 mt-10">
        Failed to load player details.
      </p>
    </PageLayout>
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      {/* Hero Banner */}
      <div className="relative mt-6 rounded-xl overflow-hidden shadow-md bg-card">
        <img
          src={teamDetails?.teamLogo}
          alt={teamDetails?.teamName}
          className="w-full h-56 object-cover opacity-85"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Avatar + Name */}
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <img
            src={playerDetails?.photo}
            onError={(e) => (e.currentTarget.src = fallBackImg)}
            alt={playerDetails?.name}
            className="h-28 w-28 rounded-full border-4 border-white shadow-xl object-cover"
          />

          <div>
            <h1 className={`${fontStyle.SectionHeading} text-white drop-shadow-lg`}>
              {playerDetails?.name}
            </h1>
            {playerProfile?.player_role && (
              <p className="text-white/90 text-sm">{playerProfile.player_role}</p>
            )}
          </div>
        </div>
      </div>

      {/* Chips Section */}
      <div className="mt-14 flex flex-wrap gap-3">
        {isCaptain && <Badge variant="success">Captain</Badge>}
        {status && <Badge variant="default">{status}</Badge>}
        {playerProfile?.player_role && (
          <Badge variant="warning">{playerProfile.player_role}</Badge>
        )}
      </div>

      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info Card */}
        <Card className="p-6 rounded-xl shadow-sm border border-border/50 bg-card/40 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-font mb-5">
            Basic Information
          </h2>

          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <Info label="Full Name" value={playerDetails?.name} />
            <Info label="Player Role" value={playerProfile?.player_role} />
            <Info label="Batting Style" value={playerProfile?.batingStyle} />
            <Info label="Bowling Arm" value={playerProfile?.bowlingArm} />
            <Info label="Bowling Style" value={playerProfile?.bowlingStyle} />
            <Info
              label="Date of Birth"
              value={
                playerProfile?.DateOfBirth
                  ? new Date(playerProfile.DateOfBirth).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>
        </Card>

        {/* Team Card (focus-block) */}
        <Card className="p-6 rounded-xl shadow-sm border border-border/50 bg-card/40 backdrop-blur-sm lg:col-span-2 flex items-center gap-4">
          <img
            src={teamDetails?.teamLogo}
            onError={(e) => (e.currentTarget.src = fallBackImg)}
            alt={teamDetails?.teamName}
            className="h-20 w-20 rounded-lg border bg-white object-cover"
          />

          <div>
            <p className="text-sm text-muted mb-1">Team</p>
            <p className="font-semibold text-xl">{teamDetails?.teamName}</p>
          </div>
        </Card>
      </section>
    </PageLayout>
  );
};

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-muted text-xs">{label}</p>
    <p className="font-medium text-sm">{value || "N/A"}</p>
  </div>
);

export default PlayerDetails;