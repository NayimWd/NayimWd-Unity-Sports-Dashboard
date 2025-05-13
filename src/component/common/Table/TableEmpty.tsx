import { InboxIcon } from "lucide-react";
import cn from "../../../utils/cn";

interface EmptyTableProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  colSpan?: number;
}

const TableEmpty = ({ message = "No data found", icon, className, colSpan=3 }: EmptyTableProps) => {
  return (
    <tbody className="py-12">
    <tr>
      <td colSpan={colSpan} className={cn("py-10 text-center text-muted", className)}>
        <div className="flex flex-col items-center justify-center">
          {icon ?? <InboxIcon className="text-font" size={52} />}
          <p className="mt-3 text-sm font-inter">{message}</p>
        </div>
      </td>
    </tr>
    </tbody>
  )
}

export default TableEmpty