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
import { IMatchSearch } from "../../utils/types/matchTypes";
import { ScheduleRQFormData, scheduleSchemaRQ } from "../../utils/schema/scheduleSchema";
import { useSearchTournamentQuery } from "../../features/tournament/tournamentApi";
import { useVenueSearchQuery } from "../../features/venue/venueApi";
import { useMatchOverviewQuery } from "../../features/match/matchApi";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import TextInput from "../../component/common/input/TextInput";
import { matchNumbers, matchRound } from "./formHelper/formUtils";
import PickerModal from "../../component/ui/modal/PickerModal";
import DateInput from "../../component/common/input/DateInput";
import StepIndicator from "../../component/stepper/StepIndicator";
import StepNavigation from "../../component/stepper/stepNavigation";

// interface
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

type ActivePicker = "tournament" | "venue" | "matchA" | "matchB" | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

const pickerKeyToField: Record<Exclude<ActivePicker, null>, keyof ScheduleRQFormData> = {
  tournament: "tournamentId",
  venue: "venueId",
  matchA: "matchA",
  matchB: "matchB",
};

// normalize data for maintain api data shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName
});

const normalizeVenue = (v: IVenueSearch): PickerItem => ({
  _id: v._id, name: `${v.name} ${v.city}`
});

const normalizeMatch = (m: IMatchSearch): PickerItem => ({
  _id: m._id, name: `${m.matchNumber} - ${m.status}`,
});

// set step map for RHF trigger(stepper)
const stepFields: Record<number, (keyof ScheduleRQFormData)[]> = {
  1: ["tournamentId"],
  2: ["venueId", "round", "matchNumber", "matchDate", "matchTime"],
  3: ["matchA", "matchB"],
};

const STEPS = ["Tournament", "Details", "Teams & Matches"];



const CreateScheduleR2 = () => {
  const goBack = useGoBack();
  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState<string>("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null,
    venue: null,
    matchA: null,
    matchB: null,
  });

  const methods = useForm<ScheduleRQFormData>({
    resolver: zodResolver(scheduleSchemaRQ),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // fetch data with rtk query
  const { data: tournamentRes, isLoading: tLoading } = useSearchTournamentQuery("");
  const { data: venueRes, isLoading: vLoading } = useVenueSearchQuery(undefined);
  const { data: matchRes, isLoading: mLoading } = useMatchOverviewQuery(
    { tournamentId: tId }, { skip: !tId }
  );

  // normalize API data
  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const venues = (venueRes?.data ?? []).map(normalizeVenue);
  const matches = (matchRes?.data ?? []).map(normalizeMatch);

  // for pick options from list to extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];
    setValue(rhfField, item._id, { shouldValidate: true });
    setSelected(prev => ({ ...prev, [pickerKey]: item }));
    if (pickerKey === "tournament") setTId(item._id);
    setActivePicker(null);
  };

  // clear form handler
  const handleClear = (pickerKey: Exclude<ActivePicker, null>) => {
    const rhfField = pickerKeyToField[pickerKey];
    setValue(rhfField, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [pickerKey]: null }));
    if (pickerKey === "tournament") {
      setTId("");
      (["matchA", "matchB"] as const).forEach(f => {
        setValue(pickerKeyToField[f], null);
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  };

  // next button trigger
  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: ScheduleRQFormData) => {
    console.log(data);
    // fire RTK mutation here
  };


  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, isLoading: tLoading },
    venue: { title: "Select Venue", items: venues, isLoading: vLoading },
    matchA: { title: "Select Match A", items: matches, isLoading: mLoading },
    matchB: { title: "Select Match B", items: matches, isLoading: mLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Schedule Setup"
        title="Create Qualifier Schedule"
        subtitle="Fill in the details to schedule a qualifier match"
      />

      <SectionLayout>
        {/* step button */}
        <StepIndicator steps={STEPS} current={step} />

        {/* form */}
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
                onClear={() => handleClear("tournament")}
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
                onClear={() => handleClear("venue")}
              />
            </div>
          )}

          {/* ── Step 3 — Teams & Matches ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EntityPickerInput
                  name="matchA"
                  label="Match A"
                  placeholder="Select Match A"
                  selected={selected.matchA}
                  onPick={() => setActivePicker("matchA")}
                  onClear={() => handleClear("matchA")}
                />
                <EntityPickerInput
                  name="matchB"
                  label="Match B"
                  placeholder="Select Match B"
                  selected={selected.matchB}
                  onPick={() => setActivePicker("matchB")}
                  onClear={() => handleClear("matchB")}
                />
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <StepNavigation
            step={step}
            totalSteps={3}
            onNext={handleNext}
            onBack={() => setStep(s => s - 1)}
            submitLabel="Create Match"
          />
        </FormContainer>
      </SectionLayout>

      {/* picker modal */}
      {active && activePicker && (
        <PickerModal
          isOpen={!!activePicker}
          onOpenChange={(open) => { if (!open) setActivePicker(null); }}
          title={active.title}
          items={active.items}
          selectedId={selected[activePicker]?._id}
          onSelect={(item) => handleSelect(activePicker, item)}
          isLoading={active.isLoading}
        />
      )}

    </PageLayout>
  )
}

export default CreateScheduleR2;
