import cn from "../../../utils/cn";

interface CardProps {
  label: string;
  value: number;
}

const SummaryCard = ({ label, value }: CardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-surface",
        "p-6 flex flex-col justify-between",
        "overflow-hidden shadow-sm hover:shadow-lg",
        "transition-all duration-200 hover:-translate-y-[2px]",
        "border-border"
      )}
    >
      <div className="text-sm font-medium text-muted">{label}</div>
      <div className="mt-3 text-3xl tracking-tight font-semibold text-font">
        {value}
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default SummaryCard;