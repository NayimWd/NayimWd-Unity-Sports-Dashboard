import cn from "../../utils/cn"

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({children, className}: TableProps) => {
  return (
    <div className='bg-surface w-full overflow-x-auto'>
      <table className={cn("w-full text-sm border-collapse font-inter", className)}>
        {children}
      </table>
    </div>
  )
}

export default Table


