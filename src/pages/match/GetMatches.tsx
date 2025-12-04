import PageLayout from "../../component/layout/PageLayout"
import { useGetMatchQuery } from "../../features/match/matchApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";

const GetMatches = () => {
  const goBack = useGoBack();

// get letest tournament id based on point table
 const {data} = useLatestTournamentQuery();

 const tournamentId = data?.data._id;

 // fetch match
 const {data: matches} =  useGetMatchQuery({tournamentId}, {skip: !tournamentId});

console.log(matches)

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
    </PageLayout>
  )
}

export default GetMatches