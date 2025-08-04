import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
} from "@heroui/react";
import useViewCurrentVolunteerTab from "./useViewCurrentVolunteerTab";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_CURRETVOLUNTEER } from "./ListTableCurrentVolunteer";
import { Key, ReactNode, useCallback } from "react";
import Link from "next/link";
import { IEventVolunteer } from "@/types/EventVolunteer";
import { IoDocumentText } from "react-icons/io5";
import { IoMdDoneAll, IoMdTime } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

const ViewCurrentVolunteerTab = () => {
  const { dataEventVolunteer, isPendingDataEventVolunteer, mergedData } =
    useViewCurrentVolunteerTab();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];
      switch (columnKey) {
        case "portfolioUrl":
          return (
            <Button
              as={Link}
              href={cellValue as string}
              size="sm"
              isIconOnly
              variant="flat"
              color="primary"
              target="_blank"
            >
              <IoDocumentText />
            </Button>
          );
        case "skills":
          return <p className="font-semibold">{`${cellValue}`}</p>;
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
              radius="md"
              className="font-bold"
            >
              {`${cellValue}`}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex gap-[1px]">
              <Tooltip radius="sm" content="Accept" color="success">
                <Button isIconOnly size="sm" variant="flat" color="success">
                  <IoMdDoneAll />
                </Button>
              </Tooltip>
              <Tooltip radius="sm" content="Pending" color="warning">
                <Button isIconOnly size="sm" variant="flat" color="warning">
                  <IoMdTime />
                </Button>
              </Tooltip>
              <Tooltip radius="sm" content="Reject" color="danger">
                <Button isIconOnly size="sm" variant="flat" color="danger">
                  <GiCancel />
                </Button>
              </Tooltip>
            </div>
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
            // onClickButtonTopContent={addMyEventModal.onOpen}
            renderCell={renderCell}
            totalPage={1}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ViewCurrentVolunteerTab;
