import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetTournamentResultQuery } from "../../features/tournament/tournamentApi"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton";
import EmptyData from "../../component/ui/EmptyData";
import SectionLayout from "../../component/layout/SectionLayout";
import { Award, Crown, Medal, Trophy } from "lucide-react";
import { fontStyle } from "../../utils/ClassUtils";

const TournamentResult = () => {
  const goback = useGoBack();

  // get tournament id from router params
  const { id } = useParams();

  const { data } = useGetTournamentResultQuery(id as string);


  const result = data?.data.result;
  const tournament = data?.data.tournament;

  const champion = result?.result.champion;
  const runnerUp = result?.result.runnerUp;
  const thirdPlace = result?.result.thirdPlace;

  let content = null;

  if (!result) {
    content = <EmptyData message="Tournament result is not created yet" />
  } else {
    content = <>

      <SectionLayout>
        <div className="max-w-6xl mx-auto space-y-10">

          {/* tournament photo (if exist) */}
          {tournament?.photo && (
            <div className="rounded-xl bg-bg p-5 overflow-hidden shadow-lg relative">
              <img
                src={tournament.photo}
                alt="Tournament Poster"
                className="w-full max-h-[350px] object-cover bg-center rounded-md"
              />
              <h2 className={`${fontStyle.SectionHeading} text-font px-3 py-1 bg-black/60 rounded-md absolute bottom-5 left-5`}>{tournament.tournamentName}</h2>
            </div>
          )}

          {/* card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* champion */}
            <div className="bg-bg rounded-xl border border-border p-5 shadow-sm">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={champion?.teamLogo}
                    alt={champion?.teamName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xl font-semibold text-font flex items-center gap-2">
                  <Crown className="text-yellow-500" /> {champion?.teamName}
                </p>
                <span className="text-xs uppercase tracking-wide text-primary font-medium">
                  Champion
                </span>
              </div>
            </div>

            {/* runner up */}
            <div className="bg-bg rounded-xl border border-border p-5 shadow-sm">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-16 w-16 rounded-full overflow-hidden border">
                  <img
                    src={runnerUp?.teamLogo}
                    alt={runnerUp?.teamName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold text-font flex items-center gap-2">
                  <Medal className="text-blue-500" /> {runnerUp?.teamName}
                </p>
                <span className="text-xs uppercase tracking-wide text-subtext">
                  Runner-Up
                </span>
              </div>
            </div>

            {/* 3rd place */}
            <div className="bg-bg rounded-xl border border-border p-5 shadow-sm">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-14 w-14 rounded-full overflow-hidden border">
                  <img
                    src={thirdPlace?.teamLogo}
                    alt={thirdPlace?.teamName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold text-font flex items-center gap-2">
                  <Trophy className="text-orange-500" /> {thirdPlace?.teamName}
                </p>
                <span className="text-xs uppercase tracking-wide text-subtext">
                  Third Place
                </span>
              </div>
            </div>
          </div>

          {/* man of the match */}
          <div className="bg-bg border border-border rounded-xl shadow-sm p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-font">
              <Award className="text-primary" />
              {result.awardFor}
            </h3>

            <div className="flex items-center gap-6 mt-4">
              {/* player photo */}
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={result.manOfTheTournament.photo ?? ""}
                  alt={result.manOfTheTournament.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* mot player info */}
              <div>
                <p className="text-xl font-semibold text-font">
                  {result.manOfTheTournament.name}
                </p>
                <p className="text-subtext text-sm">
                  Man of the Tournament
                </p>
              </div>
            </div>
          </div>

          {/* update time */}
          <div className="text-xs text-subtext text-center">
            Updated: {new Date(result.updatedAt).toLocaleDateString()}
          </div>

        </div>
      </SectionLayout>
    </>
  }

  return (
    <PageLayout>
      <BackButton onClick={goback}>Back</BackButton>
      {/* header */}
      <div className="text-center space-y-3 py-6">
        <h1 className={`${fontStyle.pageTitle} font-bold text-font`}>🏆 Tournament Results</h1>
        <p className="text-subtext">
          Final standings & notable awards
        </p>
      </div>
      {content}
    </PageLayout>
  )
}

export default TournamentResult