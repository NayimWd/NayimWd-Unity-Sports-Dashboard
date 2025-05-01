import cn from "../../utils/cn";

interface TableRowProps {
    rawData: (string | number | React.ReactNode)[];
    className?: string;
}

const TableRow = ({rawData, className}: TableRowProps) => {
  return (
    <tbody>
    <tr className={cn(className, "px-4 py-2 border-b border-inputBorder text-font")}>
        {
            rawData.map((data, index)=>(
                <td
                    key={index}
                    className={"px-4 py-3 border-b border-inputBorder font-merriweather tracking-wider text-font font-semibold"}
                >
                    {data}
                </td>
            ))
        }
    </tr>
    </tbody>
  )
}

export default TableRow