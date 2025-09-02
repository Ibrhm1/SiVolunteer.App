import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import useViewDashboardAdmin from "./useViewDashboardAdmin";
import Calender from "@/components/UI/Calender";

const ViewDashboardAdmin = () => {
  const {
    dataProfile,
    isPendingDataProfile,
    totalData,
    isLoadingEvents,
    isLoadingMember,
    isLoadingOrganizer,
  } = useViewDashboardAdmin();

  return (
    <>
      <Skeleton
        className="my-4 h-8 rounded-xl lg:w-1/2"
        isLoaded={!isPendingDataProfile}
      >
        <h1 className="text-xl font-bold lg:text-2xl">
          Hai, {dataProfile?.data?.data.fullName}
        </h1>
      </Skeleton>
      <main className="flex flex-col items-center justify-center gap-8 md:items-start">
        <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-3 md:gap-y-5 lg:flex-row">
          {totalData.map((item) => (
            <Skeleton
              className="h-28 rounded-xl"
              isLoaded={
                !isLoadingEvents && !isLoadingMember && !isLoadingOrganizer
              }
              key={item.title}
            >
              <Card className="h-30 w-[250px]" isHoverable shadow="sm">
                <CardHeader className="bg-default-100 flex items-center justify-between">
                  <h3 className="text-foreground-900 text-xl font-bold">
                    {item.title}
                  </h3>
                  {item.icon}
                </CardHeader>
                <CardBody className="py-0 pb-2">
                  <h3 className="text-foreground-500 my-2 text-center text-2xl font-bold">
                    {item.value}
                    <span className="text-medium ml-1">{item.detail}</span>
                  </h3>
                </CardBody>
              </Card>
            </Skeleton>
          ))}
        </div>
        <div>
          <Calender />
        </div>
      </main>
    </>
  );
};

export default ViewDashboardAdmin;
