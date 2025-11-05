import { useForm } from "react-hook-form"
import {z} from "zod";
import FormContainer from "../../component/common/Form/FormContainer"
import TextInput from "../../component/common/input/TextInput"
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils"
import Buttons from "../../component/common/Buttons"
import { PenLine } from "lucide-react"


const accountUpdateSchema = z.object({
  Name: z.string(),
  PhoneNumber: z.string()
});

type detailsType = z.infer<typeof accountUpdateSchema>


const EditDetails = () => {


  const method = useForm({

  });

  const handleEdit = () => {

  }

  return (
    <PageLayout>
      <BackButton onClick={useGoBack()}>Go Back</BackButton>
      <SectionLayout>
        <h1 className={`${fontStyle.pageTitle} text-font text-center`}>Edit Account Information</h1>
        <div className="w-full flex justify-center">
          <FormContainer
            methods={method}
            onSubmit={handleEdit}
            className="w-full max-w-[768px] space-y-6 px-0 lg:px-5 rounded-lg"
          >
            <TextInput  label="Edit Name" name="Name" placeholder="Edit Name" />
            <TextInput label="Phone Number" name="Phone Number" placeholder="Edit Phone Number" />
            <Buttons disabled={false} iconRight={<PenLine size={16} />} variant="primary" className="w-full md:w-32 rounded">Update</Buttons>
          </FormContainer>
        </div>
      </SectionLayout>
    </PageLayout>
  )
}

export default EditDetails