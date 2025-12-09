import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"

const CreateMatch = () => {
  const goBack = useGoBack();
    // qualifier round
  return (
    <PageLayout>
      <BackButton onClick={goBack}>Go Back</BackButton>
    </PageLayout>
  )
}

export default CreateMatch