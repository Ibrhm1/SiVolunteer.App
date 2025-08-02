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

const ViewDashboardMember = () => {
  const session = useSession();
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = useState(defaultDate);
  const now = today(getLocalTimeZone());

  return (
    <>
      <h1 className="text-xl font-bold lg:text-2xl">
        Hai, {session.data?.user?.email}
      </h1>
      <main className="flex max-h-screen flex-col items-center gap-3 md:flex-row md:items-start md:gap-16">
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

export default ViewDashboardMember;
