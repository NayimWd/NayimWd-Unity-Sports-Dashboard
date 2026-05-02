import { ClipboardList } from "lucide-react";
import Card from "../../component/common/card/Card";
import cn from "../../utils/cn";

interface EmptyDataProps {
  title?: string;
  message?: string;
  className?: string;
}

const EmptyData = ({ 
  title = "No data Found", 
  message = "There are currently no data for this query.",
  className 
}: EmptyDataProps) => {
  return (
    <div className="w-full flex justify-center items-center">
    <Card 
      className={cn(
        "col-span-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-muted bg-transparent",
        className
      )}
    >
      <div className="w-16 h-16 bg-subtext/10 rounded-full flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-subtext opacity-50" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>
      
      <p className="text-sm text-subtext mt-2 max-w-[250px]">
        {message}
      </p>
    </Card>
    </div>
  );
};

export default EmptyData;