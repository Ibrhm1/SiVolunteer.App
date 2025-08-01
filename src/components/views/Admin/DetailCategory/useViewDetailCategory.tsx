import categoryService from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useViewDetailCategory = () => {
  const { query, isReady } = useRouter();

  const getCategoryById = async () => {
    const { data } = await categoryService.getCategoryById(`${query.id}`);
    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: getCategoryById,
    enabled: isReady,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryService.updateCategory(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
    onSuccess: () => {
      refetchCategory();
      toast.success("Success update category", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,
    handleUpdateCategory,
    isSuccessMutateUpdateCategory,
    isPendingMutateUpdateCategory,
  };
};

export default useViewDetailCategory;
