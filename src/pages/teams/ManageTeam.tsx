import {  useParams } from "react-router-dom"
import PageLayout from "../../component/layout/PageLayout"
import { useGetTeamDetailsQuery } from "../../features/team/teamApi";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import ManageTeamSkeleton from "./teamSkeleton/ManageTeamSkeleton";
import Hero from "./components/Hero";
import Players from "./components/Players";
import Captain from "./components/Captain";

const ManageTeam = () => {
  const { teamId } = useParams();

  const goBack = useGoBack();

  const { data: currentUser } = useCurrentUserQuery();
  const { data, isLoading,  } = useGetTeamDetailsQuery(teamId, { skip: !teamId });

  const isManager = currentUser?.role === "manager";
  const team = data?.team;
  const players = data?.players ?? [];
  const captain = players.find((p: any) => p.isCaptain);

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Go Back</BackButton>

      <div className="max-w-3xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

        {/* Loading */}
        {isLoading && (
          <ManageTeamSkeleton/>
        )}

        {!isLoading && team && (
          <>
            {/* Team hero */}
            <Hero
              team={team}
              isManager={isManager}
              teamId={teamId}
            />

            {/* Captain */}
            {captain && (
              <Captain
              captain={captain}
              />
            )}

            {/* Players */}
            <Players players={players}/>
          </>
        )}

      </div>
    </PageLayout>
  )
}

export default ManageTeam