import PageLayout from "../../layout/PageLayout";
import SectionLayout from "../../layout/SectionLayout";
import Skeleton from "../loader/Skeleton";


const CreateTournamentSkeleton = () => {
  return (
    <PageLayout>
      <Skeleton className="h-9 w-28" />

      {/* Header */}
      <div className="space-y-3 text-center my-6">
        <Skeleton className="mx-auto h-8 w-60" />
        <Skeleton className="mx-auto h-4 w-96" />
      </div>

      <SectionLayout>
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Photo Section */}
          <section className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </section>

          {/* Basic Info */}
          <section className="space-y-6">
            <Skeleton className="h-6 w-40" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>

            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </section>

          {/* Dates */}
          <section className="space-y-6">
            <Skeleton className="h-6 w-40" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </section>

          {/* Fees & Rewards */}
          <section className="space-y-6">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-12 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </section>

          {/* Description */}
          <section className="space-y-3">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-32 w-full" />
          </section>

          {/* CTA Button */}
          <div className="pt-6 flex justify-center">
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

export default CreateTournamentSkeleton;
