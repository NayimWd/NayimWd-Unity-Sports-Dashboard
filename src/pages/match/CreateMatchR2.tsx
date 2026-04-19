import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout";
import { useUmpireListQuery } from "../../features/auth/authApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { IMatchSearch, IUmpireSearch } from "../../utils/types/matchTypes";
import { ITournamentSearch } from "../../utils/types/tournamentTypes";
import { CreateMatchRQFormData, createMatchRQSchema } from "../../utils/schema/matchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchTournamentQuery } from "../../features/tournament/tournamentApi";
import { useMatchOverviewQuery } from "../../features/match/matchApi";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import StepIndicator from "../../component/stepper/StepIndicator";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import { matchNumbers } from "../schedule/formHelper/formUtils";
import PickerModal from "../../component/ui/modal/PickerModal";
import StepNavigation from "../../component/stepper/stepNavigation";

// interface for list items to normalize
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}
// item category
type ActivePicker =
  | "tournament"
  | "matchA"
  | "matchB"
  | "umpire1"
  | "umpire2"
  | "umpire3"
  | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

// normalize for similar shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName,
});
const normalizeMatch = (m: IMatchSearch): PickerItem => ({
  _id: m._id, name: `Match ${m.matchNumber} — ${m.status}`,
});
const normalizeUmpire = (u: IUmpireSearch): PickerItem => ({
  _id: u._id, name: u.name,
});

// pickerKey → RHF field name
const pickerKeyToField: Record<Exclude<ActivePicker, null>, string> = {
  tournament: "tournamentId",
  matchA: "previousMatches.matchA",
  matchB: "previousMatches.matchB",
  umpire1: "umpire1",
  umpire2: "umpire2",
  umpire3: "umpire3",
};

// set step map for RHF trigger
const stepFields: Record<number, string[]> = {
  1: ["tournamentId"],
  2: ["matchNumber", "previousMatches.matchA", "previousMatches.matchB"],
  3: ["umpire1", "umpire2"],
};

const STEPS = ["Tournament", "Match Info", "Umpires"];


const CreateMatchR2 = () => {
  const goBack = useGoBack();
  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null,
    matchA: null, matchB: null,
    umpire1: null, umpire2: null, umpire3: null,
  });

  const methods = useForm<CreateMatchRQFormData>({
    resolver: zodResolver(createMatchRQSchema),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // queries
  const { data: tournamentRes, isLoading: tLoading } = useSearchTournamentQuery("");
  const { data: matchRes, isLoading: mLoading } = useMatchOverviewQuery(
    { tournamentId: tId }, { skip: !tId }
  );
  const { data: umpireRes, isLoading: uLoading } = useUmpireListQuery(undefined);

  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const matches = (matchRes?.data ?? []).map(normalizeMatch);
  const umpires = ((umpireRes as any)?.data?.umpires ?? []).map(normalizeUmpire);

  // ui - show selected state, rhf - extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];

    setValue(rhfField as any, item._id, { shouldValidate: true }); // store _id in RHF
    setSelected(prev => ({ ...prev, [pickerKey]: item }));          // store full item for UI

    if (pickerKey === "tournament") setTId(item._id);

    setActivePicker(null); // close modal
  };


  const handleClear = (pickerKey: Exclude<ActivePicker, null>) => {
    const rhfField = pickerKeyToField[pickerKey];

    setValue(rhfField as any, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [pickerKey]: null }));

    if (pickerKey === "tournament") {
      setTId("");
      (["matchA", "matchB"] as const).forEach(f => {
        setValue(pickerKeyToField[f] as any, "");
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[step] as any);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: CreateMatchRQFormData) => {
    console.log(data)
    // createMatch(payload);
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, isLoading: tLoading },
    matchA: { title: "Select Match A", items: matches, isLoading: mLoading },
    matchB: { title: "Select Match B", items: matches, isLoading: mLoading },
    umpire1: { title: "Select Umpire 1", items: umpires, isLoading: uLoading },
    umpire2: { title: "Select Umpire 2", items: umpires, isLoading: uLoading },
    umpire3: { title: "Select Umpire 3", items: umpires, isLoading: uLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Match Setup"
        title="Create Qualifier Match"
        subtitle="Set up a new qualifier round match"
      />

      <SectionLayout>
        <StepIndicator steps={STEPS} current={step} />

        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* Step 1 — Tournament */}
          {step === 1 && (
            <EntityPickerInput
              name="tournamentId"
              label="Tournament"
              placeholder="Select a tournament"
              selected={selected.tournament}        // shows tournamentName
              onPick={() => setActivePicker("tournament")}
              onClear={() => handleClear("tournament")}
            />
          )}

          {/* Step 2 — Match Info */}
          {step === 2 && (
            <div className="space-y-5">
              <DropdownInput
                label="Match Number"
                name="matchNumber"
                placeholder="Pick match number"
                options={matchNumbers}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EntityPickerInput
                  name="previousMatches.matchA"
                  label="Match A"
                  placeholder="Select Match A"
                  selected={selected.matchA}        // shows "Match {matchNumber}"
                  onPick={() => setActivePicker("matchA")}
                  onClear={() => handleClear("matchA")}
                />
                <EntityPickerInput
                  name="previousMatches.matchB"
                  label="Match B"
                  placeholder="Select Match B"
                  selected={selected.matchB}        // shows "Match {matchNumber}"
                  onPick={() => setActivePicker("matchB")}
                  onClear={() => handleClear("matchB")}
                />
              </div>
            </div>
          )}

          {/* Step 3 — Umpires */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EntityPickerInput
                name="umpire1"
                label="First Umpire"
                placeholder="Select umpire"
                selected={selected.umpire1}         // shows umpire name
                onPick={() => setActivePicker("umpire1")}
                onClear={() => handleClear("umpire1")}
              />
              <EntityPickerInput
                name="umpire2"
                label="Second Umpire"
                placeholder="Select umpire"
                selected={selected.umpire2}
                onPick={() => setActivePicker("umpire2")}
                onClear={() => handleClear("umpire2")}
              />
              <EntityPickerInput
                name="umpire3"
                label="Third Umpire (optional)"
                placeholder="Select umpire"
                selected={selected.umpire3}
                onPick={() => setActivePicker("umpire3")}
                onClear={() => handleClear("umpire3")}
              />
            </div>
          )}

          {/* Navigation */}
          <StepNavigation
            step={step}
            totalSteps={3}
            onNext={handleNext}
            onBack={() => setStep(s => s - 1)}
            submitLabel="Create Match"
          />
        </FormContainer>
      </SectionLayout>

      {active && activePicker && (
        <PickerModal
          isOpen={!!activePicker}
          onOpenChange={(open) => { if (!open) setActivePicker(null); }}
          title={active.title}
          items={active.items}
          selectedId={selected[activePicker]?._id}
          onSelect={(item) => handleSelect(activePicker, item)} // pickerKey, not field
          isLoading={active.isLoading}
        />
      )}
    </PageLayout>
  )
};

export default CreateMatchR2;