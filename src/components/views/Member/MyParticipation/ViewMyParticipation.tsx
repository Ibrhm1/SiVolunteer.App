import DataTable from "@/components/UI/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENTVOLUNTEER_MEMBER } from "./ListTableMyParticipation";
import useViewMyParticipation from "./useViewMyParticipation";
import { Chip } from "@heroui/react";

const ViewMyParticipation = () => {
  const { setUrl } = useChangeUrl();
  const { push, query, isReady } = useRouter();
  const {
    dataEventVolunteer,
    isLoadingEventVolunteer,

    dataCombined,
    isLoadingCombined,
  } = useViewMyParticipation();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (eventVolunteerMember: Record<string, unknown>, columnKey: Key) => {
      const cellValue =
        eventVolunteerMember[columnKey as keyof typeof eventVolunteerMember];
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
          showSearch={false}
          renderCell={renderCell}
          data={dataCombined || []}
          emptyContent="You don't have any participation yet"
          columns={COLUMN_LIST_EVENTVOLUNTEER_MEMBER}
          totalPage={dataEventVolunteer?.data.totalPage || 0}
          isLoading={isLoadingEventVolunteer || isLoadingCombined}
        />
      )}
    </section>
  );
};

export default ViewMyParticipation;
