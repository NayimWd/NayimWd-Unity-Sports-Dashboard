import cn from "../../../utils/cn"

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({children, className}: TableProps) => {
  return (
    <div className={cn(className, ' w-full py-10 overflow-x-auto rounded-md')}>
      <table className="w-full py-10 text-sm md:text-base border-collapse font-inter">
        {children}
      </table>
    </div>
  )
}

export default Table


