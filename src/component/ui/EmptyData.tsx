import { InboxIcon } from "lucide-react";
import cn from "../../utils/cn";

interface EmptyDataProps {
    message?: string;
    icon?: React.ReactNode;
    className?: string;
}

const EmptyData = ({ message = "No data found", icon, className }: EmptyDataProps) => {
    return (
        <div className={cn("py-10 text-center text-muted flex flex-col items-center justify-center", className)}>
            {icon ?? <InboxIcon className="text-font" size={52} />}
            <p className="mt-3 text-sm font-inter">{message}</p>
        </div>
    )
}

export default EmptyData