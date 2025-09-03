import Calender from "@/components/UI/Calender";
import useViewDashboardMember from "./useViewDashboardAdmin";
import { Skeleton } from "@heroui/react";

const ViewDashboardMember = () => {
  const { dataProfile, isPendingDataProfile } = useViewDashboardMember();

  return (
    <>
      <Skeleton
        className="my-4 h-8 rounded-lg xl:w-1/2"
        isLoaded={!isPendingDataProfile}
      >
        <h1 className="mb-4 text-xl font-bold lg:text-2xl">
          Hai, {dataProfile?.fullName}
        </h1>
      </Skeleton>
      <main className="mt-8 flex max-h-screen flex-col items-center gap-3 md:mt-0 md:items-start md:gap-3">
        <div>
          <Calender />
        </div>
      </main>
    </>
  );
};

export default ViewDashboardMember;
