import DataTable from "@/components/UI/DataTable";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_ORGANIZER } from "./ListTableOrganizer";
import { Chip, Image } from "@heroui/react";
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
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
        case "logo":
          return (
            <Image
              src={`${cellValue}`}
              alt="logo"
              width={100}
              height={100}
              className="object-cover"
            />
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
          emptyContent="No organizer found"
          data={dataOrganizer?.data || []}
          totalPage={dataOrganizer?.pagination?.totalPages}
          isLoading={isLoadingOrganizer || isRefetchingOrganizer}
        />
      )}
    </section>
  );
};

export default ViewOrganizer;
