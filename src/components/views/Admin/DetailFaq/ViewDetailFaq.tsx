import React from "react";
import ViewInfoFaq from "./InfoFaq";
import useViewDetailFaq from "./useViewDetailFaq";

const ViewDetailFaq = () => {
  const {
    dataFaq,
    handleUpdateFaq,
    isSuccessMutateUpdateFaq,
    isPendingMutateUpdateFaq,
  } = useViewDetailFaq();

  return (
    <main className="flex flex-col gap-2 lg:flex-row">
      <section className="w-full">
        <ViewInfoFaq
          dataFaq={dataFaq}
          onUpdate={handleUpdateFaq}
          isPendingUpdate={isPendingMutateUpdateFaq}
          isSuccessUpdate={isSuccessMutateUpdateFaq}
        />
      </section>
    </main>
  );
};

export default ViewDetailFaq;
