import { useState } from "react";
import { useGoBack } from "../../hooks/useGoBack";
import { useTournamentPicker } from "../../hooks/useTournamentPicker";
import { useGetSchedultQuery } from "../../features/schedule/scheduleApi";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import Dropdown from "../../component/common/dropdown/Dropdown";
import { Book, BookOpen, Edit, Edit2 } from "lucide-react";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import TournamentPickerTrigger from "../tournament/TournamentPickerTrigger";
import PickerModal from "../../component/ui/modal/PickerModal";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";

const ManageSchdeule = () => {
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
        isLoading: tLoading,
    } = useTournamentPicker();

    const { data, isLoading: sLoading, isError } = useGetSchedultQuery({ tournamentId: activeTournamentId },
        { skip: !activeTournamentId }
    );


    const isLoading = tLoading || sLoading;

    // header data
    const headerData = ["Match Number", "Status", "Team A", "Team B", "Action"];

    // content
    let content = null;

    if (isLoading) {
        content = ([...Array(5)].map((_, index) => (
            <TableSkeleton key={index} columns={headerData.length} />
        )))
    }
    else if (isError || data?.schedules?.length === 0) {
        content = <TableEmpty message="No Schedule Found!" />
    } else {
        content = (
            data?.schedules.map((schedule) => (

                <TableRow
                    key={schedule._id}
                    rowData={[
                        schedule.matchNumber,
                        schedule.status,
                        schedule?.teams?.teamA?.teamName
                        ?? schedule?.previousMatches?.matchA?.matchNumber
                        ?? "TBD",
                        schedule?.teams.teamB?.teamName
                        ?? schedule?.previousMatches?.matchB?.matchNumber
                        ?? "TBD",
                        <div>
                            {
                                (schedule.status === "scheduled") ?
                                    <Dropdown>
                                        <Dropdown.Trigger className="bg-primary text-white">
                                            <Edit2 size="14" /> Edit
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={`/dashboard/match/${schedule.matchId}`}>
                                                <BookOpen size="14" /> Read
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Edit size="14" /> Change Time
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Edit size="14" /> Change Team
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Edit size="14" /> Change Details
                                            </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    <Dropdown>
                                        <Dropdown.Trigger className="bg-primary text-white">
                                            <Book size="14" /> Read
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={`/dashboard/match/${schedule.matchId}`}>
                                                <BookOpen size="14" /> Read
                                            </Dropdown.Item>


                                        </Dropdown.Menu>
                                    </Dropdown>
                            }
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
                topTitle="manage schedule"
                title="Schedule List"
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

export default ManageSchdeule