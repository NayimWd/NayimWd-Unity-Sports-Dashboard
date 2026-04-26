import { Trophy, Calendar, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack"
import { useMyApplicationQuery, useReApplyMutation, useWithdrawMutation } from "../../features/registration/registrationApi";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import { usePriorityTournament } from "../tournament/LatestTournament";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../utils/toastUtils";
import ConfirmModal from "../../component/ui/modal/ConfirmModal";
import { statusConfig } from "./utils/statusConfig";
import MALoading from "./utils/MALoading";
import MAError from "./utils/MAError";
import MaEmpty from "./utils/MaEmpty";



const MyApplication = () => {
  const goBack = useGoBack();

  const { tournament, isLoading: tLoading } = usePriorityTournament();
  const tournamentId = tournament?.data?._id;

  const {
    data: appData,
    isLoading: aLoading,
    isError,
  } = useMyApplicationQuery(
    { tournamentId },
    { skip: !tournamentId }
  );

  const [withdraw, { isLoading: withdrawing }] = useWithdrawMutation();
  const [reApply, { isLoading: reApplying }] = useReApplyMutation();
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  const isLoading = tLoading || aLoading;
  const application = appData?.data;

  // ── loading ──
  if (isLoading) return (
    <MALoading />
  );

  // ── error ──
  if (isError) return (
    <MAError />
  );

  // ── no application ──
  if (!application) return (
    <MaEmpty />
  );

  const config = statusConfig[application.status as keyof typeof statusConfig];
  const Icon = config.icon;
  const appliedDate = new Date(application.applicationDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Registration"
        title="My Application"
        subtitle="Track your tournament application status"
      />

      <div className="max-w-lg mx-auto mt-6 space-y-4 px-2 sm:px-0">

        {/* Status card */}
        <div className={`rounded-2xl border overflow-hidden ${config.border} ${config.bg}`}>
          <div className="p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                             flex-shrink-0 border ${config.bg} ${config.border}`}>
              <Icon size={18} className={config.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium uppercase tracking-widest ${config.color}`}>
                  {config.label}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
              </div>
              <p className="text-sm text-font">{config.desc}</p>
            </div>
          </div>
        </div>

        {/* Application details */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="h-1 w-full bg-gradient-primary" />
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <FileText size={13} className="text-muted" />
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Application Details
            </p>
          </div>
          <div className="p-5 space-y-4">

            {/* Meta rows */}
            {[
              {
                icon: Calendar,
                label: "Applied On",
                value: appliedDate,
              },
              {
                icon: Trophy,
                label: "Tournament",
                value: tournament?.data?.tournamentName ?? "—",
              },
            ].map(({ icon: RowIcon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-subSurface flex items-center
                                justify-center flex-shrink-0">
                  <RowIcon size={13} className="text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-medium text-font truncate">{value}</p>
                </div>
              </div>
            ))}

            {/* Application ID */}
            <div className="pt-3 border-t border-border">
              <p className="text-[10px] text-muted uppercase tracking-wider mb-1">
                Application ID
              </p>
              <p className="text-xs font-mono text-subtext bg-subSurface px-3 py-2
                             rounded-lg border border-border truncate">
                {application._id}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/tournament/details/${application.tournamentId}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 py-2.5
                       rounded-xl text-xs font-medium border border-border
                       text-subtext hover:bg-subSurface transition-colors">
              View Tournament <ArrowRight size={12} />
            </button>
          </Link>

          {application.status === "withdrawn" ? (
            <button
              onClick={() => reApply({ tournamentId: application.tournamentId, teamId: application.teamId }).unwrap()
                .then(() => SuccessToast({ msg: "Re-applied successfully!" }))
                .catch(() => ErrorToast({ msg: "Re-apply failed." }))
              }
              disabled={reApplying}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                 rounded-xl text-xs font-medium bg-primary text-white
                 hover:bg-primaryHover transition-colors disabled:opacity-50"
            >
              {reApplying ? "Applying..." : <><ArrowRight size={12} /> Re-Apply</>}
            </button>
          ) : (
            <button
              onClick={() => setConfirmWithdraw(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                 rounded-xl text-xs font-medium border border-toastErrorText/30
                 text-toastErrorText hover:bg-toastErrorBg transition-colors"
            >
              Withdraw
            </button>
          )}
        </div>

      </div>
      <ConfirmModal
        isOpen={confirmWithdraw}
        onOpenChange={setConfirmWithdraw}
        title="Withdraw Application"
        description={`Withdraw your application from this tournament?`}
        onConfirm={() =>
          withdraw({ tournamentId: application.tournamentId, teamId: application.teamId }).unwrap()
            .then(() => { SuccessToast({ msg: "Application withdrawn." }); setConfirmWithdraw(false); })
            .catch(() => ErrorToast({ msg: "Withdraw failed." }))
        }
        loading={withdrawing}
      />
    </PageLayout>
  );
};

export default MyApplication;