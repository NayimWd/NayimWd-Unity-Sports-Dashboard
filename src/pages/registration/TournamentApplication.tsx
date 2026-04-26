import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Users, Shield, ArrowRight } from "lucide-react";
import { useGoBack } from "../../hooks/useGoBack";
import { useMyTeamSummaryQuery } from "../../features/team/teamApi";
import { useApplyForTournamentMutation, useMyApplicationQuery, } from "../../features/registration/registrationApi";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import ConfirmModal from "../../component/ui/modal/ConfirmModal";
import { statusConfig } from "./utils/statusConfig";
import TALoading from "./utils/TALoading";
import TAEmptyOrErr from "./utils/TAEmptyOrErr";

const MIN_PLAYERS = 14;


function TournamentApplication() {

    const { tournamentId } = useParams();
    const goBack = useGoBack();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data: myApplication, isLoading: appLoading } = useMyApplicationQuery({ tournamentId: tournamentId });
    const application = myApplication?.data;

    const navigate = useNavigate();

    const { data, isLoading: teamLoading, isError } = useMyTeamSummaryQuery(undefined);
    const [applyForTournament, { isLoading: applying }] = useApplyForTournamentMutation();

    const isLoading = teamLoading || appLoading;

    const team = data?.data;

    const checks = team ? [
        {
            label: "Team status is active",
            passed: team.status === "active",
            failMessage: "Your team is currently inactive.",
        },
        {
            label: `Minimum ${MIN_PLAYERS} players in squad`,
            passed: team.playerCount >= MIN_PLAYERS,
            failMessage: `You have ${team.playerCount} players. Need at least ${MIN_PLAYERS}.`,
        },
    ] : [];

    const isEligible = checks.every(c => c.passed);

    // application
    const handleApply = async () => {
        if (!team?._id || !tournamentId) return;
        const loadingId = LoadingToast({ msg: "applying..." })
        try {
            await applyForTournament({ tournamentId, teamId: team._id }).unwrap();
            toast.dismiss(loadingId);
            SuccessToast({ msg: "Application submitted successfully!" });
            setConfirmOpen(false);
            navigate(`/dashboard/application/my_application`)
        } catch {
            toast.dismiss(loadingId);
            ErrorToast({ msg: "Failed to submit application. Please try again." });
        }
    };

    return (
        <PageLayout>
            <BackButton onClick={goBack}>Back</BackButton>
            <PageHeader
                topTitle="Tournament"
                title="Apply for Tournament"
                subtitle="Review your eligibility before applying"
            />

            <div className="max-w-lg mx-auto mt-6 space-y-4 px-2 sm:px-0">

                {/* Loading */}
                {isLoading && (
                    <TALoading />
                )}

                {/* Error / no team */}
                {!isLoading && (isError || !team) && (
                    <TAEmptyOrErr />
                )}

                {!isLoading && team && (
                    <>
                        {/* Team card */}
                        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                            <div className="h-1 w-full bg-gradient-primary" />
                            <div className="p-4 flex items-center gap-4">
                                <img
                                    src={team.teamLogo}
                                    alt={team.teamName}
                                    className="w-14 h-14 rounded-xl object-cover border border-border flex-shrink-0"
                                    loading="lazy"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-5">
                                        <p className="text-sm font-medium text-font">{team.teamName}</p>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full
                      ${team.status === "active"
                                                ? "bg-green-500/10 text-green-600"
                                                : "bg-toastErrorBg text-toastErrorText"
                                            }`}>
                                            {team.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="flex items-center gap-1 text-xs text-subtext">
                                            <Users size={10} className="text-muted" />
                                            {team.playerCount} players
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Eligibility checklist */}
                        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                                <Shield size={13} className="text-muted" />
                                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                                    Eligibility
                                </p>
                            </div>
                            <div className="p-4 space-y-2.5">
                                {checks.map(({ label, passed, failMessage }) => (
                                    <div
                                        key={label}
                                        className={`flex items-start gap-3 p-3 rounded-xl border
                      ${passed
                                                ? "border-green-500/20 bg-green-500/5"
                                                : "border-toastErrorText/20 bg-toastErrorBg"
                                            }`}
                                    >
                                        {passed
                                            ? <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
                                            : <XCircle size={15} className="text-toastErrorText flex-shrink-0 mt-0.5" />
                                        }
                                        <div>
                                            <p className="text-xs font-medium text-font">{label}</p>
                                            {!passed && (
                                                <p className="text-xs text-toastErrorText mt-0.5">{failMessage}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        {application ? (
                            // already applied — show status
                            (() => {
                                const config = statusConfig[application.status as keyof typeof statusConfig];
                                const Icon = config.icon;
                                return (
                                    <div className={`rounded-2xl border p-5 flex items-start gap-4
                       ${config.bg} ${config.border}`}>
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center
                         flex-shrink-0 ${config.bg} border ${config.border}`}>
                                            <Icon size={16} className={config.color} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium ${config.color}`}>{config.label}</p>
                                            <p className="text-xs text-muted mt-0.5">{config.desc}</p>
                                            <p className="text-xs text-muted mt-1">
                                                Applied: {new Date(application.applicationDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : isEligible ? (
                            <button
                                onClick={() => setConfirmOpen(true)}
                                className="w-full py-2.5 rounded-xl text-sm font-medium text-white
               bg-primary hover:bg-primaryHover transition-colors"
                            >
                                Apply Now
                            </button>
                        ) : (
                            <div className="rounded-2xl border border-border bg-surface p-5
                  flex flex-col items-center text-center gap-3">
                                <p className="text-sm font-medium text-font">
                                    Your team is not eligible to apply
                                </p>
                                <p className="text-xs text-muted">Fix the issues above to become eligible.</p>
                                <Link to={`/dashboard/team/manage/${team._id}`}>
                                    <button className="flex items-center gap-1.5 text-xs font-medium
                         text-primary hover:underline">
                                        Manage Team <ArrowRight size={12} />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </>
                )}

            </div>

            <ConfirmModal
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Confirm Application"
                description={`Apply ${team?.teamName} to this tournament?`}
                onConfirm={handleApply}
                loading={applying}
            />
        </PageLayout>
    )
}

export default TournamentApplication