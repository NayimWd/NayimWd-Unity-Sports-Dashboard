import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout"
import PageHeader from "../../component/ui/PageHeader";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { useMatchTeamsQuery } from "../../features/match/matchApi";
import { useNavigate, useParams } from "react-router-dom";
import { IMatchTeamSearch } from "../../utils/types/matchTypes";
import PickerModal from "../../component/ui/modal/PickerModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInningsFormData, createInningsSchema } from "../../utils/schema/matchSchema";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import { inningsNumber, wicketOption } from "./constant";
import TextInput from "../../component/common/input/TextInput";
import Buttons from "../../component/common/Buttons";
import { SquarePen } from "lucide-react";
import { useCreateInningsMutation } from "../../features/innings/inningsApi";
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
  | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

const normalizeTeam = (t: IMatchTeamSearch): PickerItem => ({
  _id: t._id, name: t.teamName, photo: t.teamLogo
});

// pickerKey → RHF field name
const pickerKeyToField: Record<Exclude<ActivePicker, null>, string> = {
  team: "teamId",

};

const CreateInnings = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  const { tournamentId, matchId } = useParams();

  const { data: teams, isLoading: mLoading } = useMatchTeamsQuery({ matchId });

  const [createInnings, { isLoading }] = useCreateInningsMutation();

  const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const [_tId, setTId] = useState("");
  const [selected, setSelected] = useState<SelectedMap>({
    team: null,
  });

  // form section 
  const methods = useForm<CreateInningsFormData>({
    resolver: zodResolver(createInningsSchema),
    mode: "onSubmit",
  });
  const { setValue } = methods;

  const onSubmit = async (formData: CreateInningsFormData) => {
    const toastId = LoadingToast({ msg: "Creating..." });

    try {
      await createInnings({
        tournamentId,
        matchId,
        data: formData
      }).unwrap();

      toast.dismiss(toastId);
      SuccessToast({ msg: "Innings creation successful" });
      methods.reset();
      navigate(`/dashboard/match/createResult/${tournamentId}/${matchId}`)

    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Create innings failed!" })
    }
  }

  const matchTeams = teams?.data
    ? [teams.data.teamA, teams.data.teamB].filter(Boolean).map(normalizeTeam)
    : [];

  // ui - show selected state, rhf - extract id
  const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
    const rhfField = pickerKeyToField[pickerKey];

    setValue(rhfField as any, item._id, { shouldValidate: true }); // store _id in RHF
    setSelected(prev => ({ ...prev, [pickerKey]: item }));          // store full item for UI

    if (pickerKey === "team") setTId(item._id);

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
  };

  const pickerConfig: Record<
    Exclude<ActivePicker, null>,
    { title: string; items: PickerItem[]; isLoading: boolean }
  > = {
    team: { title: "Select Tournament", items: matchTeams, isLoading: mLoading },

  };

  const active = activePicker ? pickerConfig[activePicker] : null;

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Innings creation page"
        title="Create Innings"
        subtitle="Pick a team and create innings"
      />

      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EntityPickerInput
              name="teamId"
              label="Team"
              placeholder="Select a team"
              selected={selected.team}        // shows tournamentName
              onPick={() => setActivePicker("team")}
              onClear={() => handleClear("team")}
            />
            <DropdownInput
              label="Innings Number"
              name="inningsNumber"
              placeholder="Pick innings number"
              options={inningsNumber}
            />

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropdownInput
              label="Innings wicket"
              name="wicket"
              placeholder="Pick innings wicket"
              options={wicketOption}
            />
            <TextInput
              label="Team Runs"
              name="runs"
              placeholder="write innings runs"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Match Over"
              name="over"
              placeholder="write innings over"
              type="number"
            />
            <TextInput
              label="Match wide"
              name="wide"
              placeholder="write total wide"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="No Balls"
              name="noBalls"
              placeholder="write total noBalls"
              type="number"
            />
            <TextInput
              label="bye run"
              name="byes"
              placeholder="write total bye"
              type="number"
            />
          </div>
          <div className="pt-6 flex justify-center">
            <Buttons
              className="px-8 py-2 rounded-md"
              iconLeft={<SquarePen />}
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              Create Innings
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

export default CreateInnings