import { Image } from "@heroui/react";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useViewEventVolunteer from "./useViewEventVolunteer";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_EVENTVOLUNTEER } from "./ListTableEventVolunteer";
import useChangeUrl from "@/hooks/useChangeUrl";

const ViewEventVolunteer = () => {
  const { setUrl } = useChangeUrl();
  const { push, query, isReady } = useRouter();
  const {
    dataEventVolunteer,
    isLoadingEventVolunteer,
    isRefetchingEventVolunteer,
  } = useViewEventVolunteer();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
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
          data={dataEventVolunteer?.data || []}
          totalPage={dataEventVolunteer?.pagination?.totalPages}
          isLoading={isLoadingEventVolunteer || isRefetchingEventVolunteer}
        />
      )}
    </section>
  );
};

export default ViewEventVolunteer;
