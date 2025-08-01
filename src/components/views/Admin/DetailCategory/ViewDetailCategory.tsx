import { Tab, Tabs } from "@heroui/react";
import React from "react";
import useViewDetailCategory from "./useViewDetailCategory";
import ViewImage from "./ViewImage";
import ViewInfo from "./ViewInfo";

const ViewDetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isSuccessMutateUpdateCategory,
    isPendingMutateUpdateCategory,
  } = useViewDetailCategory();

  return (
    <main className="flex flex-col gap-2 lg:flex-row">
      <section className="w-full">
        <ViewImage
          currentImage={dataCategory?.image}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </section>
      <section className="w-full">
        <ViewInfo
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </section>
    </main>
  );
};

export default ViewDetailCategory;
