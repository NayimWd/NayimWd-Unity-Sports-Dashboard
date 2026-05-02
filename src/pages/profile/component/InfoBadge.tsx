const InfoBadge = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <span className="flex items-center gap-1.5 text-xs text-subtext bg-subSurface px-2.5 py-1 rounded-full">
    {icon}
    {label}
  </span>
);

export default InfoBadge;