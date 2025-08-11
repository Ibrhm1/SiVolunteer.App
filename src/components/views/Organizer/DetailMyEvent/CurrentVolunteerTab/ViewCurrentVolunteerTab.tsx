import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import useViewCurrentVolunteerTab from "./useViewCurrentVolunteerTab";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_CURRETVOLUNTEER } from "./ListTableCurrentVolunteer";
import { Key, ReactNode, useCallback, useState } from "react";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { IoMdDoneAll, IoMdTime } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import ViewUpdateStatusModal from "./UpdateStatusModal";
import ViewDeleteEventVolunteerModal from "./DeleteEventVolunteerModal";

const ViewCurrentVolunteerTab = () => {
  const viewUpdateStatusModal = useDisclosure();
  const viewDeleteEventVolunteerModal = useDisclosure();
  const { refetchEventVolunteer, isPendingDataEventVolunteer, mergedData } =
    useViewCurrentVolunteerTab();
  const [selectedDataEventVolunteer, setSelectedDataEventVolunteer] =
    useState<IEventVolunteer | null>(null);
  const [btnValueStatus, setBtnValueStatus] = useState<string>();

  const renderCell = useCallback(
    (eventVolunteer: Record<string, unknown>, columnKey: Key) => {
      const cellValue =
        eventVolunteer[columnKey as keyof typeof eventVolunteer];
      switch (columnKey) {
        case "user":
          return <span className="font-semibold">{cellValue as string}</span>;
        case "status":
          return (
            <Chip
              color={
                cellValue === "accepted"
                  ? "success"
                  : cellValue === "pending"
                    ? "warning"
                    : "danger"
              }
              variant="flat"
              radius="sm"
              className="font-bold"
            >
              {`${cellValue}`}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex gap-[1px]">
              <Tooltip radius="sm" content="Accept" color="success">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="success"
                  onPress={() => {
                    setSelectedDataEventVolunteer(
                      eventVolunteer as IEventVolunteer,
                    );
                    setBtnValueStatus("accepted");
                    viewUpdateStatusModal.onOpen();
                  }}
                >
                  <IoMdDoneAll />
                </Button>
              </Tooltip>
              <Tooltip radius="sm" content="Pending" color="warning">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="warning"
                  onPress={() => {
                    setSelectedDataEventVolunteer(
                      eventVolunteer as IEventVolunteer,
                    );
                    setBtnValueStatus("pending");
                    viewUpdateStatusModal.onOpen();
                  }}
                >
                  <IoMdTime />
                </Button>
              </Tooltip>
              <Tooltip radius="sm" content="Reject" color="danger">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={() => {
                    setSelectedDataEventVolunteer(
                      eventVolunteer as IEventVolunteer,
                    );
                    setBtnValueStatus("rejected");
                    viewUpdateStatusModal.onOpen();
                  }}
                >
                  <GiCancel />
                </Button>
              </Tooltip>
            </div>
          );
        case "delete":
          return (
            <Button
              size="sm"
              color="danger"
              onPress={() => {
                setSelectedDataEventVolunteer(
                  eventVolunteer as IEventVolunteer,
                );
                viewDeleteEventVolunteerModal.onOpen();
              }}
            >
              Delete
            </Button>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <>
      <Card>
        <CardHeader>
          <h1>Current Volunteer</h1>
        </CardHeader>
        <CardBody>
          <DataTable
            showSearch={false}
            showLimit={false}
            columns={COLUMN_LIST_CURRETVOLUNTEER}
            data={mergedData || []}
            emptyContent="Volunteer not found"
            isLoading={isPendingDataEventVolunteer}
            renderCell={renderCell}
            totalPage={1}
          />
        </CardBody>
      </Card>
      <ViewUpdateStatusModal
        {...viewUpdateStatusModal}
        btnValueStatus={btnValueStatus as string}
        refetchEventVolunteer={refetchEventVolunteer}
        selectedDataEventVolunteer={selectedDataEventVolunteer}
        setSelectedDataEventVolunteer={setSelectedDataEventVolunteer}
      />
      <ViewDeleteEventVolunteerModal
        {...viewDeleteEventVolunteerModal}
        refecthEventVolunteer={refetchEventVolunteer}
        selectedDataEventVolunteer={selectedDataEventVolunteer}
        setSelectedDataEventVolunteer={setSelectedDataEventVolunteer}
      />
    </>
  );
};

export default ViewCurrentVolunteerTab;
