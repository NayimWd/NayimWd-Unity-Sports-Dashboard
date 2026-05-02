import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout";
import { useActionMutation, useGetRegisterApplicationQuery } from "../../features/registration/registrationApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { statusOption } from "./index";
import SectionLayout from "../../component/layout/SectionLayout";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import Dropdown from "../../component/common/dropdown/Dropdown";
import { BookOpenText, Check, Plus, Settings, X } from "lucide-react";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import toast from "react-hot-toast";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import PageHeader from "../../component/ui/PageHeader";
import { Link } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import PickerModal from "../../component/ui/modal/PickerModal";
import TournamentPickerTrigger from "../tournament/TournamentPickerTrigger";
import { useTournamentPicker } from "../../hooks/useTournamentPicker";


const TournamentApplications = () => {
    const goBack = useGoBack();
    const [status, setStatus] = useState<string | undefined>();
    const [pickerOpen, setPickerOpen] = useState(false);

    // get  tournament id
    const {
        activeTournamentId,
        selected,
        tournaments,
        handleSelect,
        handleClear,
        latestTournamentId,
        latestTournamentName,
        isLoading: tLoading,
        teamCount,
        activeTournamentStatus,
    } = useTournamentPicker();


    const {
        data: applications,
        isLoading: appLoading,
        isError,
    } = useGetRegisterApplicationQuery(
        { id: activeTournamentId, status },
        { skip: !activeTournamentId }
    );
    // mutaion 
    const [action] = useActionMutation();

    const isLoading = tLoading || appLoading;
    const allApplications = applications?.data?.registration ?? [];
    const total = applications?.data?.total ?? 0;

    const handleApplication = async (data: any) => {
        const loadingId = LoadingToast({ msg: "Please wait..." });
        try {
            await action({ tournamentId: activeTournamentId, data }).unwrap();
            toast.dismiss(loadingId);
            SuccessToast({ msg: `Application ${data?.status ?? "updated"}` });
        } catch {
            toast.dismiss(loadingId);
            ErrorToast({ msg: `Action failed` });
        }
    };

    const tableHeader = ["Photo", "Team", "Manager", "Status", "Action"];

    let content = null;

    if (isLoading) {
        content = [...Array(5)].map((_, i) => (
            <TableSkeleton key={i} columns={tableHeader.length} />
        ));
    } else if (isError || total === 0) {
        content = <TableEmpty message="No applications found" />;
    } else {
        content = allApplications.map((application: any) => (
            <TableRow
                key={application._id}
                rowData={[
                    <img
                        className="w-9 h-9 rounded-lg object-cover border border-border"
                        src={application.teamId.teamLogo}
                        alt={application.teamId.teamName}
                        loading="lazy"
                    />,
                    application.teamId.teamName,
                    application.managerId.name,
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full
            ${application.status === "approved" ? "bg-green-500/10 text-green-600"
                            : application.status === "rejected" ? "bg-toastErrorBg text-toastErrorText"
                                : "bg-yellow-500/10 text-yellow-600"}`}>
                        {application.status}
                    </span>,
                    <Dropdown className="bg-primary rounded-md">
                        <Dropdown.Trigger className="bg-primary text-white">
                            <Settings size={14} /> Control
                        </Dropdown.Trigger>
                        <Dropdown.Menu className="-left-[168px] -top-3">
                            <Dropdown.Item href={`/dashboard/application/details/${application._id}`}>
                                <BookOpenText size={14} /> Read Details
                            </Dropdown.Item>
                            {application.status === "pending" && (
                                <>
                                    <Dropdown.Item
                                        onClick={() => handleApplication({
                                            status: "approved",
                                            teamId: application.teamId,
                                        })}
                                    >
                                        <Check className="text-green-500" size={14} /> Approve
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handleApplication({
                                            status: "rejected",
                                            teamId: application.teamId,
                                        })}
                                    >
                                        <X className="text-red-500" size={14} /> Reject
                                    </Dropdown.Item>
                                </>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>,
                ]}
            />
        ));
    }

    return (
        <PageLayout>
            <BackButton onClick={goBack}>Go Back</BackButton>

            <SectionLayout>
                <PageHeader
                    topTitle="Applications"
                    title={selected?.name ?? latestTournamentName ?? "Tournament"}
                    subtitle={`Total: ${isLoading ? "..." : total}`}
                />

                {/* Status filter pills */}
                <div className="flex flex-wrap justify-center gap-2">
                    {statusOption.map((f) => (
                        <button
                            key={f.label}
                            onClick={() => setStatus(prev => prev === f.value ? undefined : f.value)}
                            className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium
                transition-colors duration-150
                ${status === f.value
                                    ? "bg-subSurface text-font border-inputBorder"
                                    : "bg-transparent border-border text-subtext hover:bg-subSurface"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </SectionLayout>

            <SectionLayout>

                {/* Tournament picker */}
                <div className="flex items-center justify-between mb-5">
                    <TournamentPickerTrigger
                        selectedName={selected?.name}
                        defaultName={latestTournamentName}
                        showClear={!!selected}
                        onOpen={() => setPickerOpen(true)}
                        onClear={handleClear}
                    />

                    {/* Approved teams + create schedule */}
                    {teamCount !== undefined && activeTournamentStatus === "upcoming" && (
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted">
                                Approved: <span className="font-medium text-font">{teamCount}</span>
                            </span>
                            <Link to="/dashboard/schedule/create">
                                <Buttons iconRight={<Plus size={14} />} className="rounded-lg" size="sm">
                                    Create Schedule
                                </Buttons>
                            </Link>
                        </div>
                    )}
                </div>

                <Table>
                    <TableHeader headers={tableHeader} />
                    {content}
                </Table>

            </SectionLayout>

            <PickerModal
                isOpen={pickerOpen}
                onOpenChange={setPickerOpen}
                title="Select Tournament"
                items={tournaments}
                selectedId={selected?._id ?? latestTournamentId}
                onSelect={(item) => { handleSelect(item); setPickerOpen(false); }}
            />
        </PageLayout>
    )
}

export default TournamentApplications;