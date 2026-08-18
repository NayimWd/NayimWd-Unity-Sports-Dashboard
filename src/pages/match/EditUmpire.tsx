import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUmpireSearch } from "../../utils/types/matchTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUmpireFormData, updateUmpireSchema } from "../../utils/schema/matchSchema";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import EntityPickerInput from "../../component/common/input/EntityPickerInput";
import PickerModal from "../../component/ui/modal/PickerModal";
import { useMatchUmpireListQuery, useUpdateUmpireMutation } from "../../features/match/matchApi";
import { useUmpireListQuery } from "../../features/auth/authApi";
import { LoadingToast, ErrorToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import Buttons from "../../component/common/Buttons";
import { PlusCircle } from "lucide-react";

// interface for list items to normalize
interface PickerItem {
    _id: string;
    name: string;
    photo?: string;
}
// item category
type ActivePicker =
    | "umpire1"
    | "umpire2"
    | "umpire3"
    | null;

type SelectedMap = Record<Exclude<ActivePicker, null>, PickerItem | null>;

const normalizeUmpire = (u: IUmpireSearch): PickerItem => ({
    _id: u._id, name: u.name,
});

// pickerKey → RHF field name
const pickerKeyToField: Record<Exclude<ActivePicker, null>, string> = {
    umpire1: "umpire1",
    umpire2: "umpire2",
    umpire3: "umpire3",
};

const EditUmpire = () => {
    const goback = useGoBack();
    const {  tournamentId,  matchId } = useParams();

    const navigate = useNavigate();

    const [activePicker, setActivePicker] = useState<ActivePicker>(null);
    const [selected, setSelected] = useState<SelectedMap>({
        umpire1: null, umpire2: null, umpire3: null,
    });


    const methods = useForm<UpdateUmpireFormData>({
        resolver: zodResolver(updateUmpireSchema),
        mode: "onSubmit",
    });
    const { setValue } = methods;

    // fetch match umpires
    const { data: existingUmpires, isLoading: umpireListLoading } = useMatchUmpireListQuery(
        { matchId },
        { skip: !matchId }
    );

    // pre-populate form with existing umpires
    useEffect(() => {
        const umpires = existingUmpires?.data?.umpires;
        if (!umpires) return;

        const map = [
            { key: "umpire1" as const, data: umpires.firstUmpire },
            { key: "umpire2" as const, data: umpires.secondUmpire },
            { key: "umpire3" as const, data: umpires.thirdUmpire },
        ];

        map.forEach(({ key, data }) => {
            if (!data) return;
            const item: PickerItem = { _id: data._id, name: data.name };
            setValue(pickerKeyToField[key] as any, data._id, { shouldValidate: false });
            setSelected(prev => ({ ...prev, [key]: item }));
        });
    }, [existingUmpires]);

    // fetch all umpire list
    const { data: umpireRes, isLoading: uLoading } = useUmpireListQuery(undefined);
    const umpires = ((umpireRes as any)?.data?.umpires ?? []).map(normalizeUmpire);
    // update umpire mutaion
    const [updateUmpire, { isLoading }] = useUpdateUmpireMutation();

    const handleSelect = (pickerKey: Exclude<ActivePicker, null>, item: PickerItem) => {
        const rhfField = pickerKeyToField[pickerKey];

        setValue(rhfField as any, item._id, { shouldValidate: true }); // store _id in RHF
        setSelected(prev => ({ ...prev, [pickerKey]: item }));          // store full item for UI


        setActivePicker(null); // close modal
    };

    const onSubmit = async (data: UpdateUmpireFormData) => {
        const umpireIds = Object.values(data);
        const toastId = LoadingToast({ msg: "Updating umpires..." });
        try {
            await updateUmpire({ tournamentId, matchId, data: {umpireIds}
             }).unwrap();
            toast.dismiss(toastId);
            SuccessToast({ msg: "Umpires updated successfully" });
            navigate("/dashboard/match/manage")
        } catch {
            toast.dismiss(toastId);
            ErrorToast({ msg: "Failed to update umpires" });
        }
    };

    const pickerConfig: Record<
        Exclude<ActivePicker, null>,
        { title: string; items: PickerItem[]; isLoading: boolean }
    > = {
        umpire1: { title: "Select Umpire 1", items: umpires, isLoading: uLoading },
        umpire2: { title: "Select Umpire 2", items: umpires, isLoading: uLoading },
        umpire3: { title: "Select Umpire 3", items: umpires, isLoading: uLoading },
    };

    const active = activePicker ? pickerConfig[activePicker] : null;


    return (
        <PageLayout>
            <BackButton onClick={goback}>Back</BackButton>
            <PageHeader
                topTitle="Edit match"
                title="Update Umpire"
                subtitle="Select umpire for the match"
            />

            <SectionLayout>
                {/* skeleton */}
                {umpireListLoading && (
                    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                        {Array(3).fill(null).map((_, i) => (
                            <div key={i} className="h-10 rounded-lg bg-subSurface" />
                        ))}
                    </div>
                )}
                <FormContainer
                    methods={methods}
                    onSubmit={onSubmit}
                    className="max-w-2xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <EntityPickerInput
                            name="umpire1"
                            label="First Umpire"
                            placeholder="Select umpire"
                            selected={selected.umpire1}
                            onPick={() => setActivePicker("umpire1")}

                        />
                        <EntityPickerInput
                            name="umpire2"
                            label="Second Umpire"
                            placeholder="Select umpire"
                            selected={selected.umpire2}
                            onPick={() => setActivePicker("umpire2")}

                        />
                        <EntityPickerInput
                            name="umpire3"
                            label="Third Umpire (optional)"
                            placeholder="Select umpire"
                            selected={selected.umpire3}
                            onPick={() => setActivePicker("umpire3")}

                        />
                    </div>
                    <div className="flex justify-end mt-6 pt-6 border-t border-border">
                    <Buttons iconLeft={<PlusCircle size={16}/>} className="rounded-md" disabled={isLoading} loading={isLoading}>
                        {isLoading ? "Updating" : "Update Umpire"}
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

export default EditUmpire