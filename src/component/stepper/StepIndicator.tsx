interface StepIndicatorProps {
  steps: string[];
  current: number;
}

const StepIndicator = ({ steps, current }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10 max-w-sm mx-auto">
      {steps.map((label, i) => {
        const n = i + 1;
        const done    = current > n;
        const active  = current === n;
        return (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                ${done   ? "bg-primary text-white"
                : active ? "bg-primary/10 text-primary border border-primary"
                :          "bg-subSurface text-muted border border-border"}`}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : n}
              </div>
              <span className={`text-[10px] whitespace-nowrap ${active ? "text-primary" : "text-muted"}`}>
                {label}
              </span>
            </div>
            {n < steps.length && (
              <div className={`h-px flex-1 mb-4 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;