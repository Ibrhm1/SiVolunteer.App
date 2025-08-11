import faqServices from "@/services/faq.service";
import { IFaq } from "@/types/Faq";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  type: Yup.string()
    .oneOf(["member", "organizer"])
    .required("Type is required"),
  isPublish: Yup.string().required("Status is required"),
});

const useViewAddFaqModal = () => {
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createFaq = async (payload: IFaq) => {
    const { data } = await faqServices.createFaq(payload);
    return data;
  };

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const {
    mutate: mutateAddFaq,
    isPending: isPendingMuteteAddFaq,
    isSuccess: isSuccessMuteteAddFaq,
  } = useMutation({
    mutationFn: createFaq,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success create faq", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
    },
  });

  const handleAddFaq = (data: IFaq) => mutateAddFaq(data);

  return {
    control,
    errors,
    handleSubmitForm,
    handleAddFaq,
    isPendingMuteteAddFaq,
    isSuccessMuteteAddFaq,
    handleOnClose,
  };
};

export default useViewAddFaqModal;
