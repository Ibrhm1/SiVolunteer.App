import useHandleMedia from "@/hooks/useHandleMedia";
import categoryService from "@/services/category.service";
import { ICategory } from "@/types/Category";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Please input name category"),
  description: Yup.string().required("Please input description category"),
  image: Yup.mixed<FileList | string>().required("Please input icon category"),
});

const useViewAddCategoryModal = () => {
  const {
    isPendingMuteteUploadFile,
    handleUploadFile,
    handleDeleteFile,
    isPendingMuteteDeleteFile,
  } = useHandleMedia();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addCategory = async (payload: ICategory) => {
    const { data } = await categoryService.createCategory(payload);
    return data;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMuteteAddCategory,
    isSuccess: isSuccessMuteteAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success create category", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
    },
  });
  const handleAddCategory = (data: ICategory) => {
    mutateAddCategory(data);
  };

  return {
    control,
    errors,
    handleOnClose,
    handleSubmitForm,
    handleAddCategory,
    isPendingMuteteAddCategory,
    isSuccessMuteteAddCategory,

    handleDeleteImage,
    isPendingMuteteDeleteFile,

    handleUploadImage,
    isPendingMuteteUploadFile,
    preview,
  };
};

export default useViewAddCategoryModal;
