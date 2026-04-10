import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGetPointTableQuery } from "../../features/pointTable/pointTableApi";



const PointSummary = () => {
  // fetch latest tournament 
  const { data: latestTournament } = useLatestTournamentQuery();

  // fetch point table data based on tournament id
  const { data: pointTable, isLoading: loading } = useGetPointTableQuery(latestTournament?.data._id ?? "", {
    skip: !latestTournament?.data?._id, // skip query if tournament id is not available
    refetchOnMountOrArgChange: true, // refetch when component mounts or any arg change
  })


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
      <span className="text-xs text-muted bg-subSurface border border-border px-3 py-1 rounded-full">
        Point Table
      </span>
    </div>

    <Table>
      <TableHeader headers={headerData} />
      {content}
    </Table>

  </div>
  )
}

export default PointSummary