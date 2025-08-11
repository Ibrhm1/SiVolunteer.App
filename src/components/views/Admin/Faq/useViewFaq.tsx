import useChangeUrl from "@/hooks/useChangeUrl";
import faqServices from "@/services/faq.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useViewFaq = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getFaq = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const { data } = await faqServices.getAllFaq(params);
    return data;
  };

  const {
    data: dataFaq,
    isLoading: isLoadingFaq,
    isRefetching: isRefetchingFaq,
    refetch: refetchFaq,
  } = useQuery({
    queryKey: ["Faq", currentPage, currentLimit, currentSearch],
    queryFn: () => getFaq(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataFaq,
    isLoadingFaq,
    isRefetchingFaq,
    refetchFaq,

    selectedId,
    setSelectedId,
  };
};

export default useViewFaq;
