import {
  Button,
  Calendar,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useViewDashboardAdmin from "./useViewDashboardAdmin";

const ViewDashboardAdmin = () => {
  const session = useSession();
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = useState(defaultDate);
  const now = today(getLocalTimeZone());
  const { totalData, isLoadingEvents, isLoadingMember, isLoadingOrganizer } =
    useViewDashboardAdmin();

  return (
    <>
      <Skeleton
        className="my-4 h-8 rounded-xl lg:w-1/2"
        isLoaded={!isLoadingEvents && !isLoadingMember && !isLoadingOrganizer}
      >
        <h1 className="text-2xl font-bold">Hai, {session.data?.user?.email}</h1>
      </Skeleton>
      <main className="flex max-h-screen flex-col items-center gap-3 md:flex-row md:items-start md:gap-16">
        <div className="flex h-fit flex-wrap justify-center gap-2 md:w-1/2 md:justify-start lg:gap-x-3 lg:gap-y-2">
          {totalData.map((item) => (
            <Skeleton
              className="h-28 rounded-xl"
              isLoaded={
                !isLoadingEvents && !isLoadingMember && !isLoadingOrganizer
              }
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
                  <h3 className="text-foreground-500 mb-3 text-center text-2xl font-bold">
                    {item.value}
                    <span className="text-medium ml-1">{item.detail}</span>
                  </h3>
                </CardBody>
              </Card>
            </Skeleton>
          ))}
        </div>
        <div>
          <Calendar
            value={value}
            onChange={setValue}
            focusedValue={value}
            onFocusChange={setValue}
            aria-label="Date (Presets)"
            showMonthAndYearPickers
            bottomContent={
              <Button
                onPress={() => setValue(now)}
                size="sm"
                color="default"
                variant="flat"
                className="w-full"
              >
                Today
              </Button>
            }
          />
        </div>
      </main>
    </>
  );
};

export default ViewDashboardAdmin;
