import DataTable from "@/components/UI/DataTable";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_ORGANIZER } from "./ListTableOrganizer";
import { Avatar, Chip } from "@heroui/react";
import { useRouter } from "next/router";
import useViewOrganizer from "./useViewOrganizer";
import useChangeUrl from "@/hooks/useChangeUrl";
import dayjs from "dayjs";

const ViewOrganizer = () => {
  const { setUrl } = useChangeUrl();
  const { push, isReady, query } = useRouter();
  const { dataOrganizer, isLoadingOrganizer, isRefetchingOrganizer } =
    useViewOrganizer();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (organizer: Record<string, unknown>, columnKey: Key) => {
      const cellValue = organizer[columnKey as keyof typeof organizer];
      switch (columnKey) {
        case "logo":
          return (
            <Avatar isBordered radius="md" size="lg" src={`${cellValue}`} />
          );
        case "dateEstablished":
          return <Chip>{dayjs(`${cellValue}`).format("DD MMMM YYYY")}</Chip>;
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
          columns={COLUMN_LIST_ORGANIZER}
          emptyContent="Organizer is empty"
          data={dataOrganizer?.data || []}
          totalPage={dataOrganizer?.pagination?.totalPages}
          isLoading={isLoadingOrganizer || isRefetchingOrganizer}
        />
      )}
    </section>
  );
};

export default ViewOrganizer;
