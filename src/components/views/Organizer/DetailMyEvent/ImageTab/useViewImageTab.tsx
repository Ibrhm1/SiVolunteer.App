import useHandleMedia from "@/hooks/useHandleMedia";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateImage = Yup.object().shape({
  image: Yup.mixed<FileList | string>().required("Please input image event"),
});

const useViewImageTab = () => {
  const {
    handleUploadFile,
    isPendingMuteteUploadFile,
    handleDeleteFile,
    isPendingMuteteDeleteFile,
  } = useHandleMedia();

  const {
    control: controlUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: errorsUpdateImage },
    reset: resetUpdateImage,
    watch: watchUpdateImage,
    getValues: getValuesUpdateImage,
    setValue: setValueUpdateImage,
  } = useForm({
    resolver: yupResolver(schemaUpdateImage),
  });

  const preview = watchUpdateImage("image");
  const fileUrl = getValuesUpdateImage("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateImage("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,
    preview,
    fileUrl,
    handleUploadImage,
    handleDeleteImage,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  }
};

export default useViewImageTab;
