import cn from "../../../utils/cn";

interface CardProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  iconBg?: string;
}

const SummaryCard = ({ label, value, icon, iconBg }: CardProps) => {
  return (
    <div className={cn(
      "group relative rounded-xl border border-border bg-surface",
      "p-5 flex flex-col justify-between overflow-hidden",
      "transition-all duration-200 hover:-translate-y-[2px] hover:border-inputBorder"
    )}>
      {icon && (
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", iconBg)}>
          {icon}
        </div>
      )}
      <p className="text-xs text-muted mb-1.5">{label}</p>
      <p className="text-[26px] font-medium leading-none text-font tracking-tight">{value}</p>
    </div>
  );
};

export default SummaryCard;