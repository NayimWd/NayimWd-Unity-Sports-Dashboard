import { useEffect, useState } from "react"
import Table from "../../component/Table/Table";
import TableHeader from "../../component/Table/TableHeader";
import TableRow from "../../component/Table/TableRow";
import TableSkeleton from "../../component/Table/TableSkeleton";
import TableEmpty from "../../component/Table/TableEmpty";
import TablePagination from "../../component/Table/TablePagination";


const PointTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      fetch(
        "https://nayimwd-unitysportsclubapi-production.up.railway.app/api/v1/pointTable/get/6790207c69aa7be5f9cf52e3"
      )
        .then((resp) => resp.json())
        .then((response) => {
          setData(response);
          setLoading(false); // Stop loading after data is fetched
        })
        .catch(() => setLoading(false)); // Stop loading if there's an error
    }, 3000);

    return () => {
      clearTimeout(timer); // Cleanup the timer
    };
  }, []);

  const headerData = [
    "Team",
    "Match",
    "Wins",
    "Losses",
    "Ties",
    "Point"
  ]

  let content = null;

  if (loading && data.length === 0) {
    content = <>
      {
        [...Array(5)].map((__, index) => (
          <TableSkeleton key={index} columns={headerData.length} />
        ))
      }
    </>
  } if (!loading && data.length === 0) {
    content = (
      <TableEmpty colSpan={headerData.length} message="No data found"/>
    )
  } else {
    content = (
      Array.isArray((data as any).data?.pointTable) &&
      (data as any).data.pointTable.map((row: any) => (
        <TableRow
          key={row._id}
          rawData={[
            row.teamId?.teamName,
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
      <h1 className="text-font text-3xl text-center space-y-2"> {(data as any).data?.tournament} </h1>
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