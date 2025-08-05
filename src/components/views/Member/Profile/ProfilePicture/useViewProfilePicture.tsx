import useHandleMedia from "@/hooks/useHandleMedia";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateProfilePicture = Yup.object().shape({
  profilePicture: Yup.mixed<FileList | string>().required(
    "Please upload your profile picture",
  ),
});

const useViewProfilePicture = () => {
  const {
    handleUploadFile,
    isPendingMuteteUploadFile,
    handleDeleteFile,
    isPendingMuteteDeleteFile,
  } = useHandleMedia();

  const {
    control: controlUpdateProfilePicture,
    handleSubmit: handleSubmitUpdateProfilePicture,
    formState: { errors: errorsUpdateProfilePicture },
    reset: resetUpdateProfilePicture,
    watch: watchUpdateProfilePicture,
    getValues: getValuesUpdateProfilePicture,
    setValue: setValueUpdateProfilePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdateProfilePicture),
  });

  const preview = watchUpdateProfilePicture("profilePicture");
  const fileUrl = getValuesUpdateProfilePicture("profilePicture");

  const handleUploadProfilePicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateProfilePicture("profilePicture", fileUrl);
      }
    });
  };

  const handleDeleteProfilePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdateProfilePicture,
    handleSubmitUpdateProfilePicture,
    errorsUpdateProfilePicture,
    resetUpdateProfilePicture,
    preview,

    handleUploadProfilePicture,
    handleDeleteProfilePicture,
    isPendingMuteteUploadFile,
    isPendingMuteteDeleteFile,
  };
};

export default useViewProfilePicture;
