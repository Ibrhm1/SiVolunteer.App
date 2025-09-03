import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useViewEventVolunteer from "./useViewEventVolunteer";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_EVENTVOLUNTEER } from "./ListTableEventVolunteer";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const ViewEventVolunteer = () => {
  const { setUrl } = useChangeUrl();
  const { push, query, isReady } = useRouter();
  const {
    dataEventVolunteer,
    isLoadingEventVolunteer,
    isRefetchingEventVolunteer,
    formatePhone,
  } = useViewEventVolunteer();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (eventVolunteer: Record<string, unknown>, columnKey: Key) => {
      const cellValue =
        eventVolunteer[columnKey as keyof typeof eventVolunteer];
      switch (columnKey) {
        case "userId":
          return (
            <p className="font-semibold capitalize">
              {(cellValue as any)?.fullName}
            </p>
          );
        case "eventId":
          return <p>{(cellValue as any)?.name}</p>;
        case "email":
          return (
            <Link
              href={`mailto:${cellValue}`}
              className="text-primary-600 flex items-center gap-1"
              target="_blank"
            >
              <IoMdMail />
              {`${cellValue}`}
            </Link>
          );
        case "phone":
          return (
            <Button
              as={Link}
              color="success"
              href={`https://wa.me/${formatePhone(`${cellValue}`)}`}
              className="font-semibold"
              size="sm"
              target="_blank"
            >
              <FaWhatsapp size={16} />
              Hubungi Member
            </Button>
          );
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
              className="font-bold capitalize"
            >
              {`${cellValue}`}
            </Chip>
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
          columns={COLUMN_LIST_EVENTVOLUNTEER}
          emptyContent="Event Volunteer not found"
          data={dataEventVolunteer?.data || []}
          totalPage={dataEventVolunteer?.pagination?.totalPages || 0}
          isLoading={isLoadingEventVolunteer || isRefetchingEventVolunteer}
        />
      )}
    </section>
  );
};

export default ViewEventVolunteer;
