import DataTable from "@/components/UI/DataTable";
import useViewMyEvents from "./useViewMyEvents";
import { COLUMN_LIST_MYEVENTS } from "./ListTableMyEvents";
import { Chip, Image } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropdownAction from "@/components/common/DropdownAction";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import dayjs from "dayjs";

const ViewMyEvents = () => {
  const { push, query, isReady } = useRouter();
  const { setUrl } = useChangeUrl();
  const { dataMyEvents, isPendingMyEvents } = useViewMyEvents();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="image"
              width={200}
              height={100}
              className="w-full rounded-lg object-cover"
            />
          );
        case "isOnline":
          return (
            <Chip color={cellValue ? "primary" : "secondary"} variant="flat">
              {cellValue ? "Online" : "Offline"}
            </Chip>
          );
        case "startDate":
          return (
            <Chip color="success" variant="flat">
              {dayjs(`${cellValue}`).format("DD-MMM-YYYY HH:mm:ss")}
            </Chip>
          );
        case "endDate":
          return (
            <Chip color="danger" variant="flat">
              {dayjs(`${cellValue}`).format("DD-MMM-YYYY HH:mm:ss")}
            </Chip>
          );
        case "isPublish":
          return (
            <Chip color={cellValue ? "success" : "danger"} variant="flat">
              {cellValue ? "Publish" : "Private"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              showButtonDelete={false}
              onPressButtonDetail={() =>
                push(`/organizer/my-events/${event._id}`)
              }
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_MYEVENTS}
          emptyContent="Event is empty"
          data={dataMyEvents || []}
          totalPage={dataMyEvents?.pagination?.totalPage || 0}
          isLoading={isPendingMyEvents}
        />
      )}
    </section>
  );
};

export default ViewMyEvents;
