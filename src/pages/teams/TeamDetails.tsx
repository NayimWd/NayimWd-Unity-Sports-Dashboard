import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import { useGetTeamDetailsQuery } from "../../features/team/teamApi";
import TeamDetailsSkeleton from "../../component/common/skeleton/TeamDetailsSkeleton";
import EmptyData from "../../component/ui/EmptyData";
import Card from "../../component/common/card/Card";
import PlayerCard from "../../component/common/card/PlayerCard";
import { fontStyle } from "../../utils/ClassUtils";
import BackButton from "../../utils/BackButton";

const TeamDetails = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: teamDetails, isLoading, isError } = useGetTeamDetailsQuery(teamId as string);

  if (isLoading) return <TeamDetailsSkeleton />;
  if (isError) return <EmptyData message="Something Went Wrong! No Team details Found" />;
  if (!teamDetails) return <EmptyData message="Team Details is empty" />;

  const { players, team } = teamDetails;
  const { teamName, teamLogo, managerId, playerCount } = team;



  return (
    <PageLayout>
      <BackButton link="/dashboard/team">Teams</BackButton>
      {/* Top Banner */}
      <div className="relative mt-5 rounded-lg overflow-hidden border border-border shadow-sm">
        <img
          src={teamLogo}
          alt={teamName}
          className="h-56 w-full object-cover bg-center opacity-80"
          loading="lazy"
        />
        <h1 className={`${fontStyle.SectionHeading} absolute bottom-4 left-6 text-font drop-shadow-lg`}>
          {teamName}
        </h1>
      </div>

      {/* Manager */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-font">Team Manager</h2>

        <Card variant="Base" className="flex items-center gap-5 p-4 rounded-md">
          <img
            src={managerId.photo}
            alt={managerId.name}
            className="h-20 w-20 object-cover rounded-full border"
          />

          <div>
            <h3 className="text-lg font-semibold">{managerId.name}</h3>
            <p className="text-sm text-muted">{managerId.email}</p>
          </div>
        </Card>
      </section>

      {/* Players */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-font">Players</h2>
          <span className="text-sm text-muted">{playerCount} players</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {players.map((player) => (
            <PlayerCard
              key={player._id}
              _id={player._id}
              name={player.name}
              photo={player.photo}
              role={player.role ?? ""}
              isCaptain={player.isCaptain}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default TeamDetails;
