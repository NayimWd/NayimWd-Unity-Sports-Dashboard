import { Book, Edit2, Edit3 } from "lucide-react";
import Dropdown from "../../component/common/dropdown/Dropdown";
import Table from "../../component/common/Table/Table";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useGetMatchQuery } from "../../features/match/matchApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils";

const ManageMatch = () => {
  const goBack = useGoBack();

  // get letest tournament id based on point table
  const { data } = useLatestTournamentQuery();

  const tournamentId = data?.data._id;
  // fetch match
  const { data: matches, isLoading, isError } = useGetMatchQuery({ tournamentId }, { skip: !tournamentId });

  // header data
  const headerData = ["Match Number", "Status", "Team A", "Team B", "Action"];

  // content
  let content = null;

  if (isLoading) {
    content = ([...Array(5)].map((_, index) => (
      <TableSkeleton key={index} columns={headerData.length} />
    )))
  } else if (isError || matches?.match.length === 0) {
    content = <TableEmpty message="No Match Found!" />
  } else {
    content = (
      matches?.match.map((match) => (
        <TableRow
          key={match._id}
          rowData={[
            match.matchNumber,
            match.status,
            match?.teamA ? <div className="flex items-center gap-2"> <img className="w-9 h-9 rounded-full bg-center object-contain" src={match.teamA.teamLogo} alt="Team A" loading="lazy" aria-label="teamAlogo" /> {match.teamA.teamName} </div> : "TBD",
            match?.teamB ? <div className="flex items-center gap-2"> <img className="w-9 h-9 rounded-full bg-center object-contain" src={match.teamB.teamLogo} alt="Team A" loading="lazy" aria-label="teamBlogo" /> {match.teamB.teamName} </div> : "TBD",
            <div>
              <Dropdown className="">
                <Dropdown.Trigger className="bg-primary text-white">
                  <Edit2 size="14" /> Edit
                </Dropdown.Trigger>
                <Dropdown.Menu className="-ml-40 -mt-20">
                  <Dropdown.Item href={`/dashboard/match/${match._id}`}>
                    <Book size={14} /> Read Details
                  </Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/match/updateTeam/${match._id}`}>
                    <Edit3 size={14} /> Edit Team
                  </Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/match/updateUmpire/${match._id}`}>
                    <Edit3 size={14} /> Edit Umpire
                  </Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/match/updateResult/${match._id}`}>
                    <Edit3 size={14} /> Update Result
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ]}
        />
      ))
    )
  }


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`text-font text-center my-5 ${fontStyle.pageTitle}`}>Match List</h1>
      <SectionLayout>
        <Table>
          <TableHeader headers={headerData} />
          {
            content
          }
        </Table>
      </SectionLayout>
    </PageLayout>
  )
}

export default ManageMatch;