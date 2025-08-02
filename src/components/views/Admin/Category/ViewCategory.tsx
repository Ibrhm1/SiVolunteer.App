import { Image, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useViewCategory from "./useViewCategory";
import AddCategoryModal from "./AddCategoryModal";
import ViewDeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/common/DropdownAction";
import DataTable from "@/components/UI/DataTable";
import { COLUMN_LIST_CATEGORY } from "./ViewCategory.constants";

const ViewCategory = () => {
  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,

    selectedId,
    setSelectedId,
  } = useViewCategory();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${category.image}`}
              alt="image"
              width={100}
              height={100}
              className="object-cover"
            />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
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
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          buttonTopContentLabel="Create Category"
          totalPage={dataCategory?.pagination.totalPages}
          onClickButtonTopContent={addCategoryModal.onOpen}
          isLoading={isLoadingCategory || isRefetchingCategory}
        />
      )}
      <AddCategoryModal
        refecthCategory={refetchCategory}
        {...addCategoryModal}
      />
      <ViewDeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refecthCategory={refetchCategory}
      />
    </section>
  );
};

export default ViewCategory;
