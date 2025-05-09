import cn from "../../utils/cn";

interface TableHeaderProps {
    headers: string[];
    className?: string;
}

const TableHeader = ({headers, className}: TableHeaderProps) => {

  return (
    <thead className={cn("bg-gradient-primary ", className)}>
        <tr>
            {
                headers.map((header, index)=>(
                    <th key={index}
                      className={"px-4 py-2 text-left  text-font font-semibold border-b border-primary  font-inter"}
                    >
                        {header}
                    </th>
                ))
            }
        </tr>
    </thead>
  )
}

export default TableHeader