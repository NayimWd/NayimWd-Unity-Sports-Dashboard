import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TablePagination from "../../component/common/Table/TablePagination";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGetPointTableQuery } from "../../features/pointTable/pointTableApi";

const PointTable = () => {
  // fetch latest tournament 
  const { data: latestTournament } = useLatestTournamentQuery();

  // fetch point table data based on tournament id
  const { data: pointTable, isLoading: loading } = useGetPointTableQuery(latestTournament?.data._id ?? "", {
    skip: !latestTournament?.data?._id, // Skip the query if tournament id is not available
    refetchOnMountOrArgChange: true, // Refetch when the component mounts or the arg change
  })

console.log(pointTable?.data)

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
      <TableEmpty colSpan={headerData.length} message="No data found" />
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
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{row.teamId?.teamName}</span>
        </div>,,
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
    <div className="w-full bg-subSurface dark:bg-surface paddingTable my-10  overflow-x-auto py-10 rounded">
      <h1 className="text-font text-3xl text-center space-y-2">
        {pointTable?.data?.tournament || "Loading"} </h1>
        {/* <img src={pointTable?.data?.tournament}/> */}
      <p className="text-xl text-font "> Point Table </p>

      <Table>
        <TableHeader
          headers={headerData}
        />
        {
          content
        }
      </Table>
      <TablePagination
        currentPage={1}
        totalPage={10}
        pageSize={5}
        onPageChange={(page) => console.log("Page changed to:", page)}
        onPageSizeChange={(size) => console.log("Page size changed to:", size)}
      />
    </div>
  )
}

export default PointTable