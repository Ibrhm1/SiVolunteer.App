import categoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useViewDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryService.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      toast.success("Success delete category", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useViewDeleteCategoryModal;
