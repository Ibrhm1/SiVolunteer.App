import faqServices from "@/services/faq.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewDeleteFaqModal = () => {
  const deleteFaq = async (id: string) => {
    const res = await faqServices.deleteFaq(id);
    return res;
  };

  const {
    mutate: mutateDeleteFaq,
    isPending: isPendingMutateDeleteFaq,
    isSuccess: isSuccessMutateDeleteFaq,
  } = useMutation({
    mutationFn: deleteFaq,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success delete faq", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  return {
    mutateDeleteFaq,
    isPendingMutateDeleteFaq,
    isSuccessMutateDeleteFaq,
  };
};

export default useViewDeleteFaqModal;
