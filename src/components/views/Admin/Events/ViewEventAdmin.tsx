import { Chip, Image } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DataTable from "@/components/UI/DataTable";
import useViewEventAdmin from "./useViewEventAdmin";
import { COLUMN_LIST_EVENTS } from "./ListEvent";
import DropdownAction from "@/components/common/DropdownAction";

const ViewEventAdmin = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    dataEventsWithOrganizer,
  } = useViewEventAdmin();

  const { setUrl } = useChangeUrl();

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
              className="aspect-video w-40 object-cover"
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue === true ? "success" : "warning"}
              variant="flat"
            >
              {cellValue === true ? "Publish" : "Private"}
            </Chip>
          );
        case "isOnline":
          return (
            <Chip
              color={cellValue === true ? "primary" : "secondary"}
              variant="flat"
            >
              {cellValue === true ? "Online" : "Offline"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              showButtonDelete={false}
              onPressButtonDetail={() => push(`/admin/events/${event._id}`)}
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
          columns={COLUMN_LIST_EVENTS}
          emptyContent="No event found"
          data={dataEventsWithOrganizer || []}
          totalPage={dataEvents?.pagination.totalPages}
          isLoading={isLoadingEvents || isRefetchingEvents}
        />
      )}
    </section>
  );
};

export default ViewEventAdmin;
