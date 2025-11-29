import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { fontStyle } from "../../utils/ClassUtils";
import { useGetTournamentDetailsQuery, useUpdateTournamentDateMutation } from "../../features/tournament/tournamentApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TUpdateTournamentDate, updateTournamentDateSchema } from "../../utils/schema/tournamentSchema";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import DateInput from "../../component/common/input/DateInput";
import { formatDDMMYYYY, parseDMY } from "../../utils/timeFormat";

const UpdateTournamentDate = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();
  // extract id from params
  const { id } = useParams();

  // fetch tournament details
  const { data } = useGetTournamentDetailsQuery(id as string);

  const tournament = data?.data;

  // tournament date update apiSlice
  const [updateTournamentDate, { isLoading }] = useUpdateTournamentDateMutation();

  // method for update date
  const methods = useForm<TUpdateTournamentDate>({
    resolver: zodResolver(updateTournamentDateSchema),
    mode: "onSubmit"
  })

  // set default date
  useEffect(() => {
    if (tournament) {
      methods.reset({
        startDate: parseDMY(tournament.startDate),
        endDate: parseDMY(tournament.endDate),
        registrationDeadline: parseDMY(tournament.registrationDeadline),
      })
    };
  }, [tournament])

  const handleSubmit = async (data: TUpdateTournamentDate) => {
    const loadingId = LoadingToast({ msg: "Updating Tournament details" });

    try {
      const formData = new FormData();

      // extracting data
      if (data.startDate)
        formData.append("startDate", formatDDMMYYYY(data.startDate));

      if (data.endDate)
        formData.append("endDate", formatDDMMYYYY(data.endDate));

      if (data.registrationDeadline)
        formData.append(
          "registrationDeadline",
          formatDDMMYYYY(data.registrationDeadline)
        );


      await updateTournamentDate({
        id,
        data: formData
      }).unwrap();

      toast.dismiss(loadingId);
      SuccessToast({ msg: "Blog Update Successfully" })
      methods.reset();
      navigate(`/dashboard/tournament/manage`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Tournament details Update Failed!" })
    }
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      {/* title  */}
      <div className="space-y-3 text-center my-6">
        <h1 className={`${fontStyle.pageTitle} text-font`}>Update Tournament Detais</h1>
        <p className="text-subtext text-sm max-w-xl mx-auto">
          Edit your tournament with Dates like Start Date, End Date, and Registration Deadline.
        </p>
      </div>
      {/* form section */}
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg"
        >
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
          <div className="pt-6 flex justify-center">
            <Buttons
              className="px-8 py-2 rounded-md"
              iconLeft={<Edit2 size={15} />}
              variant="primary"
              disabled={isLoading}
            >
              Update Date
            </Buttons>
          </div>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default UpdateTournamentDate