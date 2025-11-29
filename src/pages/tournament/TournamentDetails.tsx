import { Link, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { useGetTournamentDetailsQuery } from "../../features/tournament/tournamentApi";
import SectionLayout from "../../component/layout/SectionLayout";
import Buttons from "../../component/common/Buttons";
import SafeHtmlRender from "../../component/common/input/inputUtils/SafeHtmlRender";
import { fontStyle } from "../../utils/ClassUtils";

const statusColors: Record<string, string> = {
  ongoing: "bg-green-600/10 text-green-600 border-green-600/20",
  upcoming: "bg-blue-600/10 text-blue-600 border-blue-600/20",
  completed: "bg-purple-600/10 text-purple-600 border-purple-600/20",
};

const TournamentDetails = () => {
  const goBack = useGoBack();
  const { id } = useParams();

  const { data, isLoading } = useGetTournamentDetailsQuery(id as string);
  const t = data?.data;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="h-72 w-full animate-pulse bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </PageLayout>
    );
  }
 
  return (
    <PageLayout>
      <BackButton onClick={goBack} className="mb-4">
        Back
      </BackButton>

      {/* hero section */}
      <div className="relative mb-10">
        <img
          src={t?.photo}
          alt={t?.tournamentName}
          className="w-full h-[360px] rounded-2xl object-cover shadow-md"
        />

        <div className="absolute bottom-4 sm:left-6 flex flex-col space-y-3">
          <h1 className={`${fontStyle.SectionHeading} font-bold text-white drop-shadow-lg bg-black/40 p-2 rounded`}>
            {t?.tournamentName}
          </h1>
        </div>
      </div>

      <SectionLayout>
        {/* info header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <span
            className={`px-4 py-1 rounded-lg border text-sm font-semibold capitalize ${statusColors[t?.status ?? "ongoing"]
              }`}
          >
            {t?.status}
          </span>

          {/* vew result button */}
          {t?.status === "completed" && (
            <Link to={`/dashboard/tournament/result/${t._id}`}>
            <Buttons
              variant="primary"
              className="rounded-md px-5 py-2"
            >
              View Tournament Result
            </Buttons>
            </Link>
          )}
        </div>

        {/* Tournament data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <InfoCard label="Tournament Type" value={t?.tournamentType} />
          <InfoCard label="Ball Type" value={t?.ballType} />
          <InfoCard label="Format (Teams)" value={`${t?.format} Teams`} />
          <InfoCard label="Match Overs" value={`${t?.matchOver} overs`} />
          <InfoCard label="Entry Fee" value={`${t?.entryFee} BDT`} />
          <InfoCard label="Seats" value={t?.seat} />
          <InfoCard label="Team Count" value={t?.teamCount} />
          <InfoCard
            label="Registration Deadline"
            value={t?.registrationDeadline}
          />
          <InfoCard
            label="Duration"
            value={`${t?.startDate} → ${t?.endDate}`}
          />
        </div>

        {/* champion section */}
        {t?.status === "completed" && (
          <div className="mt-10 p-6 rounded-xl border border-border bg-subSurface/20">
            <h2 className="text-xl font-semibold mb-4 text-subtext">Tournament Price</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <InfoCard label="Champion" value={t?.champion || "-"} />
              <InfoCard label="Runner Up" value={t?.runnerUp || "-"} />
              <InfoCard label="Third Place" value={t?.thirdPlace || "-"} />
            </div>
          </div>
        )}

        {/* desc */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-font">About Tournament</h2>
          <article className="text-subtext leading-relaxed whitespace-pre-line">
            {<SafeHtmlRender html={t?.description} />}
          </article>
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

export default TournamentDetails;


// card, reusable
const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => {
  return (
    <div className="p-5 border border-border rounded-xl bg-bg hover:border-subSurface transition">
      <p className="text-sm text-subtext font-medium">{label}</p>
      <p className="text-lg mt-1 font-semibold text-font">{value || "-"}</p>
    </div>
  );
};
