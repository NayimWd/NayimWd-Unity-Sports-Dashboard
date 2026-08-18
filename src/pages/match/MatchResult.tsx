import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import { useCreateMatchResultMutation, useLazyGetMatchPlayerQuery, useMatchTeamsQuery } from "../../features/match/matchApi";
import { IMatchOfPlayer, IMatchTeamSearch } from "../../utils/types/matchTypes";
import { useState } from "react";
import { CreateMatchResultData, createMatchResultSchema } from "../../utils/schema/matchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import PickerModal from "../../component/ui/modal/PickerModal";
import Buttons from "../../component/common/Buttons";
import { SquarePen } from "lucide-react";
import TextInput from "../../component/common/input/TextInput";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";


interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}

// item category
type ActivePicker =
  | "team"
  | "player"
  | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

const normalizeTeam = (t: IMatchTeamSearch): PickerItem => ({
  _id: t._id, name: t.teamName, photo: t.teamLogo
});

const normalizePlayer = (p: IMatchOfPlayer): PickerItem => ({
  _id: p.playerId._id,
  name: p.playerId.name,
  photo: p.playerId.photo,
})

// pickerKey → RHF field name
const pickerKeyToField: Record<Exclude<ActivePicker, null>, string> = {
  team: "teamId",
  player: "manOfTheMatch"
};

const MatchResult = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  const { tournamentId, matchId } = useParams();

  const { data: teams, isLoading: mLoading } = useMatchTeamsQuery({ matchId });

  // fetch team players based on teamId
  const [trigger, { data: players, isLoading: pLoading }] = useLazyGetMatchPlayerQuery();


  const [createMatchResult, { isLoading }] = useCreateMatchResultMutation();

  const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const [_tId, setTId] = useState("");
  const [_pId, setPId] = useState("");
  const [selected, setSelected] = useState<SelectedMap>({
    team: null,
    player: null,
  });


  // form section 
  const methods = useForm<CreateMatchResultData>({
    resolver: zodResolver(createMatchResultSchema),
    mode: "onSubmit",
  });
  const { setValue } = methods;

  const onSubmit = async (formData: CreateMatchResultData) => {
    const toastId = LoadingToast({ msg: "Creating..." });
    try {
      await createMatchResult({
        tournamentId,
        matchId,
        data: formData
      }).unwrap();

      toast.dismiss(toastId);
      SuccessToast({ msg: "Result creation successful" });
      methods.reset();
      navigate(`/dashboard/match/manage`)

    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Create Result failed!" })
    }

  }

  const matchTeams = teams?.data
    ? [teams.data.teamA, teams.data.teamB].filter(Boolean).map(normalizeTeam)
    : [];

  const matchPlayer = (players?.data ?? []).map(normalizePlayer);

  // ui - show selected state, rhf - extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];

    setValue(rhfField as any, item._id, { shouldValidate: true }); // store _id in RHF
    setSelected(prev => ({ ...prev, [pickerKey]: item }));          // store full item for UI

    if (pickerKey === "team") {
      trigger({ teamId: item._id })
      setTId(item._id)
    };
    if (pickerKey === "player") {
      setPId(item._id)
    };

    setActivePicker(null); // close modal
  };


  const handleClear = (pickerKey: Exclude<ActivePicker, null>) => {
    const rhfField = pickerKeyToField[pickerKey];

    setValue(rhfField as any, "" as any, { shouldValidate: false });
    setSelected(prev => ({ ...prev, [pickerKey]: null }));

    if (pickerKey === "team") {
      setTId("");
      (["team"] as const).forEach(f => {
        setValue(pickerKeyToField[f] as any, "");
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
    if (pickerKey === "player") {
      setPId("");
      (["player"] as const).forEach(f => {
        setValue(pickerKeyToField[f] as any, "");
        setSelected(prev => ({ ...prev, [f]: null }));
      });
    }
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    team: { title: "Select Tournament", items: matchTeams, isLoading: mLoading },
    player: { title: "Select M.O.M", items: matchPlayer, isLoading: pLoading }
  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Match result based on innings"
        title="Create Match Result"
        subtitle="Enter valid data"
      />
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto space-y-6"
        >
          <EntityPickerInput
            name="teamId"
            label="Team"
            placeholder="Select a team"
            selected={selected.team}        // shows tournamentName
            onPick={() => setActivePicker("team")}
            onClear={() => handleClear("team")}
          />
          <EntityPickerInput
            name="manOfTheMatch"
            label="Man Of The Match"
            placeholder="Pick M.O.M"
            selected={selected.player}        // shows tournamentName
            onPick={() => setActivePicker("player")}
            onClear={() => handleClear("player")}
          />
          <TextInput
            name="matchReport"
            label="Match Report"
            placeholder="Write match report"
            type="text"
          />
          <div className="pt-6 flex justify-center">
            <Buttons
              className="px-8 py-2 rounded-md"
              iconLeft={<SquarePen />}
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              Create Result
            </Buttons>
          </div>
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
}

export default MatchResult