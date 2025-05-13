import cn from "../../../utils/cn";

interface TableRowProps {
    rowData: (string | number | React.ReactNode)[];
    className?: string;
}

const TableRow = ({rowData, className}: TableRowProps) => {
  return (
    <tbody className=" even:bg-surface odd:bg-border dark:even:bg-bg dark:odd:bg-subSurface">
    <tr className={cn(className, `px-4 py-2  text-font`)}>
        {
            rowData.map((data, index)=>(
                <td
                    key={index}
                    className={` px-4 py-3 font-merriweather tracking-wider text-font font-semibold rounded-sm`}
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