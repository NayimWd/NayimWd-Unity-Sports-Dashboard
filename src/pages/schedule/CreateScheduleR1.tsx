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
import StepNavigation from "../../component/stepper/stepNavigation";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { useCreateScheduleMutation } from "../../features/schedule/scheduleApi";
import { useNavigate } from "react-router-dom";


// interface
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

type ActivePicker = "tournament" | "venue" | "teamA" | "teamB" | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

type ScheduleR1Keys = keyof ScheduleR1FormData;

const pickerKeyToField: Record<Exclude<ActivePicker, null>, ScheduleR1Keys> = {
  tournament: "tournamentId",
  venue: "venueId",
  teamA: "teamA",
  teamB: "teamB",
};
// normalize data for maintain api data shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName
});

const normalizeVenue = (v: IVenueSearch): PickerItem => ({
  _id: v._id, name: `${v.name} ${v.city}`,
});

const normalizeTeam = (t: ITeamSearch): PickerItem => ({
  _id: t._id, name: t.teamName,
});


// set step map for RHF trigger(stepper)
const stepFields: Record<number, ScheduleR1Keys[]> = {
  1: ["tournamentId"],
  2: ["venueId", "round", "matchNumber", "matchDate", "matchTime", "endTime"],
  3: ["teamA", "teamB"],
};

const STEPS = ["Tournament", "Details", "Teams"];


const CreateScheduleR1 = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState<string>("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null,
    venue: null,
    teamA: null,
    teamB: null,
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

  // create schdule mutaion
  const [createSchedule] = useCreateScheduleMutation();

  // normalize API data
  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const venues = (venueRes?.data ?? []).map(normalizeVenue);
  const teams = (teamRes?.data ?? []).map(normalizeTeam);

  // for pick options from list to extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];
    setValue(rhfField as any, item._id, { shouldValidate: true });
    setSelected((prev) => ({ ...prev, [pickerKey]: item }));
    if (pickerKey === "tournament") setTId(item._id);
    setActivePicker(null);
  };

  // clear form handler
  const handleClear = (PickerKey: Exclude<ActivePicker, null>) => {
    const rhfField = pickerKeyToField[PickerKey];
    setValue(rhfField as any, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [PickerKey]: null }));
    if (PickerKey === "tournament") {
      setTId("");
      // clear dependent fields
      (["teamA", "teamB"] as const).forEach(f => {
        setValue(pickerKeyToField[f] as any, "");
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  }

  // next button trigger
  const handleNext = async () => {
    const valid = await trigger(stepFields[step] as any);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: ScheduleR1FormData) => {
    const toastId = LoadingToast({ msg: "Creating..." });

    const { tournamentId, ...body } = data;

    try {
      createSchedule({
        tournamentId,
        data: body
      }).unwrap();

      toast.dismiss(toastId);
      SuccessToast({ msg: "Schedule creation successful" });
      methods.reset();
      navigate("/dashboard/schedule")

    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Create schedule failed!" })
    }
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, isLoading: tLoading },
    venue: { title: "Select Venue", items: venues, isLoading: vLoading },
    teamA: { title: "Select Team A", items: teams, isLoading: tmLoading },
    teamB: { title: "Select Team B", items: teams, isLoading: tmLoading },
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
        <StepIndicator steps={STEPS} current={step} />
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
                <TextInput
                  label="Estimated End Time"
                  name="endTime"
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
                  name="teamA"
                  label="Team A"
                  placeholder="Select TeamA"
                  selected={selected.teamA}
                  onPick={() => setActivePicker("teamA")}
                  onClear={() => handleClear("teamA")}
                />
                <EntityPickerInput
                  name="teamB"
                  label="Team B"
                  placeholder="Select TeamB"
                  selected={selected.teamB}
                  onPick={() => setActivePicker("teamB")}
                  onClear={() => handleClear("teamB")}
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
          selectedId={selected[activePicker!]?._id}
          onSelect={(item) => handleSelect(activePicker, item)}
          isLoading={active.isLoading}
        />
      )}

    </PageLayout>
  )
}

export default CreateScheduleR1;