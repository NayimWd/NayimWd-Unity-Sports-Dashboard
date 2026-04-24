import { Link } from "react-router-dom";
import { useUpcomingTournamentQuery } from "../../features/tournament/tournamentApi"
import { Trophy, Calendar, ArrowRight, AlertCircle, Ticket } from "lucide-react";
import { fontStyle } from "../../utils/ClassUtils";
import { parseDate } from "../../utils/timeFormat";


const RegBanner = () => {
  const { data, isLoading, isError } = useUpcomingTournamentQuery(undefined);
  const tournaments = data?.data ?? [];
  const today = new Date();
  const validTournaments = tournaments.filter((t: any) => {
    const deadline = parseDate(t.registrationDeadline);
    const start    = parseDate(t.startDate);
    if (!deadline || !start) return false;
    if (deadline < today)    return false;
    if (start < today)       return false;
    return true;
  });

  if (isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array(1).fill(null).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border overflow-hidden animate-pulse">
          <div className="h-1 bg-subSurface" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-20 rounded-full bg-subSurface" />
            <div className="h-4 w-40 rounded bg-subSurface" />
            <div className="space-y-1.5">
              <div className="h-3 w-28 rounded bg-subSurface" />
              <div className="h-3 w-24 rounded bg-subSurface" />
            </div>
            <div className="h-8 w-full rounded-lg bg-subSurface" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isError) return (
    <div className="max-w-sm rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="h-1 bg-toastErrorBg" />
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-toastErrorBg flex items-center justify-center flex-shrink-0">
          <AlertCircle size={14} className="text-toastErrorText" />
        </div>
        <p className="text-xs text-font">Failed to load registrations</p>
      </div>
    </div>
  );

  if (!validTournaments.length) return null;

  return (
    <section className="mb-1">
      <p className={`${fontStyle.SectionHeading} text-subtext mb-2`}>Open Registrations</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {validTournaments.map((t: any) => {
          const deadline    = parseDate(t.registrationDeadline);
          const daysLeft    = deadline
            ? Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            : null;
          const isUrgent    = daysLeft !== null && daysLeft <= 3;

          return (
            <div
              key={t._id}
              className="rounded-2xl border border-border bg-bg overflow-hidden
                         flex flex-col hover:border-inputBorder transition-colors"
            >
              {/* accent */}
              <div className="h-1 w-full bg-gradient-primary" />

              <div className="p-4 flex flex-col gap-3 flex-1">

                {/* top badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-widest
                                   text-primary bg-blue-500/10 px-2.5 py-1 rounded-full">
                    Registration Open
                  </span>
                  {daysLeft !== null && (
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full
                      ${isUrgent
                        ? "bg-toastErrorBg text-toastErrorText"
                        : "bg-subSurface text-muted"
                      }`}>
                      {daysLeft}d left
                    </span>
                  )}
                </div>

                {/* name */}
                <p className="text-sm font-medium text-font leading-snug">
                  {t.tournamentName}
                </p>

                {/* meta */}
                <div className="space-y-1.5 flex-1">
                  <span className="flex items-center gap-1.5 text-xs text-subtext">
                    <Calendar size={11} className="text-muted flex-shrink-0" />
                    Deadline: {t.registrationDeadline}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-subtext">
                    <Ticket size={11} className="text-muted flex-shrink-0" />
                    Entry: ৳{t.entryFee.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-subtext">
                    <Trophy size={11} className="text-yellow-500 flex-shrink-0" />
                    Prize: ৳{Number(t.champion).toLocaleString()}
                  </span>
                </div>

                {/* CTA */}
                <Link to={`/dashboard/tournament/details/${t._id}`}>
                  <button className="w-full flex items-center justify-center gap-1.5
                                     px-4 py-2 rounded-lg text-xs font-medium mt-1
                                     bg-primary text-white hover:bg-primaryHover
                                     transition-colors">
                    View Details <ArrowRight size={12} />
                  </button>
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default RegBanner;