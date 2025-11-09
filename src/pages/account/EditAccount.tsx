import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { fontStyle } from "../../utils/ClassUtils";
import Buttons from "../../component/common/Buttons";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import Tooltip from "../../component/ui/Tooltip";
import { Link } from "react-router-dom";
import { useEditAccountDetailsMutation } from "../../features/account/accountApi";

const EditAccount = () => {

    const { data: account } = useCurrentUserQuery();

    const {} = useEditAccountDetailsMutation();

    let content = (
        <SectionLayout className="flex flex-col items-center text-center gap-1 md:gap-0">
            <h1 className={`${fontStyle.pageTitle} text-font`}>Edit Account</h1>

            {/* photo */}
            <div className="mt-6 relative group">
                <img
                    src={account?.photo}
                    alt={`${account?.name} profile`}
                    className="h-32 w-32 rounded-full border-4 border-primary object-cover shadow-md transition-transform duration-200 group-hover:scale-[1.03]"
                    loading="lazy"
                />
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

            {/* divider */}
            <div className="my-6 w-full border-t border-border"></div>

            {/* navigation actions */}

            <div className="flex flex-col w-full max-w-xs gap-3">
                <Link to="/dashboard/editAccount/photo">
                    <Buttons className="rounded w-full" variant="primary" size="sm">
                        Update Profile Photo
                    </Buttons>
                </Link>
                <Link to="/dashboard/editAccount/details">
                    <Buttons className="rounded w-full" variant="primary" size="sm">
                        Edit Details
                    </Buttons>
                </Link>


                {/* disabled */}

                <Tooltip content="Locked for project roles" position="top">
                    <Buttons className="rounded w-full" variant="secondary" size="sm" disabled>
                        Modify Role (Locked)
                    </Buttons>
                </Tooltip>

                <Tooltip content="Locked for security" position="top">
                    <Buttons className="rounded w-full" variant="secondary" size="sm" disabled>
                        Change Email (Locked)
                    </Buttons>
                </Tooltip>
                <Tooltip position="top" content="InProgress">
                    <Buttons className="rounded w-full" variant="secondary" size="sm">
                        Change Password (Beta)
                    </Buttons>
                </Tooltip>
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

export default EditAccount