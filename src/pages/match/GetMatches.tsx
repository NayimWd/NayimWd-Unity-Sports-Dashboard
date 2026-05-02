import { useState } from "react";
import MatchCard from "../../component/common/card/MatchCard";
import MatchCardSkeleton from "../../component/common/skeleton/MatchCardSkeleton";
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useGetMatchQuery } from "../../features/match/matchApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import { useTournamentPicker } from "../../hooks/useTournamentPicker";
import TournamentPickerTrigger from "../tournament/TournamentPickerTrigger";
import PickerModal from "../../component/ui/modal/PickerModal";

const GetMatches = () => {
  const goBack = useGoBack();

  // get letest tournament id based on point table and selector
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
    } = useTournamentPicker();

  const tournamentId = activeTournamentId;
  // fetch match
  const { data: matches, isLoading: mLoading, isFetching } = useGetMatchQuery({ tournamentId }, { skip: !tournamentId });

  const isLoading = tLoading || mLoading;

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <MatchCardSkeleton key={idx} />
        ))}
      </div>
    )
  };

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`text-font text-center mt-5 ${fontStyle.pageTitle}`}>{latestTournamentName ?? "Tournament"}</h1>
      <p className={`text-subtext text-center mt-5 ${fontStyle.SectionHeading}`}>Tournament Matches</p>
      <SectionLayout className="bg-transparent">
        {/* Tournament picker */}
            <div className="flex items-center justify-start gap-10 mb-5">
              <div className="text-lg text-subtext">Pick Tournament:</div>
              <TournamentPickerTrigger
                selectedName={selected?.name}
                defaultName={latestTournamentName}
                showClear={!!selected}
                onOpen={() => setPickerOpen(true)}
                onClear={handleClear}
              />

              <PickerModal
                isOpen={pickerOpen}
                onOpenChange={setPickerOpen}
                title="Select Tournament"
                items={tournaments}
                selectedId={selected?._id ?? latestTournamentId}
                onSelect={(item) => { handleSelect(item); setPickerOpen(false); }}
              />


            </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {
            matches?.match.map((match) => (
              <MatchCard
                key={match._id}
                match={match}
              />
            ))
          }
        </div>
      </SectionLayout>
    </PageLayout>
  )
}

export default GetMatches