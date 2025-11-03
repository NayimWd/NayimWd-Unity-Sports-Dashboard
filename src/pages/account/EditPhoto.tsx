import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"


const EditPhoto = () => {
  return (
    <PageLayout>
        <BackButton onClick={useGoBack()}>Go Back</BackButton>
        EditPhoto
    </PageLayout>
  )
}

export default EditPhoto