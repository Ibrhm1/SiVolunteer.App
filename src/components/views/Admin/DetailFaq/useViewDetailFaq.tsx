import categoryService from "@/services/category.service";
import faqServices from "@/services/faq.service";
import { ICategory } from "@/types/Category";
import { IFaq } from "@/types/Faq";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useViewDetailFaq = () => {
  const { query, isReady } = useRouter();

  const getFaqById = async () => {
    const { data } = await faqServices.getFaqById(`${query.id}`);
    return data.data;
  };

  const { data: dataFaq, refetch: refetchFaq } = useQuery({
    queryKey: ["Faq"],
    queryFn: getFaqById,
    enabled: isReady,
  });

  const updateFaq = async (payload: IFaq) => {
    const { data } = await faqServices.updateFaq(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateFaq,
    isPending: isPendingMutateUpdateFaq,
    isSuccess: isSuccessMutateUpdateFaq,
  } = useMutation({
    mutationFn: (payload: IFaq) => updateFaq(payload),
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      refetchFaq();
      toast.success("Success update faq", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const handleUpdateFaq = (data: IFaq) => mutateUpdateFaq(data);

  return {
    dataFaq,
    handleUpdateFaq,
    isSuccessMutateUpdateFaq,
    isPendingMutateUpdateFaq,
  };
};

export default useViewDetailFaq;
