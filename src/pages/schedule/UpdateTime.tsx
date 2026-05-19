import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import PageHeader from "../../component/ui/PageHeader";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton"
import { useUpdateScheduleTimeMutation } from "../../features/schedule/scheduleApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateScheduleTimeData, updateSheduleTimeSchema } from "../../utils/schema/scheduleSchema";
import { LoadingToast, SuccessToast, ErrorToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import DateInput from "../../component/common/input/DateInput";
import TextInput from "../../component/common/input/TextInput";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";

const UpdateTime = () => {
  const goBack = useGoBack();

  const { scheduleId } = useParams();

  const navigate = useNavigate();

  const [updateScheduleTime, { isLoading }] = useUpdateScheduleTimeMutation();

  const methods = useForm<UpdateScheduleTimeData>({
    resolver: zodResolver(updateSheduleTimeSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: UpdateScheduleTimeData) => {
    const toastId = LoadingToast({ msg: "updatimg..." });


    try {
      updateScheduleTime({
        scheduleId,
        data: {
          newMatchDate: data.matchDate,
          newMatchTime: data.matchTime,
          newEndTime: data.endTime,
        }
      }).unwrap();

      toast.dismiss(toastId);
      SuccessToast({ msg: "Schedule creation successful" });
      methods.reset();
      navigate("/dashboard/schedule/manage");

    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Create schedule failed!" })
    }
  };

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="schedule"
        title="Update Schedule date & time"
        subtitle="Enter valid data"
      />

      <SectionLayout>

        <FormContainer
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                label="Match Date"
                name="matchDate"
                placeholder="DD-MM-YYYY"
                type="text"
              />
              <TextInput
                label="Match Time"
                name="matchTime"
                placeholder="e.g. 3pm"
                type="text"
              />
              <TextInput
                label="Estimated End Time"
                name="endTime"
                placeholder="e.g. 4pm"
                type="text"
              />

            </div>
            <Buttons disabled={isLoading} iconRight={<Edit2 size={16} />} variant="primary" className=" rounded">Update</Buttons>
          </div>
        </FormContainer>

      </SectionLayout>

    </PageLayout>
  )
}

export default UpdateTime