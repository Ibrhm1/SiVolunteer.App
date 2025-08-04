import Calender from "@/components/UI/Calender";
import useViewDashboardMember from "./useViewDashboardAdmin";
import { Skeleton } from "@heroui/react";

const ViewDashboardMember = () => {
  const { dataProfile, isPendingDataProfile } = useViewDashboardMember();

  return (
    <>
      <Skeleton
        className="my-4 h-8 rounded-lg lg:w-1/2"
        isLoaded={!isPendingDataProfile}
      >
        <h1 className="mb-4 text-xl font-bold lg:text-2xl">
          Hai, {dataProfile?.fullName}
        </h1>
      </Skeleton>
      <main className="flex max-h-screen flex-col items-center gap-3 md:flex-row md:items-start md:gap-3">
        <div>
          <Calender />
        </div>
      </main>
    </>
  );
};

export default ViewDashboardMember;
