import useHandleMedia from "@/hooks/useHandleMedia";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateLogo = Yup.object().shape({
  logo: Yup.mixed<FileList | string>().required("Please input Logo event"),
});

const useViewLogoProfile = () => {
  const {
    handleUploadFile,
    isPendingMuteteUploadFile,
    handleDeleteFile,
    isPendingMuteteDeleteFile,
  } = useHandleMedia();

  const {
    control: controlUpdateLogo,
    handleSubmit: handleSubmitUpdateLogo,
    formState: { errors: errorsUpdateLogo },
    reset: resetUpdateLogo,
    watch: watchUpdateLogo,
    getValues: getValuesUpdateLogo,
    setValue: setValueUpdateLogo,
  } = useForm({
    resolver: yupResolver(schemaUpdateLogo),
  });

  const preview = watchUpdateLogo("logo");
  const fileUrl = getValuesUpdateLogo("logo");

  const handleUploadLogo = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateLogo("logo", fileUrl);
      }
    });
  };

  const handleDeleteLogo = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdateLogo,
    handleSubmitUpdateLogo,
    errorsUpdateLogo,
    resetUpdateLogo,
    preview,

    handleUploadLogo,
    handleDeleteLogo,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  };
};

export default useViewLogoProfile;
