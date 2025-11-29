import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { fontStyle } from "../../utils/ClassUtils";
import { useGetTournamentDetailsQuery, useUpdateTournamentDetailsMutation } from "../../features/tournament/tournamentApi";
import { useForm } from "react-hook-form";
import { tournamentDetailsUpdateSchema, TUpdateTournamentDetails } from "../../utils/schema/tournamentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import { ballTypeOption, formatOption, tournamentTypeOption } from "./constant";
import TextAreaInput from "../../component/common/input/TextAreaInput";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";
import { useEffect } from "react";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";

const UpdateDetails = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();
  // extract id from params
  const { id } = useParams();

  // fetch tournament details
  const { data } = useGetTournamentDetailsQuery(id as string);

  const tournament = data?.data;

  // update url 
  const [updateTournamentDetails, { isLoading }] = useUpdateTournamentDetailsMutation();

  // method for update tournament details
  const methods = useForm<TUpdateTournamentDetails>({
    resolver: zodResolver(tournamentDetailsUpdateSchema),
    mode: "onSubmit"
  });


  useEffect(() => {
    if (tournament) {
      methods.reset({
        tournamentType: tournament.tournamentType,
        format: tournament.format,
        ballType: tournament.ballType,
        tournamentName: tournament.tournamentName,
        matchOver: tournament.matchOver,
        entryFee: tournament.entryFee,
        champion: tournament.champion,
        runnerUp: tournament.runnerUp,
        thirdPlace: tournament.thirdPlace,
        description: tournament.description
      })
    }
  }, [data])


  const handleSubmit = async (data: TUpdateTournamentDetails) => {
    const loadingId = LoadingToast({ msg: "Updating Tournament details" });

    try {
      await updateTournamentDetails({
        id,
        data
      });

      toast.dismiss(loadingId);
      SuccessToast({ msg: "Blog Update Successfully" })
      methods.reset();
      navigate(`/dashboard/tournament/details/${id}`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Tournament details Update Failed!" })
    }
  }


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      <div className="space-y-3 text-center my-6">
        <h1 className={`${fontStyle.pageTitle} text-font`}>Update Tournament Detais</h1>
        <p className="text-subtext text-sm max-w-xl mx-auto">
          Edit your tournament with details like format, teams, and prizes.
        </p>
      </div>
      {/* forms */}
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg"
        >
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
              iconLeft={<Edit2 size={15}/>}
              variant="primary"
              disabled={isLoading}
            >
              Create Tournament
            </Buttons>
          </div>
        </FormContainer>
      </SectionLayout>


    </PageLayout>
  );
};

export default UpdateDetails;