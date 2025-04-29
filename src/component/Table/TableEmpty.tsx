import { InboxIcon } from "lucide-react";

interface EmptyTableProps {
  message?: string;
  icon?: React.ReactNode;
}

const TableEmpty = ({ message = "No data found", icon }: EmptyTableProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-muted">
      {
        icon ?? <InboxIcon size={48} />
      }
      <p className="mt-3 text-sm font-inter">
        {message}
      </p>
    </div>
  )
}

export default TableEmpty