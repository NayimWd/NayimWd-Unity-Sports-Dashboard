import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTournamentSchema } from "../../utils/schema/tournamentSchema";
import DropdownInput from "../../component/common/input/DropdownInput";
import { matchNumbers, matchRound } from "./formHelper/formUtils";
import { useForm } from "react-hook-form";
import DateInput from "../../component/common/input/DateInput";
import TextInput from "../../component/common/input/TextInput";
import { useState } from "react";
import PageHeader from "../../component/ui/PageHeader";


// shape fetched data
interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
};

// currently open picker
type ActivePicker =
  | "tournament"
  | "venue"
  | "teamA"
  | "teamB"
  | "matchA"
  | "matchB"
  | null;

const CreateScheduleR1 = () => {
 const goBack = useGoBack();


 // state for select display object, for pick and send id for form
 const [selected, setSelected] = useState<Record<string, PickerItem | null>>({
    tournament: null,
    venue: null,
    teamA: null,
    teamB: null,
    matchA: null,
    matchB: null,
 })

 const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const method = useForm({
         resolver: zodResolver(createTournamentSchema),
             mode: "onSubmit",
       });
  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
       <PageHeader
        topTitle="· Schedule Setup ·"
        title="Create Match Schedule for Qualifier Round"
        subtitle="Fill in the details to schedule a new match"
      />
      <SectionLayout>
                <FormContainer
                    methods={method}
                    onSubmit={()=>{}}
                    className="max-w-5xl mx-auto space-y-10"
                >
                    <DropdownInput
                    label="Select Round"
                    name="round"
                    placeholder="Pick a round"
                    options={matchRound}
                    />
                    <DropdownInput
                    label="Select Match Number"
                    name="match"
                    placeholder="Pick match number"
                    options={matchNumbers}
                    />
                    {/*  Dates */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-font">Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DateInput
                label="Starting Date"
                name="startDate"
                placeholder="Pick start date"

              />
              <DateInput
                label="End Date"
                name="endDate"
                placeholder="Pick end date"
              />
              <DateInput
                label="Registration Deadline"
                name="registrationDeadline"
                placeholder="Pick last registration date"
              />
              {/* tournament id need to pass here, that id need to be fetch, 
                i need to make a ui so that it has a option to click, after click it will show current tournament, with that tournament list user will click and form will fill that clicked tournament id, same task need to do with venue, matchA, matchB, teamA, teamB
              */}
              <TextInput
                label="Select Tournament"
                name="tournament"
                placeholder="Select Tournament"
                type="text"
              />
            </div>

          </section>
                </FormContainer>
            </SectionLayout>
      </PageLayout>
  )
}

export default CreateScheduleR1;