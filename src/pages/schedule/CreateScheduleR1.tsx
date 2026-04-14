import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import PageHeader from "../../component/ui/PageHeader";
import { ITournamentSearch } from "../../utils/types/tournamentTypes";
import { IVenueSearch } from "../../utils/types/venueType";
import { ITeamSearch } from "../../utils/types/teamType";
import { ScheduleR1FormData, scheduleSchemaR1, } from "../../utils/schema/scheduleSchema";
import { useApprovedTeamQuery, useSearchTournamentQuery } from "../../features/tournament/tournamentApi";
import { useVenueSearchQuery } from "../../features/venue/venueApi";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import TextInput from "../../component/common/input/TextInput";
import { matchNumbers, matchRound } from "./formHelper/formUtils";
import PickerModal from "../../component/ui/modal/PickerModal";
import DateInput from "../../component/common/input/DateInput";
import StepIndicator from "../../component/stepper/StepIndicator";


// interface
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

type ActivePicker = "tournament" | "venue" | "teamA" | "teamB" | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

// normalize data for maintain api data shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName
});

const normalizeVenue = (v: IVenueSearch): PickerItem => ({
  _id: v._id, name: `${v.city} ${v.city}`
});

const normalizeTeam = (t: ITeamSearch): PickerItem => ({
  _id: t._id, name: t.teamName,
});

// set step map for RHF trigger(stepper)
const stepFields: Record<number, (keyof ScheduleR1FormData)[]> = {
  1: ["tournamentId"],
  2: ["venueId", "round", "matchNumber", "matchDate", "matchTime"],
  3: ["teamA", "teamB"],
};

const STEPS = ["Tournament", "Details", "Teams"];


const CreateScheduleR1 = () => {
  const goBack = useGoBack();

  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState<string>("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null, venue: null,
    teamA: null, teamB: null,
  });

  const methods = useForm<ScheduleR1FormData>({
    resolver: zodResolver(scheduleSchemaR1),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // fetch data with rtk query
  const { data: tournamentRes, isLoading: tLoading } = useSearchTournamentQuery("");
  const { data: venueRes, isLoading: vLoading } = useVenueSearchQuery(undefined);
  const { data: teamRes, isLoading: tmLoading } = useApprovedTeamQuery(
    { tournamentId: tId }, { skip: !tId }
  );


  // normalize API data
  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const venues = (venueRes?.data ?? []).map(normalizeVenue);
  const teams = (teamRes?.data ?? []).map(normalizeTeam);

  // for pick options from list to extract id
  const handleSelect = (field: string, item: PickerItem) => {
    setValue(field as keyof ScheduleR1FormData, item._id, { shouldValidate: true });
    setSelected((prev) => ({ ...prev, [field]: item }));
    if (field === "tournamentId") setTId(item._id);
  };

  // clear form handler
  const handleClear = (field: string) => {
    setValue(field as keyof ScheduleR1FormData, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [field]: null }));
    if (field === "tournamentId") {
      setTId("");
      // clear dependent fields
      (["teamA", "teamB", "matchA", "matchB"] as const).forEach(f => {
        setValue(f, null);
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  }

  // next button trigger
  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: ScheduleR1FormData) => {
    console.log(data);
    // fire RTK mutation here
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; field: string; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, field: "tournamentId", isLoading: tLoading },
    venue: { title: "Select Venue", items: venues, field: "venueId", isLoading: vLoading },
    teamA: { title: "Select Team A", items: teams, field: "teamA", isLoading: tmLoading },
    teamB: { title: "Select Team B", items: teams, field: "teamB", isLoading: tmLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="· Schedule Setup ·"
        title="Create Match Schedule for Qualifier Round"
        subtitle="Fill in the details to schedule a new match"
      />
      <SectionLayout>
        {/* step button */}
        <StepIndicator steps={STEPS} current={step}/>
        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* ── Step 1 — Tournament ── */}
          {step === 1 && (
            <div className="space-y-6">
              <EntityPickerInput
                name="tournamentId"
                label="Tournament"
                placeholder="Select a tournament"
                selected={selected.tournament}
                onPick={() => setActivePicker("tournament")}
                onClear={() => handleClear("tournamentId")}
              />
            </div>
          )}

          {/* ── Step 2 — Details ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownInput
                  label="Round"
                  name="round"
                  placeholder="Pick a round"
                  options={matchRound}
                />
                <DropdownInput
                  label="Match Number"
                  name="matchNumber"
                  placeholder="Pick match number"
                  options={matchNumbers}
                />
                <DateInput
                  label="Match Date"
                  name="matchDate"
                  placeholder="DD-MM-YYYY"
                  type="text"
                />
                <TextInput
                  label="Match Time"
                  name="matchTime"
                  placeholder="e.g. 3pm"
                  type="text"
                />
              </div>
              <EntityPickerInput
                name="venueId"
                label="Venue"
                placeholder="Select a venue"
                selected={selected.venue}
                onPick={() => setActivePicker("venue")}
                onClear={() => handleClear("venueId")}
              />
            </div>
          )}

          {/* ── Step 3 — Teams & Matches ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EntityPickerInput
                  name="teamA"
                  label="Team A"
                  placeholder="Auto-resolved after R1"
                  selected={selected.teamA}
                  onPick={() => setActivePicker("teamA")}
                  onClear={() => handleClear("teamA")}
                />
                <EntityPickerInput
                  name="teamB"
                  label="Team B"
                  placeholder="Auto-resolved after R1"
                  selected={selected.teamB}
                  onPick={() => setActivePicker("teamB")}
                  onClear={() => handleClear("teamB")}
                />
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="px-4 py-2 text-sm text-subtext border border-border rounded-lg
                           hover:bg-subSurface transition-colors"
              >
                ← Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors"
              >
                Create Schedule
              </button>
            )}
          </div>
        </FormContainer>
      </SectionLayout>

      {/* picker modal */}
      {active && (
        <PickerModal
          isOpen={!!activePicker}
          onOpenChange={(open) => { if (!open) setActivePicker(null); }}
          title={active.title}
          items={active.items}
          selectedId={selected[activePicker!]?._id}
          onSelect={(item) => handleSelect(active.field, item)}
          isLoading={active.isLoading}
        />
      )}

    </PageLayout>
  )
}

export default CreateScheduleR1;