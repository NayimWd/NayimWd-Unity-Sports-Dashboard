import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useProfileStragegy } from "./component/helper/ProfileConfit";
import { Suspense } from "react";
import ProfileSkeleton from "./component/ProfileSkeleton";



const MyProfile = () => {
  const { data: user, isLoading: userLoading } = useCurrentUserQuery();

  const { ProfileComponent } = useProfileStragegy(user?.role);

  return (
    <PageLayout>
      <BackButton link="/dashboard">Go Home</BackButton>

      <div className="max-w-2xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

        {/* Header */}
        <div>
          <h1 className="text-xl font-medium text-font">My Profile</h1>
          <p className="text-sm text-muted mt-0.5">
            Your {user?.role} profile overview.
          </p>
        </div>
        {/* Profile section */}

        {userLoading && <ProfileSkeleton />}

        {!userLoading && ProfileComponent && (
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileComponent />
          </Suspense>
        )}

      </div>
    </PageLayout>
  )
}

export default MyProfile;