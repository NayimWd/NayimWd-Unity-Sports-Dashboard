import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import SectionLayout from "../../component/layout/SectionLayout";
import PageHeader from "../../component/ui/PageHeader";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { ITeamSearch } from "../../utils/types/teamType";
import { IPlayerListItem } from "../../utils/types/tournamentResultType";
import {
  CreateTournamentResultData,
  createTournamentResultSchema,
} from "../../utils/schema/tournamentSchema";
import { useState } from "react";
import {
  useApprovedTeamQuery,
  useCreateTournamentResultMutation,
} from "../../features/tournament/tournamentApi";
import { usePlayerListQuery } from "../../features/team/teamApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import StepIndicator from "../../component/stepper/StepIndicator";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import TextInput from "../../component/common/input/TextInput";
import PickerModal from "../../component/ui/modal/PickerModal";

// interface
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

type ActivePicker = "team" | "player" | null;
type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

//  normalizers
const normalizeTeam = (t: ITeamSearch): PickerItem => ({
  _id: t._id,
  name: t.teamName,
});

const normalizePlayer = (p: IPlayerListItem): PickerItem => ({
  _id: p.playerId._id,
  name: p.playerId.name,
  photo: p.playerId.photo,
});

const STEPS = ["Select Team", "Player & Award"];

const stepFields: Record<number, (keyof CreateTournamentResultData)[]> = {
  1: [],
  2: ["manOfTheTournament", "awardFor"],
};

const CreateResult = () => {
  const { id: tournamentId } = useParams();
  const goBack = useGoBack();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [teamId, setTeamId] = useState<string>("");
  const [selected, setSelected] = useState<SelectedMap>({
    team: null,
    player: null,
  });

  // fetch with rtk query
  const { data: teamRes, isLoading: tLoading } = useApprovedTeamQuery({
    tournamentId,
  });
  const { data: playerRes, isLoading: pLoading } = usePlayerListQuery(teamId, {
    skip: !teamId,
  });

  const [createTournamentResult, { isLoading: submitting }] =
    useCreateTournamentResultMutation();

  //  normalize
  const teams = (teamRes?.data ?? []).map(normalizeTeam);
  const players = (playerRes?.data?.teamMembers ?? []).map(normalizePlayer);

  //  form
  const methods = useForm<CreateTournamentResultData>({
    resolver: zodResolver(createTournamentResultSchema),
    mode: "onSubmit",
  });
  const { setValue, trigger } = methods;

  // handlers
  const handleSelect = (
    pickerKey: Exclude<ActivePicker, null>,
    item: PickerItem,
  ) => {
    if (pickerKey === "team") {
      setTeamId(item._id);
      setSelected((prev) => ({ ...prev, team: item, player: null }));
      setValue("manOfTheTournament", "", { shouldValidate: false });
      setActivePicker(null);
      return;
    }
    setValue("manOfTheTournament", item._id, { shouldValidate: true });
    setSelected((prev) => ({ ...prev, player: item }));
    setActivePicker(null);
  };

  const handleClear = (pickerKey: Exclude<ActivePicker, null>) => {
    if (pickerKey === "team") {
      setTeamId("");
      setSelected({ team: null, player: null });
      setValue("manOfTheTournament", "", { shouldValidate: false });
      return;
    }
    setValue("manOfTheTournament", "", { shouldValidate: false });
    setSelected((prev) => ({ ...prev, player: null }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!selected.team) return;
      setStep(2);
      return;
    }
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: CreateTournamentResultData) => {
    const toastId = LoadingToast({ msg: "Creating result..." });
    try {
      await createTournamentResult({
        id: tournamentId,
        data,
      }).unwrap();
      toast.dismiss(toastId);
      SuccessToast({ msg: "Tournament result created successfully" });
      methods.reset();
      setSelected({ team: null, player: null });
      setTeamId("");
      navigate("/");
    } catch {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Failed to create result" });
    }
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    team: { title: "Select Team", items: teams, isLoading: tLoading },
    player: { title: "Select Player", items: players, isLoading: pLoading },
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Tournament Result"
        title="Create Tournament Result"
        subtitle="Select MVP and enter award description"
      />

      <SectionLayout>
        <StepIndicator steps={STEPS} current={step} />

        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* Step 1 — Team selection */}
          {step === 1 && (
            <div className="space-y-4">
              <EntityPickerInput
                name="manOfTheTournament"
                label="Select Team"
                placeholder="Pick a team"
                selected={selected.team}
                onPick={() => setActivePicker("team")}
                onClear={() => handleClear("team")}
              />
              {!selected.team && (
                <p className="text-xs text-muted text-center">
                  Select a team to browse its players
                </p>
              )}
            </div>
          )}

          {/* Step 2 — Player + award */}
          {step === 2 && (
            <div className="space-y-5">
              {/* selected team display */}
              {selected.team && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg
                                bg-subSurface border border-border text-sm text-subtext"
                >
                  <span className="text-muted text-xs">Team:</span>
                  <span className="font-medium text-font">
                    {selected.team.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      handleClear("team");
                    }}
                    className="ml-auto text-xs text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
              )}

              <EntityPickerInput
                name="manOfTheTournament"
                label="Man of the Tournament"
                placeholder="Select a player"
                selected={selected.player}
                onPick={() => setActivePicker("player")}
                onClear={() => handleClear("player")}
              />

              <TextInput
                name="awardFor"
                label="Award Description"
                placeholder="e.g. 8 wickets and 225 runs"
                type="text"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 text-sm text-subtext border border-border
                           rounded-lg hover:bg-subSurface transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!selected.team}
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm font-medium text-white bg-primary
                           hover:bg-primaryHover rounded-lg transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Result"}
              </button>
            )}
          </div>
        </FormContainer>
      </SectionLayout>

      {active && activePicker && (
        <PickerModal
          isOpen={!!activePicker}
          onOpenChange={(open) => {
            if (!open) setActivePicker(null);
          }}
          title={active.title}
          items={active.items}
          selectedId={
            activePicker === "team" ? selected.team?._id : selected.player?._id
          }
          onSelect={(item) => handleSelect(activePicker, item)}
          isLoading={active.isLoading}
        />
      )}
    </PageLayout>
  );
};

export default CreateResult;
