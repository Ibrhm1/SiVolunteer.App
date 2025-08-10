import useChangeUrl from "@/hooks/useChangeUrl";
import faqServices from "@/services/faq.service";
import { useQuery } from "@tanstack/react-query";

const useAboutFaq = () => {
  const { currentLimit, currentPage } = useChangeUrl();

  const getFaq = async () => {
    const { data } = await faqServices.getAllFaq(`limit=${10}&page=${1}`);
    return data;
  };

  const { data: dataFaq, isLoading: isLoadingFaq } = useQuery({
    queryKey: ["Faq"],
    queryFn: () => getFaq(),
    enabled: true,
  });

  return {
    dataFaq,
    isLoadingFaq,
  };
};

export default useAboutFaq;
