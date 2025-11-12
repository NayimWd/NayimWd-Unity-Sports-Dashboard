import { Link } from "react-router-dom"
import Buttons from "../../component/common/Buttons"
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { useCurrentUserQuery } from "../../features/auth/authApi"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils"
import { formatDate } from "../../utils/timeFormat"

const Account = () => {

  const { data: account } = useCurrentUserQuery();

  let content = (
    <SectionLayout className="flex flex-col gap-1 md:gap-0 items-center text-center">
      <h1 className={`${fontStyle.pageTitle} text-font`}>My Account</h1>

      {/* photo */}
      <div className="mt-6 relative group">
        <img
          src={account?.photo}
          alt={`${account?.name} profile`}
          className="h-32 w-32 rounded-full border-4 border-primary object-cover shadow-md transition-transform duration-200 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute -bottom-2 right-0 bg-primary text-bg rounded-full text-xs px-2 py-[2px] shadow">
          Online
        </div>
      </div>

      {/* username */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-font">{account?.name}</h2>
        <p className="text-sm text-primary">@{account?.name?.toLowerCase()}</p>
      </div>

      {/* badge */}
      <div className="mt-3">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary font-medium capitalize">
          {account?.role}
        </span>
      </div>

      {/* devider */}
      <div className="my-6 w-full border-t border-border"></div>

      {/* info */}
      <div className="flex flex-col gap-5 w-full max-w-md mx-auto text-left">
        <div>
          <p className="text-xs text-primary uppercase tracking-wide mb-1">Email</p>
          <p className="text-font text-sm truncate">{account?.email}</p>
        </div>

        <div>
          <p className="text-xs text-primary uppercase tracking-wide mb-1">Phone</p>
          <p className="text-font text-sm">{account?.phoneNumber}</p>
        </div>

        <div>
          <p className="text-xs text-primary uppercase tracking-wide mb-1">Member Since</p>
          <p className="text-font text-sm">{formatDate(account?.createdAt ?? '')}</p>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Link to="/dashboard/editAccount">
          <Buttons className="rounded" variant="primary" size="sm">Edit Account</Buttons>
        </Link>
        <Link to="/dashboard/editAccount/changePassword">
          <Buttons className="rounded" variant="danger" size="sm">Change Password </Buttons>
        </Link>

      </div>
    </SectionLayout>
  )


  return (
    <PageLayout>
      <BackButton onClick={useGoBack()}>Go Back</BackButton>
      {
        content
      }
    </PageLayout>
  )
}

export default Account