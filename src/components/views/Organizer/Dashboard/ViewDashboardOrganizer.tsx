import React from "react";
import useViewDashboardOrganizer from "./useViewDashboardOrganizer";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Calender from "@/components/UI/Calender";

const ViewDashboardOrganizer = () => {
  const {
    totalData,
    dataProfile,
    isPendingDataProfile,
    dataEvents,
    isLoadingEvents,
  } = useViewDashboardOrganizer();

  return (
    <>
      <Skeleton
        className="my-4 h-8 rounded-lg lg:w-1/2"
        isLoaded={!isPendingDataProfile}
      >
        <h1 className="text-xl font-bold lg:text-2xl">
          Welcome, {dataProfile?.organizerName}
        </h1>
      </Skeleton>
      <main className="flex max-h-screen flex-col items-center gap-3 md:flex-row md:items-start md:gap-3">
        <div className="flex h-fit flex-wrap justify-center gap-2 md:w-1/2 md:justify-start lg:gap-x-3 lg:gap-y-2">
          {totalData.map((item) => (
            <Skeleton
              className="h-28 rounded-xl"
              isLoaded={!isLoadingEvents}
              key={item.title}
            >
              <Card className="h-fit w-[250px]">
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

export default ViewDashboardOrganizer;
