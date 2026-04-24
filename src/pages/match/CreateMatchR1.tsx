import { useState } from "react";
import { useGoBack } from "../../hooks/useGoBack";
import { IUmpireSearch } from "../../utils/types/matchTypes";
import { ITeamSearch } from "../../utils/types/teamType";
import { ITournamentSearch } from "../../utils/types/tournamentTypes";
import { CreateMatchR1FormData, createMatchR1Schema } from "../../utils/schema/matchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApprovedTeamQuery, useSearchTournamentQuery } from "../../features/tournament/tournamentApi";
import { useUmpireListQuery } from "../../features/auth/authApi";
import BackButton from "../../utils/BackButton";
import PageLayout from "../../component/layout/PageLayout";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import StepIndicator from "../../component/stepper/StepIndicator";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import { matchNumbers } from "../schedule/formHelper/formUtils";
import DropdownInput from "../../component/common/input/DropdownInput";
import PickerModal from "../../component/ui/modal/PickerModal";
import StepNavigation from "../../component/stepper/stepNavigation";

// interface for list items to normalize
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
  role?: string;
}

// item category
type ActivePicker =
  | "tournament"
  | "teamA"
  | "teamB"
  | "umpire1"
  | "umpire2"
  | "umpire3"
  | null;


type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

// normalize for similar shape
const normalizeTournament = (t: ITournamentSearch): PickerItem => ({
  _id: t._id, name: t.tournamentName,
});
const normalizeTeam = (m: ITeamSearch): PickerItem => ({
  _id: m._id, name: m.teamName,
});
const normalizeUmpire = (u: IUmpireSearch): PickerItem => ({
  _id: u._id, name: u.name, role: u.role,
});

// pickerKey - rhf field name
const pickerKeyToField: Record<Exclude<ActivePicker, null>, string> = {
  tournament: "tournamentId",
  teamA: "teamA",
  teamB: "teamB",
  umpire1: "umpire1",
  umpire2: "umpire2",
  umpire3: "umpire3",
};


// set step map for RHF trigger
const stepFields: Record<number, string[]> = {
  1: ["tournamentId"],
  2: ["matchNumber", "teamA", "teamB"],
  3: ["umpire1", "umpire2"],
};

const STEPS = ["Tournament", "Match Info", "Umpires"];

const CreateMatchR1 = () => {
  const goBack = useGoBack();
  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [tId, setTId] = useState("");
  const [selected, setSelected] = useState<SelectedMap>({
    tournament: null,
    teamA: null, teamB: null,
    umpire1: null, umpire2: null, umpire3: null,
  });

  const methods = useForm<CreateMatchR1FormData>({
    resolver: zodResolver(createMatchR1Schema),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // queries
  const { data: tournamentRes, isLoading: tLoading } = useSearchTournamentQuery("");
  const { data: teamRes, isLoading: tmLoading } = useApprovedTeamQuery(
    { tournamentId: tId }, { skip: !tId }
  );
  const { data: umpireRes, isLoading: uLoading } = useUmpireListQuery(undefined);

  const tournaments = (tournamentRes?.data ?? []).map(normalizeTournament);
  const matches = (teamRes?.data ?? []).map(normalizeTeam);
  const umpires = ((umpireRes as any)?.data?.umpires ?? []).map(normalizeUmpire);

  // ui - show selected state, rhf - extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];
    setValue(rhfField as any, item._id, { shouldValidate: true });
    setSelected(prev => ({ ...prev, [pickerKey]: item }));
    if (pickerKey === "tournament") setTId(item._id);
    setActivePicker(null);
  };

  const handleClear = (pickerKey: Exclude<ActivePicker, null>) => {
    const rhfField = pickerKeyToField[pickerKey];
    setValue(rhfField as any, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [pickerKey]: null }));
    if (pickerKey === "tournament") {
      setTId("");
      (["teamA", "teamB"] as const).forEach(f => {
        setValue(pickerKeyToField[f] as any, "");
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[step] as any);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = (data: CreateMatchR1FormData) => {
    console.log(data);
    // createMatch(payload);
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; field: string; isLoading: boolean }
  > = {
    tournament: { title: "Select Tournament", items: tournaments, field: "tournamentId", isLoading: tLoading },
    teamA: { title: "Select Team A", items: matches, field: "teamA", isLoading: tmLoading },
    teamB: { title: "Select Team B", items: matches, field: "teamB", isLoading: tmLoading },
    umpire1: { title: "Select Umpire 1", items: umpires, field: "umpire1", isLoading: uLoading },
    umpire2: { title: "Select Umpire 2", items: umpires, field: "umpire2", isLoading: uLoading },
    umpire3: { title: "Select Umpire 3", items: umpires, field: "umpire3", isLoading: uLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      <PageHeader
        topTitle="Match Setup"
        title="Create Round 1 Match"
        subtitle="Set up a new round 1 match"
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
              selected={selected.tournament}
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
                  name="teamA"
                  label="Team A"
                  placeholder="Select team A"
                  selected={selected.teamA}
                  onPick={() => setActivePicker("teamA")}
                  onClear={() => handleClear("teamA")}
                />
                <EntityPickerInput
                  name="teamB"
                  label="Team B"
                  placeholder="Select team B"
                  selected={selected.teamB}
                  onPick={() => setActivePicker("teamB")}
                  onClear={() => handleClear("teamB")}
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
                selected={selected.umpire1}
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
          onSelect={(item) => handleSelect(activePicker, item)}
          isLoading={active.isLoading}
        />
      )}
    </PageLayout>
  )
}

export default CreateMatchR1