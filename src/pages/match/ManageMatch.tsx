import { Book, BookOpen, Edit2, Edit3 } from "lucide-react";
import Dropdown from "../../component/common/dropdown/Dropdown";
import Table from "../../component/common/Table/Table";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import PageLayout from "../../component/layout/PageLayout"
import { useGetMatchQuery } from "../../features/match/matchApi";
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { useTournamentPicker } from "../../hooks/useTournamentPicker";
import { useState } from "react";
import TournamentPickerTrigger from "../tournament/TournamentPickerTrigger";
import PickerModal from "../../component/ui/modal/PickerModal";
import PageHeader from "../../component/ui/PageHeader";

const ManageMatch = () => {
  const goBack = useGoBack();

  // get letest tournament id based on point table and selector
  const [pickerOpen, setPickerOpen] = useState(false);

  // get  tournament id
  const {
    activeTournamentId,
    selected,
    tournaments,
    handleSelect,
    handleClear,
    latestTournamentId,
    latestTournamentName,
    activeTournamentStatus
  } = useTournamentPicker();

  const tournamentId = activeTournamentId;
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
              {(() => {
                const isOngoing = activeTournamentStatus === "ongoing";
                const isUpcoming = activeTournamentStatus === "upcoming";
                const isCompleted = activeTournamentStatus === "completed";
                const isScheduled = match.status === "scheduled" || match.status === "rescheduled" || match.status === "upcoming";
                const isInProgress = match.status === "in-progress";
                const isMatchCompleted = match.status === "completed";
                // 1. full edit — upcoming or ongoing + scheduled/rescheduled
                if ((isUpcoming || isOngoing) && isScheduled) {
                  return (
                    <Dropdown>
                      <Dropdown.Trigger className="bg-primary text-white">
                        <Edit2 size="14" /> Edit
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="-ml-40 -mt-20">
                        <Dropdown.Item href={`/dashboard/match/${match._id}`}>
                          <Book size={14} /> Match Details
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateTeam/${match.tournamentId}/${match._id}`}>
                          <Edit3 size={14} /> Edit Team
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateUmpire/${match.tournamentId}/${match._id}`}>
                          <Edit3 size={14} /> Edit Umpire
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/reschedule/${match._id}`}>
                          <Edit3 size={14} /> Reschedule
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateResult/${match._id}`}>
                          <Edit3 size={14} /> Create Result
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateResult/${match._id}`}>
                          <Edit3 size={14} /> Update Result
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }

                // 2. result only — ongoing + in-progress
                if (isOngoing && isInProgress) {
                  return (
                    <Dropdown>
                      <Dropdown.Trigger className="bg-primary text-white">
                        <Edit2 size="14" /> Edit
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="-ml-40 -mt-8">
                        <Dropdown.Item href={`/dashboard/match/${match._id}`}>
                          <Book size={14} /> Match Details
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateResult/${match._id}`}>
                          <Edit3 size={14} /> Update Result
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }

                // 3. result + read — ongoing + match completed
                if (isOngoing && isMatchCompleted) {
                  return (
                    <Dropdown>
                      <Dropdown.Trigger className="bg-primary text-white">
                        <Edit2 size="14" /> Edit
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="-ml-40 -mt-8">
                        <Dropdown.Item href={`/dashboard/match/${match._id}`}>
                          <Book size={14} /> Match Details
                        </Dropdown.Item>
                        <Dropdown.Item href={`/dashboard/match/updateResult/${match._id}`}>
                          <Edit3 size={14} /> Update Result
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }

                // 4. read only — tournament completed
                if (isCompleted) {
                  return (
                    <Dropdown>
                      <Dropdown.Trigger className="bg-primary text-white">
                        <Book size="14" /> Read
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="-ml-40 -mt-8">
                        <Dropdown.Item href={`/dashboard/match/${match._id}`}>
                          <BookOpen size={14} /> Match Details
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }

                return null;
              })()}
            </div>
          ]}
        />
      ))
    )
  }



  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="manage matches"
        title="Match List"
        subtitle="select tournament to manage"
      />
      <div className="rounded-2xl border border-border overflow-hidden bg-surface">
        {/* Tournament picker */}
        <div className="flex items-center justify-between px-5 py-4 border border-border">
          <div className="text-lg text-subtext">Pick Tournament:</div>
          <TournamentPickerTrigger
            selectedName={selected?.name}
            defaultName={latestTournamentName}
            showClear={!!selected}
            onOpen={() => setPickerOpen(true)}
            onClear={handleClear}
          />

          <PickerModal
            isOpen={pickerOpen}
            onOpenChange={setPickerOpen}
            title="Select Tournament"
            items={tournaments}
            selectedId={selected?._id ?? latestTournamentId}
            onSelect={(item) => { handleSelect(item); setPickerOpen(false); }}
          />


        </div>
        <Table>
          <TableHeader headers={headerData} />
          {
            content
          }
        </Table>
      </div>
    </PageLayout>
  )
}

export default ManageMatch;