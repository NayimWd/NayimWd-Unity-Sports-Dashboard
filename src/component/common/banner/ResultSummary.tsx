import { Award, Calendar, Medal, Trophy } from "lucide-react";



interface SummaryProps {
    result: any
    tournament: any
}


const ResultSummary = ({ result, tournament }: SummaryProps) => {

    if (!result || !tournament) return null;

    return (
         <div className="rounded-2xl border border-border overflow-hidden bg-surface">

      {/* Hero banner */}
      <div className="relative h-32 bg-[#0a1628] flex items-center px-6 gap-4 overflow-hidden">
        {/* Subtle bg image */}
        <img
          src={tournament.photo}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="relative">
          <h2 className="text-base font-medium text-white">{tournament.name}</h2>
          <p className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
            <Calendar className="w-3 h-3" />
            Concluded {tournament.endDate}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-bg grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left — Rankings */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted mb-3">Results</p>
          <div className="space-y-2">

            {/* Champion */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/40">
              <div className="relative flex-shrink-0">
                <img src={result.result.champion.teamLogo} alt={result.result.champion.teamName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-300" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-surface flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-yellow-500" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-yellow-700 dark:text-yellow-400 mb-0.5">Champion</p>
                <p className="text-sm font-medium text-font truncate">{result.result.champion.teamName}</p>
              </div>
              <span className="text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-2.5 py-1 rounded-full">1st</span>
            </div>

            {/* Runner-up */}
            <RankRow
              logo={result.result.runnerUp.teamLogo}
              name={result.result.runnerUp.teamName}
              label="Runner-up"
              rank="2nd"
              borderColor="#c0c0c0"
              icon={<Medal className="w-3 h-3 text-white" />}
              iconBg="#c0c0c0"
            />

            {/* Third */}
            <RankRow
              logo={result.result.thirdPlace.teamLogo}
              name={result.result.thirdPlace.teamName}
              label="Third Place"
              rank="3rd"
              borderColor="#cd7f32"
              icon={<Medal className="w-3 h-3 text-white" />}
              iconBg="#cd7f32"
            />
          </div>
        </div>

        {/* Right — MVP */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted mb-3">Tournament MVP</p>
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <img src={result.manOfTheTournament.photo} alt={result.manOfTheTournament.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-border" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 border-2 border-surface flex items-center justify-center">
                  <Award className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[10px] font-medium text-muted mb-0.5">{result.awardFor}</p>
                <p className="text-base font-medium text-font">{result.manOfTheTournament.name}</p>
                <p className="text-xs text-subtext mt-1.5 leading-relaxed">
                  Outstanding performance with exceptional skills throughout the tournament.
                </p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
              {[
                { label: "Matches", value: "12" },
                { label: "Teams",   value: "8"  },
                { label: "Duration",value: "2w" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-[11px] text-muted mb-1">{label}</p>
                  <p className="text-base font-medium text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ── internal sub-component ── */
const RankRow = ({ logo, name, label, rank, borderColor, icon, iconBg }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface hover:border-inputBorder transition-colors">
    <div className="relative flex-shrink-0">
      <img src={logo} alt={name} className="w-9 h-9 rounded-full object-cover border-2"
        style={{ borderColor }} />
      <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center"
        style={{ background: iconBg, width: 18, height: 18 }}>
        {icon}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-muted mb-0.5">{label}</p>
      <p className="text-sm font-medium text-font truncate">{name}</p>
    </div>
    <span className="text-[10px] font-medium bg-subSurface text-subtext px-2.5 py-1 rounded-full">{rank}</span>
  </div>
);


export default ResultSummary;
