import { useParams } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGetApplicationDetailsQuery } from "../../features/registration/registrationApi";
import { CalendarDays, ShieldCheck, UserCircle } from "lucide-react";
import EmptyData from "../../component/ui/EmptyData";

const ApplicationDetails = () => {
  const goBack = useGoBack();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetApplicationDetailsQuery(id as string);

  const applications = data?.data;

  // ---------- loading ----------
  if (isLoading) {
    return (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <div className="mt-8 space-y-4 animate-pulse">
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
        </div>
      </PageLayout>
    );
  }

  // ---------- error ----------
  if (isError || !applications) {
    return (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <div className="mt-12 text-center text-font">
          ❗ Unable to fetch application details.
        </div>
      </PageLayout>
    );
  }


  // ---------- empty case ----------
  if (!isLoading || !isError || !applications._id) {
    return (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <EmptyData message="No application found" />
      </PageLayout>
    );
  }

  const {
    teamId,
    managerId,
    status,
    applicationDate,
    tournamentId,
  } = applications;

  const formattedDate = new Date(applicationDate).toLocaleDateString();

  // Status UI color map
  const statusStyle = {
    approved: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300",
  };


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="flex-1">
            <h1 className="text-2xl text-font font-semibold">
              Team Application
            </h1>
            <p className="text-sm text-subtext mt-1">
              Tournament ID: {tournamentId}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-lg capitalize text-sm font-medium ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* --- grid --- */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* team section */}
        <div className="border border-border rounded-xl bg-surface  shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-bg flex items-center justify-center">
            {teamId?.teamLogo ? (
              <img
                src={teamId.teamLogo}
                alt={teamId.teamName}
                loading="lazy"
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <UserCircle className="text-font w-7 h-7" />
            )}
          </div>
          <div className="text-font">
            <p className="text-sm">Team</p>
            <p className="text-lg font-medium">{teamId.teamName}</p>
          </div>
        </div>

        {/* manager section */}
        <div className="border border-border rounded-xl bg-surface  shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-bg flex items-center justify-center">
            {managerId?.photo ? (
              <img
                src={managerId.photo}
                alt={managerId.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle className="text-font w-7 h-7" />
            )}
          </div>
          <div className="text-font">
            <p className="text-sm">Manager</p>
            <p className="text-lg font-medium">{managerId?.name}</p>
          </div>
        </div>

        {/* date */}
        <DetailCard
          icon={<CalendarDays className="w-5 h-5" />}
          label="Applied On"
          value={formattedDate}
        />

        {/* application id */}
        <DetailCard
          icon={<ShieldCheck className="w-5 h-5" />}
          label="Application ID"
          value={applications._id}
        />
      </div>
    </PageLayout>
  )
}

export default ApplicationDetails;


/* ---- temp reusable card --- */
const DetailCard = ({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  sub?: string;
}) => (
  <div className="border border-border rounded-xl bg-surface shadow-sm p-5 flex items-center gap-4 overflow-auto">
    <div className="w-10 h-10 rounded-lg bg-surface flex text-font items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-font">{label}</p>
      <p className="text-lg text-subtext font-semibold">{value ?? "—"}</p>
      {sub && <p className="text-xs text-font mt-1 text-wrap">{sub}</p>}
    </div>
  </div>
);