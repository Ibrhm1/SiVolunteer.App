import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useViewEventVolunteer from "./useViewEventVolunteer";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_EVENTVOLUNTEER } from "./ListTableEventVolunteer";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip } from "@heroui/react";

const ViewEventVolunteer = () => {
  const { setUrl } = useChangeUrl();
  const { push, query, isReady } = useRouter();
  const { dataCombined, dataEventVolunteer, isLoading, isRefetching } =
    useViewEventVolunteer();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
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
            >{`${cellValue}`}</Chip>
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
          emptyContent="No Event Volunteer Found"
          data={dataCombined || []}
          totalPage={dataEventVolunteer?.data.pagination.totalPages || 0}
          isLoading={isLoading || isRefetching}
        />
      )}
    </section>
  );
};

export default ViewEventVolunteer;
