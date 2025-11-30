import PageLayout from "../../component/layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import { useGetTournamentDetailsQuery, useUpdateTournamentStatusMutation } from "../../features/tournament/tournamentApi";
import { TUpdateTournamentStatus, updateTournamentStatusSchema } from "../../utils/schema/tournamentSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import DropdownInput from "../../component/common/input/DropdownInput";
import { statusOption } from "./constant";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import Buttons from "../../component/common/Buttons";
import { TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const UpdateStatus = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();
  // extract id from params
  const { id } = useParams();

  // fetch tournament details
  const { data } = useGetTournamentDetailsQuery(id as string);

  const tournament = data?.data;

  const [updateTournamentStatus, { isLoading }] = useUpdateTournamentStatusMutation();



  // method for update tournament details
  const methods = useForm<TUpdateTournamentStatus>({
    resolver: zodResolver(updateTournamentStatusSchema),
    mode: "onSubmit"
  });



  const handleSubmit = async (data: TUpdateTournamentStatus) => {
    const loadingId = LoadingToast({ msg: "Updating Tournament Status" });

    try {
      await updateTournamentStatus({
        id,
        data: { status: data.status }
      }).unwrap();


      toast.dismiss(loadingId);
      SuccessToast({ msg: "Status Update Successfully" })
      methods.reset();
      navigate(`/dashboard/tournament/manage`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Tournament status Update Failed!" })
    }
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      <div className="space-y-3 text-center my-6">
        <h1 className={`${fontStyle.pageTitle} text-font`}>Update Tournament Status</h1>
        <p className="text-subtext text-sm max-w-xl mx-auto">
          Current status: <span className="text-primary"> {tournament?.status}</span>
        </p>
      </div>
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg"
        >
          <DropdownInput
            label="Tournament Status"
            name="status"
            placeholder={`Current status is: ${tournament?.status}`}
            options={statusOption}
          />
          <div className="pt-6 flex justify-center">
            <Buttons
              className="px-8 py-2 rounded-md"
              iconLeft={<TrendingUp size={15} />}
              variant="primary"
              disabled={isLoading}
            >
              Create Tournament
            </Buttons>
          </div>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default UpdateStatus