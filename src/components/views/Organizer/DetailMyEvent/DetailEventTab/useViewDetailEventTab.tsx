import { DELAY } from "@/constants/list.constant";
import useDebounce from "@/hooks/useDebounce";
import categoryService from "@/services/category.service";
import regionService from "@/services/region.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  name: Yup.string().required("Please input name event"),
  description: Yup.string().min(20).required("Please input description event"),
  startDate: Yup.mixed<DateValue>().required("Please input start date event"),
  endDate: Yup.mixed<DateValue>().required("Please input end date event"),
  category: Yup.string().required("Please input category event"),
  isOnline: Yup.string().required("Please input type event"),
  isPublish: Yup.string().required("Please input status event"),
  region: Yup.string().when("isOnline", {
    is: "false",
    then: (schema) => schema.required("Region is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  address: Yup.string().when("isOnline", {
    is: "false",
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  requiredVolunteers: Yup.number().required("Please input required volunteers"),
  requirements: Yup.string().required("Please input requirements event"),
  benefits: Yup.string().required("Please input benefits event"),
  tags: Yup.array()
    .of(Yup.string().trim().min(1).required("Please input tags event"))
    .min(1)
    .required("Please input tags event"),
});

const useViewDetailEventTab = () => {
  const [searchRegency, setSearchRegency] = useState("");
  const debounce = useDebounce();

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    setValue: setValueUpdateInfo,
    reset: resetUpdateInfo,
    watch,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const isOnline = watch("isOnline");

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryService.getAllCategories(),
    enabled: true,
  });

  const { data: dataRegion } = useQuery({
    queryKey: ["Regions", searchRegency],
    queryFn: () => regionService.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const handleTags = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (tags: string[]) => void,
  ) => {
    onChange(e.target.value.split(", ").map((tag) => tag.trim()));
  };

  return {
    isOnline,
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
    resetUpdateInfo,

    dataCategory,

    handleTags,

    dataRegion,
    handleSearchRegion,
    searchRegency,
  };
};

export default useViewDetailEventTab;
