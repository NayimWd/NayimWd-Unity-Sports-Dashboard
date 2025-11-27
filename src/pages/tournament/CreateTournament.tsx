import { useNavigate } from "react-router-dom";
import FormContainer from "../../component/common/Form/FormContainer";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import { tournamentTypeOption, ballTypeOption, formatOption } from "./constant";
import { useForm } from "react-hook-form";
import { createTournamentSchema, TCreateTournament } from "../../utils/schema/tournamentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../component/common/input/TextInput";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import DateInput from "../../component/common/input/DateInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import TextAreaInput from "../../component/common/input/TextAreaInput";
import { extractFormData } from "../../utils/extractFormData";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";
import SectionLayout from "../../component/layout/SectionLayout";

const CreateTournament = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  const method = useForm<TCreateTournament>({
    resolver: zodResolver(createTournamentSchema),
    mode: "onSubmit",
  });

  const handleSubmit = async (data: TCreateTournament) => {
    try {
      const formData = extractFormData(data);
      console.log(formData);
    } catch (error) { }
  };

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      <div className="space-y-3 text-center my-6">
        <h1 className={`${fontStyle.pageTitle} text-font`}>Create Tournament</h1>
        <p className="text-subtext text-sm max-w-xl mx-auto">
          Setup your tournament with details like format, dates, teams, and prizes.
        </p>
      </div>
      <SectionLayout>
        <FormContainer
          methods={method}
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto space-y-10"
        >
          {/*  Photo */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-font">Tournament Cover</h3>
            <p className="text-subtext text-sm">
              Upload a banner or poster-style image for the tournament.
            </p>
            <PhotoInput label="Tournament Photo" name="photo" />
          </section>

          {/*  Basic Info */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-font">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DropdownInput
                label="Tournament Type"
                name="tournamentType"
                placeholder="Pick a type"
                options={tournamentTypeOption}
              />
              <DropdownInput
                label="Tournament Format"
                name="format"
                placeholder="Pick a format"
                options={formatOption}
              />
              <DropdownInput
                label="Ball Type"
                name="ballType"
                placeholder="Pick ball type"
                options={ballTypeOption}
              />
            </div>

            <TextInput
              label="Tournament Name"
              name="tournamentName"
              placeholder="Enter tournament name"
            />

            <TextInput
              label="Match Over"
              name="matchOver"
              placeholder="How many overs per match?"
              type="number"
            />
          </section>

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
            </div>
          </section>

          {/*  Fees & Rewards */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-font">
              Entry & Prize Distribution
            </h3>

            <TextInput
              label="Entry Fee"
              name="entryFee"
              placeholder="Enter entry fee amount"
              type="number"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput
                label="Champion Prize"
                name="champion"
                placeholder="Winning amount"
              />
              <TextInput
                label="Runner-Up Prize"
                name="runnerUp"
                placeholder="Runner-up amount"
              />
              <TextInput
                label="Third Place Prize"
                name="thirdPlace"
                placeholder="Third place amount"
              />
            </div>
          </section>

          {/* Description */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-font">Tournament Description</h3>
            <TextAreaInput
              label=""
              name="description"
              placeholder="Describe details, rules, schedules, teams, etc..."
            />
          </section>

          <div className="pt-6 flex justify-center">
            <Buttons
              className="px-8 py-2 rounded-md"
              iconLeft={<Edit2 />}
              variant="primary"
            >
              Create Tournament
            </Buttons>
          </div>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  );
};

export default CreateTournament;
