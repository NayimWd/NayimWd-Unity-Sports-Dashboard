import cn from "../../utils/cn";

interface TableRowProps {
    rawData: (string | number | React.ReactNode)[];
    className?: string;
}

const TableRow = ({rawData, className}: TableRowProps) => {
  return (
    <tbody className=" even:bg-surface dark:even:bg-bg">
    <tr className={cn(className, `px-4 py-2  text-font `)}>
        {
            rawData.map((data, index)=>(
                <td
                    key={index}
                    className={` px-4 py-3 font-merriweather tracking-wider text-font font-semibold`}
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