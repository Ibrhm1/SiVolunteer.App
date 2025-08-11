import { Chip, Image, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import AddCategoryModal from "./AddFaqModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/common/DropdownAction";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_CATEGORY } from "./ViewFaq.constants";
import useViewFaq from "./useViewFaq";
import ViewAddFaqModal from "./AddFaqModal";
import ViewDeleteFaqModal from "./DeleteFaqModal/ViewDeleteFaqModal";

const ViewFaq = () => {
  const addFaqModal = useDisclosure();
  const deleteFaqModal = useDisclosure();
  const { setUrl } = useChangeUrl();
  const { push, isReady, query } = useRouter();
  const {
    dataFaq,
    isLoadingFaq,
    isRefetchingFaq,
    refetchFaq,
    selectedId,
    setSelectedId,
  } = useViewFaq();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (faq: Record<string, unknown>, columnKey: Key) => {
      const cellValue = faq[columnKey as keyof typeof faq];
      switch (columnKey) {
        case "type":
          return (
            <Chip
              color={cellValue === "member" ? "primary" : "secondary"}
              variant="flat"
              radius="sm"
            >
              {`${cellValue}`}
            </Chip>
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue === true ? "primary" : "danger"}
              variant="flat"
              radius="sm"
            >
              {`${cellValue === true ? "Publish" : "Private"}`}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/faqs/${faq._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${faq._id}`);
                deleteFaqModal.onOpen();
              }}
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
          columns={COLUMN_LIST_CATEGORY}
          data={dataFaq?.data || []}
          emptyContent="Faq not found"
          buttonTopContentLabel="Create Faq"
          totalPage={dataFaq?.pagination.totalPages}
          onClickButtonTopContent={addFaqModal.onOpen}
          isLoading={isLoadingFaq || isRefetchingFaq}
        />
      )}
      <ViewAddFaqModal refecthFaq={refetchFaq} {...addFaqModal} />
      <ViewDeleteFaqModal
        {...deleteFaqModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refecthFaq={refetchFaq}
      />
    </section>
  );
};

export default ViewFaq;
