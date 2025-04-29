
interface SkeletonProps {
  columns: number;

}

const TableSkeleton = ({ columns }: SkeletonProps) => {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <div className="h-4 bg-muted animate-pulse rounded" />
        </td>
      ))}
    </tr>
  )
}

export default TableSkeleton