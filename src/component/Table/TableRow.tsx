import cn from "../../utils/cn";

interface TableRowProps {
    rawData: (string | number | React.ReactNode)[];
    className?: string;
}

const TableRow = ({rawData, className}: TableRowProps) => {
  return (
    <tr className={cn(className, "px-4 py-2 border-b border-inputBorder text-font")}>
        {
            rawData.map((data, index)=>(
                <td
                    key={index}
                    className={"px-4 py-2 border-b border-inputBorder text-font"}
                >
                    {data}
                </td>
            ))
        }
    </tr>
  )
}

export default TableRow