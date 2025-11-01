import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { fontStyle } from "../../utils/ClassUtils"

const Account = () => {
  return (
    <PageLayout>
      <h1 className={`${fontStyle.pageTitle} text-font`}>My Account</h1>
      <SectionLayout>
        abc
      </SectionLayout>
    </PageLayout>
  )
}

export default Account