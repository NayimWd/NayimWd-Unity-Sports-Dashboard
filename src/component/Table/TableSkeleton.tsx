
interface SkeletonProps {
    columns: number;
    rows?: number;
}

const TableSkeleton = ({columns, rows}: SkeletonProps) => {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <td
              key={colIndex}
              className="px-4 py-3 border-b border-inputBorder"
            >
              <div className="h-4 bg-muted rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableSkeleton