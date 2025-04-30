import cn from "../../utils/cn"

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({children, className}: TableProps) => {
  return (
    <div className='bg-subSurface dark:bg-surface w-full py-10 paddingTable overflow-x-auto rounded-xl'>
      <table className={cn("w-full py-10 text-sm border-collapse font-inter", className)}>
        {children}
      </table>
    </div>
  )
}

export default Table


