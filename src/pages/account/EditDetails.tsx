import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"


const EditDetails = () => {
  return (
    <PageLayout>
     <BackButton onClick={useGoBack()}>Go Back</BackButton>
        EditDetails
    </PageLayout>
  )
}

export default EditDetails