import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import { useGetPointTableQuery } from "../../features/pointTable/pointTableApi";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import PageHeader from "../../component/ui/PageHeader";
import { useState } from "react";
import { useTournamentPicker } from "../../hooks/useTournamentPicker";
import PickerModal from "../../component/ui/modal/PickerModal";
import TournamentPickerTrigger from "../tournament/TournamentPickerTrigger";

const PointTable = () => {
   const {
      activeTournamentId,
      selected,
      tournaments,
      handleSelect,
      handleClear,
      latestTournamentId,
      latestTournamentName,
      isLoading:tLoading,
    } = useTournamentPicker();
  
    const [pickerOpen, setPickerOpen] = useState(false);

  // fetch point table data based on tournament id
  const { data: pointTable, isLoading } = useGetPointTableQuery(activeTournamentId ?? "", {
    skip: !activeTournamentId,

  })

  const loading = tLoading || isLoading;

  const headerData = [
    "Team",
    "Match",
    "Wins",
    "Losses",
    "Ties",
    "Point"
  ]

  let content = null;

  if (loading) {
    content = <>
      {
        [...Array(5)].map((__, index) => (
          <TableSkeleton key={index} columns={headerData.length} />
        ))
      }
    </>
  } else if (!loading && !pointTable?.data?.pointTable?.length) {
    content = (
      <TableEmpty colSpan={headerData.length} message="No Point found!" />
    )
  } else {
    content = (
      Array.isArray(pointTable?.data?.pointTable) &&
      (pointTable as any).data.pointTable.map((row: any) => (
        <TableRow
          key={row._id}
          rowData={[
            <div className="flex items-center gap-4">
              <img
                src={row.teamId?.teamLogo}
                alt={row.teamId?.teamName}
                loading="lazy"
                className="w-8 h-8 rounded-5 object-cover"
              />
              <span>{row.teamId?.teamName}</span>
            </div>,
            row.matchPlayed,
            row.wins,
            row.losses,
            row.ties,
            row.points,
          ]}
        />
      ))
    );
  }

  return (
    <PageLayout>
      <BackButton className="mb-5" onClick={useGoBack()}>Go Back</BackButton>
      <PageHeader
        topTitle="Point Table"
        title={latestTournamentName ?? "Tournament"}
        subtitle={`Count ${pointTable?.data.pointTable.length}`}
      />
      <div className="rounded-2xl border border-border overflow-hidden bg-surface">

        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          {loading ? (
            <div className="h-4 w-40 rounded bg-subSurface animate-pulse" />
          ) : (
            <div className="flex items-center gap-3">
              <img className="w-8 h-8 rounded-lg object-cover border border-border"
                src={pointTable?.data?.tournament?.photo} alt="" />
              <p className="text-sm font-medium text-font">
                {pointTable?.data?.tournament?.tournamentName}
              </p>
            </div>
          )}
          <PickerModal
          isOpen={pickerOpen}
          onOpenChange={setPickerOpen}
          title="Select Tournament"
          items={tournaments}
          selectedId={selected?._id ?? latestTournamentId}
          onSelect={(item) => { handleSelect(item); setPickerOpen(false); }}
        />
          <TournamentPickerTrigger
        selectedName={selected?.name}
        defaultName={latestTournamentName}
        showClear={!!selected}
        onOpen={() => setPickerOpen(true)}
        onClear={handleClear}
      />
          <span className="text-xs text-muted bg-subSurface border border-border px-3 py-1 rounded-full">
            Point Table
          </span>
        </div>

        <Table>
          <TableHeader headers={headerData} />
          {content}
        </Table>

      </div>
    </PageLayout>
  )
}

export default PointTable;