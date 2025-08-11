import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  name: Yup.string().required("Please input name information"),
  description: Yup.string().required("Please input description information"),
});

const useViewInfo = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    resetUpdateInfo,
    errorsUpdateInfo,
    controlUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,
  };
};

export default useViewInfo;
