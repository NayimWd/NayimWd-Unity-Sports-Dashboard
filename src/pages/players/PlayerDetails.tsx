import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetPlayerDetailsQuery } from "../../features/player/playerApi";
import PlayerDetailsSkeleton from "../../component/common/skeleton/PlayerDetailsSkeleton";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import SectionLayout from "../../component/layout/SectionLayout";
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
      {/* hero section  */}
      <SectionLayout className="mt-6 relative">
        <img
          src={teamDetails?.teamLogo}
          alt={`image ${teamDetails?.teamName}`}
          className="w-full h-48 object-cover bg-center rounded-xl opacity-90"
          loading="lazy"
          role="img"
        />
        <div className="absolute inset-0 bg-black/40 rounded-xl">
          {/* player profile */}
          <div className="absolute -bottom-10 left-6 flex items-center gap-4">
            <img
              src={playerDetails?.photo}
              alt={`photo ${playerDetails?.name}`}
              onError={(e) => (e.currentTarget.src = fallBackImg)}
              loading="lazy"
              role="img"
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl"
            />

            {/* name, role */}
            <h1 className={`${fontStyle.SectionHeading} font-bold text-white drop-shadow-lg`}>{playerDetails?.name}</h1>
            <p className="text-white ">{playerDetails?.role}</p>
          </div>
        </div>
      </SectionLayout>
      <div className="mt-16 flex flex-wrap items-center gap-3">
        {
          isCaptain && <Badge variant="success">Captain</Badge>
        }
        {
          status && <Badge variant="success">{status}</Badge>
        }
        {
          playerProfile?.player_role && <Badge variant="success">{playerProfile.player_role}</Badge>
        }
      </div>

      <div className="flex flex-wrap gap-10">
        {/* Player info card */}
        <Card className="mt-8 p-5 rounded-xl shadow-md drop-shadow-md">
          <h2 className="text-xl text-font font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-muted">Full Name</p>
              <p className="font-medium">{playerDetails?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Player Role</p>
              <p className="font-medium">{playerProfile?.player_role}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Batting Style</p>
              <p className="font-medium">{playerProfile?.batingStyle}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Bowling Arm</p>
              <p className="font-medium">{playerProfile?.bowlingArm}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Bowling Style</p>
              <p className="font-medium">{playerProfile?.bowlingStyle}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Date of Birth</p>
              <p className="font-medium">
                {playerProfile?.DateOfBirth
                  ? new Date(playerProfile.DateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>
        {/* team info card */}
        <Card className="mt-8 p-5 rounded-xl flex items-center gap-5 shadow-md">
          <img
            src={teamDetails?.teamLogo}
            alt={teamDetails?.teamName}
            loading="lazy"
            className="h-16 w-16 rounded-lg border object-cover bg-white"
            onError={(e) => (e.currentTarget.src = fallBackImg)}
          />

          <div>
            <p className="text-sm text-muted">Team</p>
            <p className="font-semibold text-lg">{teamDetails?.teamName}</p>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
};

export default PlayerDetails;