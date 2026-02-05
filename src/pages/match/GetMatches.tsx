import MatchCard from "../../component/common/card/MatchCard";
import MatchCardSkeleton from "../../component/common/skeleton/MatchCardSkeleton";
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useGetMatchQuery } from "../../features/match/matchApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";

const GetMatches = () => {
  const goBack = useGoBack();

  // get letest tournament id based on point table
  const { data } = useLatestTournamentQuery();

  const tournamentId = data?.data._id;
  // fetch match
  const { data: matches, isLoading, isFetching } = useGetMatchQuery({ tournamentId }, { skip: !tournamentId });

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <MatchCardSkeleton key={idx} />
        ))}
      </div>
    )
  };

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`text-font text-center mt-5 ${fontStyle.pageTitle}`}>Tournament Matches</h1>
      <SectionLayout className="bg-transparent">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {
            matches?.match.map((match) => (
              <MatchCard
                key={match._id}
                match={match}
              />
            ))
          }
        </div>
      </SectionLayout>
    </PageLayout>
  )
}

export default GetMatches