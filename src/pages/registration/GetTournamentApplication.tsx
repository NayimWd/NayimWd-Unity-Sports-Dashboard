import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout";
import { useGetRegisterApplicationQuery } from "../../features/registration/registrationApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import { statusOption } from "./index";
import SectionLayout from "../../component/layout/SectionLayout";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import Dropdown from "../../component/common/dropdown/Dropdown";
import { BookOpenText, Check, Settings, X } from "lucide-react";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";

const TournamentApplications = () => {
    const goBack = useGoBack();
    // for status filter
    const [status, setStatus] = useState<string | undefined>();

    // get  tournament id
    const { data } = useLatestTournamentQuery();

    // get application by that id
    const { data: applications, isLoading, isError } = useGetRegisterApplicationQuery({
        id: data?.data._id,
        status: status
    },
        {
            skip: !data?.data._id
        }
    );

    const allApplications = applications?.data.registration;
    // table header
    const tableHeader = ["Photo", "Team", "Manager", "Status", "Action"]

    // table
    let content = null;

    if (isLoading) {
        content = [...Array(5)].map((_, index) => (
            <TableSkeleton key={index} columns={tableHeader.length} />
        ));
    } else if (isError || applications?.data.total === 0) {
        content = <TableEmpty message="No Data Found!" />
    } else {
        content = allApplications?.map((application) => (
            <TableRow
                key={application?._id}
                rowData={[
                    <div className="flex items-center gap-4">
                        <img
                            className="w-10 h-10 rounded-full object-cover object-center"
                            src={application.teamId.teamLogo}
                            alt="Blog"
                            loading="lazy"
                        />
                    </div>,
                    application.teamId.teamName,
                    application.managerId.name,
                    application.status,
                    <div>
                        <Dropdown className="bg-primary rounded-md">
                            <Dropdown.Trigger className="bg-primary text-white">
                                <Settings size="14" /> Controll
                            </Dropdown.Trigger>
                            <Dropdown.Menu className="-left-[168px] -top-3">
                                <Dropdown.Item href={`/dashboard/tournament/details/${application?._id}`}>
                                    <BookOpenText size={14} /> Read Details
                                </Dropdown.Item>
                                {
                                    application.status === "pending" ?
                                        <div>
                                            <Dropdown.Item>
                                                <Check className="text-green-500" size={14} /> Approve
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <X className="text-green-500" size={14} /> Reject
                                            </Dropdown.Item>
                                        </div>
                                        :
                                        ""
                                }


                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                ]}
            />
        ))
    }

    return (
        <PageLayout>
            <BackButton onClick={goBack}>Go Back</BackButton>
            <SectionLayout>
                <h1 className={`${fontStyle.pageTitle} text-center text-font my-6`}>
                    Tournaments Application
                </h1>
                {/* pils for filter */}
                <div className="flex flex-wrap justify-center gap-3">
                    {statusOption.map((f) => (
                        <button
                            key={f.label}
                            onClick={() => setStatus(f.value)}
                            className={`
                px-4 py-2 rounded-lg border border-border text-subtext text-sm font-medium 
                transition-all duration-200
                ${status === f.value
                                    ? "bg-bg text-font border-subSurface shadow-md"
                                    : "bg-transparent  dark:hover:bg-subSurface"
                                }
              `}
                        >
                            {f.label}
                        </button>
                    ))}

                </div>
            </SectionLayout>

            <SectionLayout>
                <Table>
                    <TableHeader headers={tableHeader} />
                    {content}
                </Table>
            </SectionLayout>

        </PageLayout>
    )
}

export default TournamentApplications