import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdate = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  type: Yup.string()
    .oneOf(["member", "organizer"])
    .required("Type is required"),
  isPublish: Yup.string().required("Status is required"),
});

const useViewInfoFaq = () => {
  const {
    control: controlUpdateFaq,
    handleSubmit: handleSubmitUpdateFaq,
    formState: { errors: errorsUpdateFaq },
    reset: resetUpdateFaq,
    setValue: setValueUpdateFaq,
  } = useForm({
    resolver: yupResolver(schemaUpdate),
  });

  return {
    resetUpdateFaq,
    errorsUpdateFaq,
    controlUpdateFaq,
    setValueUpdateFaq,
    handleSubmitUpdateFaq,
  };
};

export default useViewInfoFaq;
