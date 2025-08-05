import DataTable from "@/components/UI/DataTable";
import useViewMyEvents from "./useViewMyEvents";
import { COLUMN_LIST_MYEVENTS } from "./ListTableMyEvents";
import { Chip, Image, useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropdownAction from "@/components/common/DropdownAction";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import dayjs from "dayjs";
import ViewAddMyEventModal from "./AddMyEventModal";
import ViewDeleteMyEventModal from "./DeleteMyEventModal";

const ViewMyEvents = () => {
  const addMyEventModal = useDisclosure();
  const deleteMyEventModal = useDisclosure();
  const { push, query, isReady } = useRouter();
  const { setUrl } = useChangeUrl();
  const {
    selectedId,
    setSelectedId,
    dataMyEvents,
    isPendingMyEvents,
    refetchMyEvents,
  } = useViewMyEvents();

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
              alt="imageEvent"
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
            <Chip color={cellValue ? "success" : "warning"} variant="flat">
              {cellValue ? "Publish" : "Private"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteMyEventModal.onOpen();
              }}
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
          buttonTopContentLabel="Create My Event"
          columns={COLUMN_LIST_MYEVENTS}
          data={dataMyEvents || []}
          emptyContent="Event is empty"
          isLoading={isPendingMyEvents}
          onClickButtonTopContent={addMyEventModal.onOpen}
          renderCell={renderCell}
          totalPage={dataMyEvents?.pagination?.totalPage || 0}
        />
      )}
      <ViewAddMyEventModal
        {...addMyEventModal}
        refecthMyEvent={refetchMyEvents}
      />
      <ViewDeleteMyEventModal
        {...deleteMyEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refecthMyEvent={refetchMyEvents}
      />
    </section>
  );
};

export default ViewMyEvents;
