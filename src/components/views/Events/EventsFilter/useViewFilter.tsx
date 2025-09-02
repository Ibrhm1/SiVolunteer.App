import categoryService from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  category: Yup.string(),
  isOnline: Yup.string(),
});

const useViewFilter = () => {
  const { control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory, isSuccess: isSuccessCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryService.getAllCategories(),
  });

  return {
    control,
    setValue,
    dataCategory,
    isSuccessCategory,
  };
};

export default useViewFilter;
