import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import TableRow from "../../component/common/Table/TableRow";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGetPointTableQuery } from "../../features/pointTable/pointTableApi";
import { fontStyle } from "../../utils/ClassUtils";


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
    <div>
    
        {loading ? <span className="bg-bg h-5 w-14" />
          :
          <div className={`${fontStyle.SectionHeading} flex items-center justify-center gap-4 flex-wrap`}>
            <p className="text-font text-xl text-center">
              {pointTable?.data?.tournament?.tournamentName} </p>
            <img className="size-12 rounded " src={pointTable?.data?.tournament?.photo} alt="tournamentLogo" loading="lazy" />
          </div>
        }
        <Table className="">
          <TableHeader
            headers={headerData}
          />
          {
            content
          }
        </Table>
   
    </div>
  )
}

export default PointSummary